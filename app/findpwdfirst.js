import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  BackAndroid,
  StatusBar
} from 'react-native';

import MyTitleBar from './view/titlebar_custom';
import Global from './../Global';

const pros = {
  phone:'',
  code:'',
}

const statusH = StatusBar.currentHeight;

export default class FindPWDFirst extends Component{
  constructor(props){
    super(props);
    this.state={
      text_phone:'',
      text_code:'',
    }
  }

  componentDidMount () {   
    BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  onBackAndroid = () => {
    var {navigator} = this.props;   
    if (navigator && navigator.getCurrentRoutes().length > 1) {     
      navigator.pop();     
      return true;   
    }else{     
      return false;   
    }
  };

  _onBack(){
    const { navigator } = this.props;
    if(navigator) {
      navigator.pop();
    }
  }

  _code(){
    let phone = pros.phone;
    console.log('phone ->'+phone);
    let check = Global.checkPhone(phone);
    if(check === true){
      Alert.alert('succ');
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#00000000'
          translucent={true}
          showHideTransition='fade'/>
        <MyTitleBar title='找回密码' nav={this.props}/>
      <TextInput style={styles.textInputStyle} keyboardType='numeric' maxLength={11} placeholder='手机号码'
        onChangeText={(text)=>{
          pros.phone = text;
        }}/>
      <View style={{flexDirection:'row',backgroundColor:'#fff',marginTop:1}}>
        <TextInput style={[styles.textInput2Style,{flex:1,marginRight:15}]} placeholder='验证码'/>
          <TouchableOpacity activeOpacity={0.8} style={styles.textCodeViewStyle} onPress={this._code.bind(this)}>
              <Text style={styles.textCodeStyle}>获取验证码</Text>
          </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={[styles.textLoginViewStyle,{marginTop:20,marginLeft:10,marginRight:10}]} onPress={this._login}>
          <Text style={styles.textLoginStyle}>下一步</Text>
      </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,                  //弹性盒子
    backgroundColor:Global.theme_bgColor,
  },
  textInputStyle:{
    // borderColor:Global.theme_color,
    // borderWidth:1,
    height:Global.inputText_height,
    marginTop:15,
    backgroundColor:'#fff',
    paddingLeft:10,
    paddingRight:10,
  },
  textInput2Style:{
    // borderColor:Global.theme_color,
    // borderWidth:1,
    height:Global.inputText_height,
    backgroundColor:'#fff',
    paddingLeft:10,
    paddingRight:10,
  },
  //登录按钮View样式
  textLoginViewStyle: {
    height: 40,
    backgroundColor: Global.theme_color,
    borderRadius: 5,
    paddingLeft:10,
    paddingRight:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //登录Text文本样式
  textLoginStyle: {
      fontSize: 16,
      color: 'white',
    },
    textCodeViewStyle: {
      height: Global.inputText_height,
      paddingLeft:10,
      paddingRight:10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    //登录Text文本样式
    textCodeStyle: {
        fontSize: 14,
        color: Global.theme_color,
      },
})
