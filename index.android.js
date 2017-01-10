import React, {
    Component,
} from 'react';
/*jshint esversion:6*/
import {
     AppRegistry,
     Navigator,
 } from 'react-native';

import Login from './app/login';

export default class AwesomeProject extends Component {
   render() {
     var defaultName = 'login';
     var defaultComponent = Login;
     return (
       <Navigator //指定了默认的页面，也就是启动app之后会看到的第一屏，需要两个参数，name跟component
         initialRoute={{ name: defaultName, component: defaultComponent }}
         configureScene={(route) => { //跳转的动画
           return Navigator.SceneConfigs.PushFromRight ;
         }}
         renderScene={(route, navigator) => {
           let Component = route.component;
           if(route.component){
             return <Component {...route.params}  navigator={navigator} />
           } else {
           }
         }
       } />
     );
   }
 }


 AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
