import React from 'react';
import {Dimensions, Platform, View, StatusBar} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import store from './src/script/store';
import {
  _set_client_info,
  _getCookie,
  _member_login,
} from './src/script/action';
import AppContainer from './src/pages/AppContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
    };
    store.subscribe(this.storeChange);
  }
  //更新store
  storeChange = () => {
    this.setState({
      base: store.getState(),
    });
  };
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }
  componentDidMount() {
    _getCookie('memberInfo').then(res => {
      if (res) {
        _member_login(res);
      }
    });
    //android
    if (Platform.OS == 'android') {
      //设置状态栏透明
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('rgba(0,0,0,0.1)');
      //设备资料
      const {Release, Model, Version, Fingerprint} = Platform.constants;
      // Dimensions 用于获取设备宽、高、分辨率
      const {width, height} = Dimensions.get('window');
      _set_client_info({
        Release,
        Model,
        Version,
        Fingerprint,
        width,
        height,
        OS: 'android',
      });
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }
  render() {
    console.log(this.state.base);
    return (
      <View style={{flex: 1}}>
        <AppContainer />
      </View>
    );
  }
}
export default App;
