// const React = require('react');
// const SideMenu = require('react-native-side-menu');
// const Menu = require('./../Menu');
import React,{Component} from 'react';
import SideMenu from 'react-native-side-menu';
import Menu from './../Menu';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
  BackAndroid
} from 'react-native';
import Global from './../Global';

import FindPWD from './findpwdfirst';
import UserInfo from './UserInfo';
import Search from './search';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f00',
    backgroundColor: Global.theme_bgColor,
  },
});
const statusH = StatusBar.currentHeight;
var firstClick = 0;
export default class Main extends Component {
  constructor(props){
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }

  state = {
    isOpen: false,
    selectedItem: 'About',
  };

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack(){   
    var navigator = this.navigator;   
    if (navigator && navigator.getCurrentRoutes().length > 1) {     
      navigator.pop();     
      return true;   
    }else{
      if(this.state.isOpen == true){
        this.updateMenuState(false);
        return true;
      }
      return false;   
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  search(){
    this.toPush(Search);
  }

  toPush(cp){
    const {navigator} = this.props;
    if (navigator) {
      navigator.push({
        name:'',
        component:cp,
      })
    }
  };

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
    switch (item) {
      case 'UserInfo':
        this.toPush(UserInfo);
        break;
        case 'About':
          Alert.alert('About');
          break;
      default:

    }
    // this.toPush(FindPWDFirst);
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        // openMenuOffset={200}
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={styles.container}>
          <View style={{alignItems:'center',justifyContent:'space-between',flexDirection:'row',paddingLeft:10,paddingRight:10,
            height:statusH+Global.titleBar_height,backgroundColor:Global.titleBar_color,paddingTop:statusH}}>
            <TouchableWithoutFeedback style={{width:Global.titleBar_height,height:Global.titleBar_height,justifyContent:'center'}} onPress={() => this.toggle()}>
              <Image style={{height:22,width:22}} resizeMode="center" source={require('./../img/menu_main2.png')}/>
            </TouchableWithoutFeedback>
              <Text style={{alignSelf:'center',color:'#fff',fontSize:17}}>
                AwesomeProject
              </Text>
              <TouchableWithoutFeedback style={{width:Global.titleBar_height,height:Global.titleBar_height,justifyContent:'center'}} onPress={() => this.search()}>
                <Image style={{height:22,width:22}} resizeMode="center" source={require('./../img/search_main.png')}/>
              </TouchableWithoutFeedback>
          </View>
        </View>

      </SideMenu>
    );
  }
};
