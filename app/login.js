import React, {
    Component,
} from 'react';
/*jshint esversion:6*/
import {
     AppRegistry,
     Image,
     StyleSheet,
     Text,
     View,
     Navigator,
     Button,
     Alert,
     TextInput,
     TouchableOpacity,
     StatusBar,
     BackAndroid,
     ToastAndroid
 } from 'react-native';


var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var URL = 'http://192.168.81.186:8501/MMS/app/appUser!login.do';

let Global = require('./../Global');

import Main from './main';
import FindPWD from './findpwdfirst';
import Regist from './regist';
const statusH = StatusBar.currentHeight;

const pros={
  loginName:'a9907356',
  passWord:'a123456',
}
var pro = null;

var Inv = {
  toMain(){
    const {navigator} = pro;
    if (navigator) {
      navigator.resetTo({
        name:'main',
        component:Main,
      })
    }
  },

  toFindPWD(){
    const {navigator} = pro;
    if (navigator) {
      navigator.push({
        name:'findpwd',
        component:FindPWD,
      })
    }
  }
};


export default class Login extends Component {
   constructor(props){
     super(props);
     pro = props;
     this.state = {};
   }

   componentDidMount () {   
    //  this._login();
     BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
   }

   componentWillUnmount() {
     BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
   }

   onBackAndroid = () => {
     if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {//最近2秒内按过back键，可以退出应用。
       return false;
     }
     this.lastBackPressed = Date.now();
     ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
     return true;
   };

   _toFindPWD(){
     const {navigator} = this.props;
     if (navigator) {
       navigator.push({
         name:'findpwd',
         component:FindPWD,
       })
     }
   }


     render(){
       return(
         <View style={{flex:1,backgroundColor:'#eee'}}>
           <StatusBar
             backgroundColor={'#00000000'}
             translucent={true}
             showHideTransition={'fade'}/>
         <View style={styles.container}>
           <Image style={styles.pic} resizeMode="center" source={require('./../img/login_icon.jpg')}/>
           <View style={{backgroundColor:'#fff',marginTop:15}}>
             <TextInput
               style={styles._intextinput}
               placeholder="请输入用户名或手机号码"
               underlineColorAndroid='transparent'
               onChangeText={(text)=>{
                 pros.loginName = text;
                 console.log('loginName -> '+pros.loginName);
               }}
               />
           </View>
           <View style={{backgroundColor:'#fff',marginTop:1}}>
             <TextInput
               style={styles._intextinput}
               placeholder="请输入密码"
               underlineColorAndroid='transparent'
               onChangeText={(text)=>{
                 pros.passWord = text;
                 console.log('passWord -> '+pros.passWord);
               }}
               />
            </View>
            {/*登录按钮*/}
            <TouchableOpacity activeOpacity={0.8} style={styles.textLoginViewStyle} onPress={this._login}
              >
                <Text style={styles.textLoginStyle}>登 录</Text>
            </TouchableOpacity>
         </View>

         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{color:Global.theme_color,marginBottom:10,marginLeft:10,fontSize:12}}
           onPress={this._toFindPWD.bind(this)}>
           无法登陆?
         </Text>
         <Text style={{color:Global.theme_color,marginBottom:10,marginRight:10,fontSize:12}}
           onPress={this._regist.bind(this)}>
           新用户
         </Text>
       </View>
       </View>
       )
     }

     _regist(){//TODO
       const {navigator} = this.props;
       if (navigator) {
         navigator.push({
           name:'regist',
           component:Regist,
         })
       }
     }

     _login(){
       if (pros.loginName.length == 0) {
         Alert.alert('用户名不能为空');
         return;
       }
       if(pros.passWord.length == 0){
         Alert.alert('密码不能为空');
         return;
       }
      var url = 'http://www.chainew.com/MMS/app/appUser!login.do';
      fetch(url, {
         method: 'POST',
         headers: {
          //  'Accept': 'application/json',
           'Content-Type': 'application/x-www-form-urlencoded',//表单形式提交
         },
          body:
          'loginName='+pros.loginName+'&passWord='+pros.passWord+'&provinceId=1024'
       })
          .then((response) => response.json())
          .then((responseData) => {
            Global.LoginBean = responseData;
            console.log('---',Global.LoginBean);
            if (responseData.resultCode == 0) {
              console.log('succ');
              Inv.toMain();
              // Alert.alert('LOGIN SUCC!');
            } else {
              console.log('fail'+responseData.failDesc);
              Alert.alert(responseData.failDesc)
            }
          })
          .done();
     }
 }

 const styles = StyleSheet.create({
   regist:{
     color:Global.theme_color,
   },
   container:{
     flex:1,                  //弹性盒子
     paddingTop:60+statusH,
   },
   _btn:{
     width:200,
     height:40,
   },
   pic:{
    //  width:220,
     height:70,
     borderRadius:70,
     //设置相对父控件居中
     alignSelf: 'center',
   },
   _intextinput:{
     width: width - 30,
     height: Global.inputText_height,
     //设置圆角程度
    //  borderRadius: 18,
     //设置相对父控件居中
     alignSelf: 'center',
     textAlign:'center'

  },
  //登录按钮View样式
  textLoginViewStyle: {
    width: width - 30,
    height: Global.btnStyle.height,
    backgroundColor: Global.theme_color,
    borderRadius: 4,
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //登录Text文本样式
  textLoginStyle: {
    fontSize: 16,
    color: 'white',
  },
 });
