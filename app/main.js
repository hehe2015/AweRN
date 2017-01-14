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
  ListView,
  TouchableOpacity,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
  BackAndroid,
  ToastAndroid
} from 'react-native';
import Global from './../Global';

import FindPWD from './findpwdfirst';
import UserInfo from './UserInfo';
import Search from './search';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f00',
    backgroundColor: Global.theme_bgColor,
  },
  itemLayout:{
   flex:1,
   width:width/3,
   height:width/3,
   alignItems:'center',
   justifyContent:'center',
   borderWidth: 1,
   borderColor: '#eaeaea'
 },
 listViewStyle:{
        // 主轴方向
        flexDirection:'row',
        // 一行显示不下,换一行
        flexWrap:'wrap',
        // 侧轴方向
        alignItems:'center', // 必须设置,否则换行不起作用
    },
 grid: {
   justifyContent: 'space-around',
   flexDirection: 'row',
   flexWrap: 'wrap'
 },
 innerViewStyle:{
        width:100,
        height:100,
        marginLeft:10,
        marginTop:10,
        // 文字内容居中对齐
        alignItems:'center'
    },

    iconStyle:{
        width:80,
        height:80,
    },
});

const statusH = StatusBar.currentHeight;
var firstClick = 0;
export default class Main extends Component {
  constructor(props){
    super(props);
    this.handleBack = this.handleBack.bind(this);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        dataSource: ds.cloneWithRows(['aaa','bbb','ccc','ddd','eee','fff','ggg','hhh','jjj','kkk','mmm','mmm','nnn','ooo']),
    };
  }

  state = {
    isOpen: false,
    selectedItem: 'About',
  };

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
    this._loadItem();
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

  _loadItem(){
      Global.Post('app/appProduct!typeProductTreeNew.do','sessionkey='+Global.LoginBean.sessionKey,(code,ret)=>{
          if (code == 0) {
            //   var obj = JSON.parse(ret.toString);
              alert(ret.Item.length);
              //TODO
          } else {
              ToastAndroid.show(ret, ToastAndroid.SHORT);
          }
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

          <ListView
              pageSize={20}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                contentContainerStyle={styles.listViewStyle}
            />

        </View>

      </SideMenu>
    );
  }

  // 返回cell
    renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{alert('点击了'+rowData)}} >
                <View style={styles.innerViewStyle}>
                    <Image source={{uri:rowData.icon}} style={styles.iconStyle} />
                    <Text>{rowData}</Text>
                </View>
            </TouchableOpacity>
        );
    }
};
