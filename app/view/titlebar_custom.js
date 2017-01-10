import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

  let Global = require('./../../Global');

  var Dimensions = require('Dimensions');
  var width = Dimensions.get('window').width;


export default class TitleBar extends Component{
  constructor(props){
    super(props);
  }

  onBack(){
    const { navigator } = this.props.nav;
    if(navigator) {
      navigator.pop();
    }
  }

  render(){
    return(
      <View style = {styles.container}>
        <TouchableWithoutFeedback onPress={this.onBack.bind(this)}>
          <Image style={{height:20,width:20,marginLeft:5}} source={require('./../../img/titlebar_back.png')}/>
        </TouchableWithoutFeedback>
        <Text style={{width:width-50,color:'#fff',fontSize:17,textAlign:'center'}}>{this.props.title}
        </Text>
      </View>
    )
  }



}

const styles = StyleSheet.create({
  container:{
    height:45,
    // flex:1,
    flexDirection:'row',
    backgroundColor:Global.theme_color,
    alignItems:'center',
    // justifyContent:'center'
  }
});
