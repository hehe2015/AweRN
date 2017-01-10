import React,{Component} from 'react';
import {
  View,
  Text,
  Textinput,
  Image,
  BackAndroid,
  StatusBar,
  TextInput,
  Alert,
  AsyncStorage,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Global from './../Global';


const statusH = StatusBar.currentHeight;
const SearchHistory = 'search_history';
const splite_flag = '(~)';
const spliteFlag_count = 16;
const thiss = null;

export default class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      mkey:-1,
      hiss:[],
    }
    this.handleBack = this.handleBack.bind(this);
    thiss = this;
  }

  componentDidMount () {
    this.initGetHis(this);
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack(){   
    var {navigator} = this.props;   
    if (navigator && navigator.getCurrentRoutes().length > 1) {     
      navigator.pop();     
      return true;   
    }else{     
      return false;   
    }
  }

  _onBack(){
    const { navigator } = this.props;
    if(navigator) {
      navigator.pop();
    }
  }

  _onSubmitEditing(){
    this._textInput.blur();
    // Alert.alert("搜索->"+this.state.search_txt);
  }

  _onPressSearch(event){
    var event_str = event.nativeEvent.text;
    if(event_str.trim().length==0)
      return;
    //TODO
    this.dealHis(this,event_str);
  }

  initGetHis(thiz){
    this.getHis(function(ret){
      if(""==ret){
        return;
      }
      var sp = ret.split(splite_flag);
      thiz.setState({hiss:ret.split(splite_flag)});
    })
  }

  dealHis(thiz,key){
    this.getHis(function(ret){
      // var ret = ret1;
      var splite_his = ret.split(splite_flag);
      var contain = false;
      for(i=0;i<splite_his.length;i++){
        if(key==splite_his[i]){
          contain = true;
          break;
        }
      }
      if(contain){
        ret = ret.replace(splite_flag+key+splite_flag,splite_flag);
      } else {
        if(splite_his.length>spliteFlag_count){
          ret = ret.substring(0,ret.lastIndexOf(splite_flag));
          ret = ret.substring(0,ret.lastIndexOf(splite_flag)+splite_flag.length);
        }
      }

      ret = splite_flag+key+ret;

      AsyncStorage.setItem(SearchHistory,ret);
      thiz.setState({hiss:ret.split(splite_flag)});
    });
  }

  getHis(callback){//获取历史搜索
    AsyncStorage.getItem(SearchHistory)
      .then(
        (result) => {
          if(null == result){
            callback(splite_flag)
            return;
          }
          callback(result);
          return;
        }
      )
      .catch((error) => {
      });
  }

  _clear(){
    AsyncStorage.removeItem(SearchHistory);
    this.setState({hiss:[]});
  }

  _onItemClick(){
    //TODO
    thiss.dealHis(thiss,thiss.state.hiss[this]);
  }


  render(){
    var pages = [];
    for (var i = 0; i < this.state.hiss.length; i++) {
      if(this.state.hiss[i] != ""){
        pages.push(
          <TouchableOpacity activeOpacity={1} key={i} style={{height:35,alignItems:'center',flexDirection:'row'}}
            onPress={this._onItemClick.bind(i)}>
            <Text style={styles.his_item_text} > {this.state.hiss[i]} </Text>
          </TouchableOpacity>
        );
      }
    }

    return(
      <View style={{flex:1,backgroundColor:Global.theme_bgColor}}>
        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:Global.titleBar_color,height:statusH+Global.titleBar_height,paddingTop:statusH,paddingLeft:10}}>
          <View style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#fff',height:Global.titleBar_height-10,borderRadius:Global.inputText_borderRadius}}>
            <Image style={{marginLeft:3,height:Global.titleBar_height-14,width:Global.titleBar_height-14}} source={require('./../img/search.png')}/>
            <TextInput ref={component => this._textInput = component} style={{flex:1,paddingTop:0,paddingBottom:0}} underlineColorAndroid='transparent' placeholder="随便找找"
              returnKeyType='search' onSubmitEditing={this._onSubmitEditing.bind(this)} onEndEditing={this._onPressSearch.bind(this)} autoFocus={true}
              maxLength={20}/>
        </View>
          <TouchableHighlight style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{paddingLeft:10,paddingRight:10,color:'#fff'}} onPress={this._onBack.bind(this)}>
              取消
            </Text>
          </TouchableHighlight>
        </View>
        <View
          style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:10,marginTop:13}}
          >
          <Text>
            搜索历史
          </Text>
          <TouchableWithoutFeedback onPress={this._clear.bind(this)}>
            <Image
              style={{height:22,width:37,paddingLeft:5,paddingRight:10}} resizeMode='contain'
              source={require('./../img/clear.png')}
              />
          </TouchableWithoutFeedback>

        </View>

        <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:8}}>
          {pages.map((elem, index) => { return elem})}
        </View>


      </View>
    )
  }

}

const styles = StyleSheet.create({
  his_item_text:{
    flexDirection:'row',
    backgroundColor:'#fff',
    paddingTop:3,
    paddingBottom:3,
    borderRadius:4,
    marginLeft:8,
    marginRight:8,
  }
})
