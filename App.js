import React, { Component } from 'react'
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { createAppContainer } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const styles = StyleSheet.create({
  mainPage: {
    flex: 1
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingTop: StatusBar.currentHeight
  },
  scrollView: {
    backgroundColor: '#FFFFFF'
  },
});

class HomeScreen extends Component {
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
    }
  }
  newPage = () => {
    console.log(NavigationActions)
    NavigationActions.navigate('Details')
  }
  render() {
    return (
      <View style={styles.mainPage}>
        <StatusBar barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Text>111111111111111111</Text>
            <Button title="go to new page" onPress={this.newPage} />
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    Details: DetailsScreen,
  },
},
  {
    initialRouteName: 'Home',
  });

export default createAppContainer(AppNavigator);