import React,{Component} from 'react';
import {
  StatusBar,
  View
} from 'react-native';

export default class base extends Component{
  render(){
    return(
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#00000000'
          translucent={true}
          showHideTransition='fade'/>
        <Text>
          继承自Base
        </Text>
      </View>
    )
  }
}
