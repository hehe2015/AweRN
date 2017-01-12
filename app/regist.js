import React ,{Component} from 'react';
import {
  View,
  StatusBar,
  BackAndroid
} from 'react-native';

const statusH = StatusBar.currentHeight;
import Global from './../Global';
import MyTitleBar from './view/titlebar_custom';

export default class regist extends Component{

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

  render(){
    return(
      <View style={{flex:1,backgroundColor:Global.theme_bgColor}}>
        <StatusBar
          backgroundColor='#00000000'
          translucent={true}
          showHideTransition='fade'/>
      </View>
    )
  }
}
