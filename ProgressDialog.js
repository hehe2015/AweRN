import React, { Component } from 'react';
import {
  StyleSheet,
  Text, // RN提供的组件
  View,
  ProgressBarAndroid
} from 'react-native';
// let Dimensions = require('Dimensions');
// let totalWidth = Dimensions.get('window').width;//宽
// let totalHeight = Dimensions.get('window').height;//高

// 直接导出组件,不用写 module.exports=ConfirmDialog;了
export default class ConfirmDialog extends Component {
  render(){
    return(
      <View style={{backgroundColor:'green', alignItems:'center'}}>
        <Text>ProgressBarAndroid超级简单实例！</Text>
        <ProgressBarAndroid styleAttr='Inverse'/>
      </View>
    )
  }
}
