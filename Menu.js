const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  Alert,
  TouchableWithoutFeedback,
} = require('react-native');
const { Component } = React;

import Global from './Global';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
  },
  avatarContainer: {
    paddingBottom: 10,
    paddingLeft:20,
    paddingTop: 40,
    flexDirection:'row',
    backgroundColor:Global.theme_color_icon,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    marginLeft:5,
    fontSize:14,
    color:'#fff',
  },
  item: {
    fontSize: 14,
    color:'#666',
    marginLeft:10,
  },
  item_view:{
    marginLeft:20,
    marginTop:10,
    height:40,
    flexDirection:'row',
    alignItems:'center',
  }
});

export default class Menu extends Component {
  constructor(props){
    super(props);
    this.state={
      city:'',
      temperature_curr:'',
      temperature:'',
    }
  }

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  componentDidMount () {   
    this._getPosition(this);
  }

  _updateWea(thiz,position){
      let lgt = position.coords.longitude;
      let lat = position.coords.latitude;
      let url = 'http://api.map.baidu.com/telematics/v3/weather?location='+
      lgt+','+lat+'&output=json&ak=SRVCGnQ6qaBqbP5QMGxYdxmMpwygXcZb';
  //http://api.map.baidu.com/telematics/v3/weather?location=113.9406,22.549&output=json&ak=SRVCGnQ6qaBqbP5QMGxYdxmMpwygXcZb
      Global.GET(url,
      function(ret){
        if(ret.status=='success'){
          thiz.setState({city:ret.results[0].currentCity+'('+ret.results[0].weather_data[0].weather+')'});
          thiz.setState({temperature:ret.results[0].weather_data[0].temperature});
          var temperature_curr_temp = ret.results[0].weather_data[0].date;
          let index = temperature_curr_temp.indexOf("实时：");
          let end = temperature_curr_temp.indexOf(")");
          let curr = temperature_curr_temp.substring(index+3,end);
          //周五 01月06日 (实时：24℃)
          thiz.setState({temperature_curr:curr});
        }
      }
    );
  }

  _getPosition(thiz){
     navigator.geolocation.getCurrentPosition(
      (position) => {
        // thiz._updateWea(thiz,position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    watchID = navigator.geolocation.watchPosition((position) => {
      // var lastPosition = JSON.stringify(position);
      // this.setState({lastPosition});
      thiz._updateWea(thiz,position);
    });
   }

  render() {
    return (
      <View style={{flex:1,width:window.width,flexDirection:'column',backgroundColor: '#fff'}}>
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <StatusBar
          backgroundColor={'#00000000'}
          translucent={true}
          showHideTransition={'fade'}/>
        <TouchableWithoutFeedback onPress={() => this.props.onItemSelected('UserInfo')}>
          <View style={styles.avatarContainer} >
            <Image
              style={styles.avatar}
              source={{ uri, }}/>
            <Text style={styles.name}>{Global.LoginBean.name}</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.item_view}>
          <Image style={{width:16}} resizeMode="center" source={require('./img/share.png')}/>
          <Text onPress={() => this.props.onItemSelected('About')} style={styles.item}>邀请好友</Text>
        </View>

        <View style={styles.item_view}>
          <Image style={{width:16}} resizeMode="center" source={require('./img/help.png')}/>
          <Text onPress={() => this.props.onItemSelected('share')} style={styles.item}>使用指南</Text>
        </View>
        <View style={styles.item_view}>
          <Image style={{width:16,alignSelf:'center'}} resizeMode="center" source={require('./img/about.png')}/>
          <Text onPress={() => this.props.onItemSelected('share')} style={styles.item}>关于我们</Text>
        </View>
      </ScrollView>
      <View style={{flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',paddingLeft:5,paddingRight:5,width:window.width*2/3}}>
        <View style={{flexDirection:'column',alignSelf:'flex-end',marginBottom:5}}>
          <Text style={{fontSize:12}}>
            {this.state.temperature}
          </Text>
          <Text style={{fontSize:12}}>
            {this.state.city}
          </Text>
        </View>
        <Text style={{fontSize:40,fontWeight:'100'}}>
          {this.state.temperature_curr}
        </Text>
      </View>
     </View>
    );
  }
};
