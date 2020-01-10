/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'

export default class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    //android
    if (Platform.OS == 'android') {
      // StatusBar.setBackgroundColor('#FFFFFF');
      const { Release, Model, Version, Fingerprint } = Platform.constants;
      const platform = { Release, Model, Version, Fingerprint, OS: 'android' };
      console.log(Platform)
      console.log(StatusBar.currentHeight)
    }
  }
  render() {
    return (
      <View style={styles.mainPage}>
        <StatusBar barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0)" translucent={true}/>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
              <Text>111111111111111111</Text>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  mainPage: {
    flex: 1
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.currentHeight
  },
  scrollView: {
    backgroundColor: '#FFFFFF'
  },
});

