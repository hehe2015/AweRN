import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    BackAndroid,
    StatusBar,
    NativeModules,
    ToastAndroid,
    Modal
} from 'react-native';

import MyTitleBar from './view/titlebar_custom';
import Global from './../Global';

const pros = {
    phone: '',
    oldPhone: '',
    authCodeSerial: 'dd',
    accounts: new Array()
}

const statusH = StatusBar.currentHeight;
var Dimensions = require('Dimensions');
var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').width;

var codeTime = 60;
var text_base = '获取验证码';
var provinceId = '1024'; //TODO

export default class FindPWDFirst extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text_phone: '',
            text_code: '',
            text_getCode: text_base,
            timerCount: codeTime,
            visible: false
        };

    }

    countTime() {
        this.interval = setInterval(() => {
            var timer = this.state.timerCount - 1
            if (timer === 0) {
                this.interval && clearInterval(this.interval);
                this.setState({timerCount: codeTime, text_getCode: text_base})
            } else {
                this.setState({
                    timerCount: timer,
                    text_getCode: timer + 'S后重发'
                })
            }
        }, 1000)
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        var {navigator} = this.props;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        } else {
            return false;
        }
    };

    _onBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _findPWDNext(){
        //TODO
        console.log(pros.accounts[this].emp_no);
        alert(pros.accounts[this].emp_no);
    }

    //关闭对话框
    close = () => {
        this.setState({visible: false});
    }

    _next() {
        this.getAccount();
    }

    _code() {
        if (this.state.text_getCode != text_base) {
            return;
        }
        let phone = pros.phone;
        console.log('phone ->' + phone);
        let check = Global.checkPhone(phone);
        if (check === true) {
            console.log('Succ');
            this.getAuthCode();
        }
    }

    getAuthCode() {
        var phone = pros.phone;
        var timestamp = new Date().getTime();
        var thiz = this;

        NativeModules.DesUtil.encryptDES(phone + '#' + timestamp + '#' + provinceId, 'gxhlqn88', (result) => {
            Global.Post('app/appSms!getAuthCodeNewByEncryp.do', 'info=' + result, function(code, ret) {
                if (code == 0) {
                    thiz.countTime();
                    ToastAndroid.show('验证码发送成功', ToastAndroid.SHORT);
                    pros.oldPhone = phone;
                    pros.authCodeSerial = ret.authCodeSerial;
                } else {
                    ToastAndroid.show(ret, ToastAndroid.SHORT);
                }

            });
        });

    }

    getAccount() {
        // pros.accounts[0] = 'aaa';
        // pros.accounts[1] = 'bbb';
        // this.setState({visible: true});
        // return;

        if (pros.authCodeSerial.length == 0) {
            ToastAndroid.show('请先获取验证码', ToastAndroid.SHORT);
            return;
        }
        if (pros.phone != pros.oldPhone) {
            ToastAndroid.show('请确认手机号码', ToastAndroid.SHORT);
            return;
        }
        if (this.state.text_code.trim().length == 0) {
            ToastAndroid.show('请输入验证码', ToastAndroid.SHORT);
            return;
        }
        var params = 'phone=' +
        pros.oldPhone +
        '&provinceId=' + provinceId + '&authCode=' + this.state.text_code + '&authCodeSerial=' + pros.authCodeSerial;
        console.log(params);
        var thiz = this;

        // this.setState({accounts[1]:'hh2'});
        Global.Post('app/appUser!getLoginName.do', params, (code, ret) => {
            if (code == 0) {
                var list = ret.list;
                if (list.length == 0) {
                    alert('查不到对应的帐号');
                    return;
                } else if (list.length == 1) {
                    pros.accounts = list;
                    this.setState({visible: true});
                } else {
                    pros.accounts = list;
                    this.setState({visible: true});
                }
            } else {
                ToastAndroid.show(ret, ToastAndroid.SHORT);
            }
        });
    }

    renderContent = () => {
        var pages = [];
        for (var i = 0; i < pros.accounts.length; i++) {
            pages.push(
                <TouchableOpacity key={i} activeOpacity={0.8} onPress={this._findPWDNext.bind(i)}>
                    <Text style={{
                        fontSize: 14,
                        marginTop: 10
                    }}>
                        {pros.accounts[i]}
                    </Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={[
                styles.background, {
                    width: SCREEN_WIDTH * 0.8
                }
            ]}>
                <Text style={{
                    fontSize: 16
                }}>
                    选择要找回密码的账号
                </Text>
                <View style={{
                    height: 1,
                    marginTop: 10,
                    backgroundColor: Global.theme_bgColor
                }}></View>
                {pages.map((elem, index) => {
                    return elem
                })}

            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal animationType='fade' //进场动画 fade
                    onRequestClose={() => this.close()} visible={this.state.visible} //是否可见
                    transparent={true} //背景透明
                >
                    <TouchableOpacity style={{
                        flex: 1
                    }} activeOpacity={1} onPress={this.close} //点击灰色区域消失
                    >
                        <View style={styles.container_dialog}>
                            {this.renderContent()}
                        </View>
                    </TouchableOpacity>
                </Modal>

                <StatusBar backgroundColor='#00000000' translucent={true} showHideTransition='fade'/>
                <MyTitleBar title='找回密码' nav={this.props}/>
                <TextInput style={styles.textInputStyle} keyboardType='numeric' maxLength={11} placeholder='手机号码' defaultValue="18600000000" onChangeText={(text) => {
                    pros.phone = text;
                }}/>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    marginTop: 1
                }}>
                    <TextInput onChangeText={(text) => {
                        this.setState({text_code: text})
                    }} style={[
                        styles.textInput2Style, {
                            flex: 1,
                            marginRight: 15
                        }
                    ]} placeholder='验证码'/>
                    <TouchableOpacity activeOpacity={0.8} style={styles.textCodeViewStyle} onPress={this._code.bind(this)}>
                        <Text style={styles.textCodeStyle}>{this.state.text_getCode}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={[
                    styles.textLoginViewStyle, {
                        marginTop: 20,
                        marginLeft: 10,
                        marginRight: 10
                    }
                ]} onPress={this._next.bind(this)}>
                    <Text style={styles.textLoginStyle}>下一步</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //弹性盒子
        backgroundColor: Global.theme_bgColor
    },
    textInputStyle: {
        // borderColor:Global.theme_color,
        // borderWidth:1,
        height: Global.inputText_height,
        marginTop: 15,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10
    },
    textInput2Style: {
        // borderColor:Global.theme_color,
        // borderWidth:1,
        height: Global.inputText_height,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10
    },
    //登录按钮View样式
    textLoginViewStyle: {
        height: 40,
        backgroundColor: Global.theme_color,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //登录Text文本样式
    textLoginStyle: {
        fontSize: 16,
        color: 'white'
    },
    textCodeViewStyle: {
        height: Global.inputText_height,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //登录Text文本样式
    textCodeStyle: {
        fontSize: 14,
        color: Global.theme_color
    },
    container_dialog: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        backgroundColor: '#fff',
        borderRadius: Global.theme_borderRadius,
        padding: 10,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
})
