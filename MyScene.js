import React,{Component,PropTypes} from 'react';
import{View,Text,TouchableHighlight,TouchableOpacity,StyleSheet} from 'react-native';

export default class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
     return (
       <View>
        <Text>Current Scene: { this.props.title }</Text>
      <TouchableOpacity onPress={this.props.onForward}>
          <Text style={styles.red}>点我进入下一场景</Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>点我返回上一场景</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
  const styles = StyleSheet.create({
  		bigblue: { color: 'blue', fontWeight: 'bold', fontSize: 30, },
  		red: { color: '#ff0', },
  });
