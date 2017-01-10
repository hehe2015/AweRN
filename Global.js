import React, {Component} from 'react';
import {
  Alert,
} from 'react-native';

var Global = {
  theme_color:'#63B8FF',
  theme_color_icon:'#5FCDD7',

  titleBar_color:'#555',
  titleBar_height:35,

  LoginBean:null,
  theme_bgColor:'#eee',
  inputText_height:40,
  inputText_borderRadius:3,
  BASEURL:'http://www.chainew.com/MMS/',
  btnStyle:{
    height: 40,
    backgroundColor: this.theme_color,
    borderRadius: 3,
  }
};

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
