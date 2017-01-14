import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StatusBar,
    BackAndroid,
    StyleSheet,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';

import Global from './../Global';
import Act_Item from './view/act_item';

const statusH = StatusBar.currentHeight;
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthRec_ydg: '0',
            monthRec_ytj: '0',
            monthRec_yjyj: '0',
            monthRec_dgpm: '0'
        };
        this.handleBack = this.handleBack.bind(this);

    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        this._recommendReportByMonth(this);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    }

    handleBack() {
        var {navigator} = this.props;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        } else {
            return false;
        }
    }

    _onBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _recommendReportByMonth(thiz) {
        console.log('_recommendReportByMonth');
        Global.Post('app/appRecommend!recommendDetail.do', 'sessionkey=' + Global.LoginBean.sessionKey, function(ret) {
            thiz.setState({monthRec_ydg: ret.recommendNum, monthRec_ytj: ret.orderNum, monthRec_yjyj: ret.commission, monthRec_dgpm: ret.recommendRank});
        });
    }

    _test() {
        console.log('act click' + this.state);
        Alert.alert('Act');
    }
    _test2() {
        console.log('act click 2');
        Alert.alert('Act2');
    }

    render() {
        return (
            <View>
                <StatusBar backgroundColor='#00000000' translucent={true} showHideTransition='fade'/>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: Global.titleBar_height + statusH,
                    paddingTop: statusH,
                    backgroundColor: Global.theme_color_icon
                }}>
                    <TouchableWithoutFeedback onPress={this._onBack.bind(this)}>
                        <Image style={{
                            height: 20,
                            width: 20,
                            marginLeft: 5
                        }} source={require('./../img/titlebar_back.png')}/>
                    </TouchableWithoutFeedback>
                    <Text style={{
                        width: width - 50,
                        color: '#fff',
                        fontSize: 17,
                        textAlign: 'center'
                    }}>Awesome
                    </Text>
                </View>
                <ScrollView style={{
                    backgroundColor: Global.theme_bgColor
                }}>

                    <View style={{
                        width: width,
                        flexDirection: 'column',
                        backgroundColor: Global.theme_color_icon
                    }}>

                        <Image style={{
                            width: 80,
                            height: 80,
                            marginTop: 25,
                            alignSelf: 'center',
                            borderRadius: 80
                        }} resizeMode="center" source={require('./../img/login_icon.jpg')}></Image>
                        <Text style={[
                            styles.text_title, {
                                marginTop: 20
                            }
                        ]}>
                            工号:{Global.LoginBean.userSeq}
                            身份:{Global.LoginBean.userType}
                        </Text>
                        <Text style={[
                            styles.text_title, {
                                marginTop: 10,
                                marginBottom: 15
                            }
                        ]}>
                            所属:{Global.LoginBean.organiseName}
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={styles.month_detail}>
                            <Text style={[
                                styles.text_month_detail, {
                                    marginLeft: 0
                                }
                            ]}>
                                {this.state.monthRec_ydg}
                            </Text>
                            <Text>
                                12.0
                            </Text>
                        </View>
                        <View style={styles.month_detail}>
                            <Text style={styles.text_month_detail}>
                                {this.state.monthRec_ytj}
                            </Text>
                            <Text>
                                12.0
                            </Text>
                        </View>
                        <View style={styles.month_detail}>
                            <Text style={styles.text_month_detail}>
                                {this.state.monthRec_yjyj}
                            </Text>
                            <Text>
                                12.0
                            </Text>
                        </View>
                        <View style={styles.month_detail}>
                            <Text style={styles.text_month_detail}>
                                {this.state.monthRec_dgpm}
                            </Text>
                            <Text>
                                12.0
                            </Text>
                        </View>
                    </View>

                    <Act_Item marginTop={0.5} onPress={this._test.bind(this)} menu_name='实名登记' menu_v='未登记'/>

                    <Act_Item marginTop={0.5} onPress={this._test.bind(this)} menu_name='我的yj' menu_v='9.0元'/>

                    <Act_Item marginTop={0.5} onPress={() => {
                        this._test2
                    }} menu_name='我的tj'/>

                    <Act_Item marginTop={10} onPress={() => {
                        this._test2
                    }} menu_name='我的sc'/>

                    <Act_Item marginTop={0.5} onPress={() => {
                        this._test2
                    }} menu_name='意见反馈'/>

                    <Act_Item marginTop={0.5} onPress={() => {
                        this._test2
                    }} menu_name='系统消息'/>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text_title: {
        color: '#fff',
        alignSelf: 'center'
    },
    month_detail: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 0.5
    },
    text_month_detail: {
        fontSize: 22,
        marginBottom: 10,
        // color:'#F05B48'
    }
})
