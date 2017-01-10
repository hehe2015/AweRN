import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

export default class Act_Item extends Component {
  render(){
    return(
      <TouchableHighlight activeOpacity={0.9} onPress={this.props.onPress} style={{marginTop:this.props.marginTop}}>
      <View style={{flexDirection: 'row',height:45,alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff'}}>
        <Text style={{fontSize:14,color:'#333'}}>
          {this.props.menu_name}
        </Text>
        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
          <Text style={{fontSize:12,marginRight:10,alignSelf:'center'}}>
            {this.props.menu_v}
          </Text>
          <Image style={{width:10,alignSelf:'center'}} resizeMode='contain' source={require('./../../img/act_item_flag2.png')}/>
        </View>
      </View>
      </TouchableHighlight>
    )
  }
}
