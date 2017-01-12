import React, {Component} from 'react';
import {
  Alert,
} from 'react-native';

var Global = {
  //#63B8FF
  //#5FCDD7
  theme_color:'#63B8FF',
  theme_color_icon:'#5FCDD7',

  //标题栏颜色（灰黑）
  titleBar_color:'#555',
  //标题栏高度
  titleBar_height:35,

  LoginBean:null,
  theme_bgColor:'#eee',

  //输入框高度
  inputText_height:40,
  //输入框圆角，按钮圆角
  theme_borderRadius:3,
  BASEURL:'http://www.chainew.com/MMS/',

  //按钮样式（登陆，找回密码）
  btnStyle:{
    height: 38,
    backgroundColor: this.theme_color,
    borderRadius: this.theme_borderRadius,
  }
};


/**********************直直的分割线********************************/



Global.Post = function(method,bodyParams,callback){
  let url = this.BASEURL+method;
  fetch(url,{
    method:'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:bodyParams
  })
  .then((response)=>response.json())
  .then((responseData) => {
    console.log(responseData);
    callback(responseData);
  })
  .catch((error) => { console.error(error); })
  .done();
}

Global.GET = function(url,callback){
  fetch(url,{
    method:'POST',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  .then((response)=>response.json())
  .then((responseData) => {
    console.log(responseData);
    callback(responseData);
  })
  .catch((error) => { console.error(error); })
  .done();
}

Global.checkPhone = function(phone){
  let regex = "1[3|5|7|8|][0-9]{9}";
  if(phone.length === 0){
    Alert.alert('手机号码不能为空!');
    return false;
  } else{
    return true;
  }
}

Global.match = function(regex,phone){
  if (!regex.test(phone).val()) {
    alert("手机号码格式不对！");
    return false;
  }
}











module.exports = Global;
