import React from 'react'
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Image,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

//pages
import Index from "./src/pages/Index/Page";
import Setting from "./src/pages/Setting/Page"


const AppNavigator = createStackNavigator({
  Home: {
    screen: Index,
  },
  Setting: {
    screen: Setting,
  }
},
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'green',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },

    }
  }
);


const TabNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: AppNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          tabBarLabel: '主页面',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: 30, height: 30 }}
                source={
                  focused
                    ? require('./src/assets/img/ic_home_entertainment_p.png')
                    : require('./src/assets/img/ic_home_entertainment_n.png')
                }
              />
            )
          }
        }
      }
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        // 底部导航
        tabBarLabel: '测试页面',
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{ width: 30, height: 30 }}
              source={
                focused
                  ? require('./src/assets/img/ic_home_home_p.png')
                  : require('./src/assets/img/ic_home_home_n.png')
              }
            />
          )
        }
      }
    }
  },
  {
    initialRouteName: 'Main',
    tabBarOptions: {
      activeTintColor: 'gold',
      inactiveTintColor: 'gray',
      style: {
        height: 50,
      }
    },
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      console.log('xxxxxxxxx', routeName)
      return {
        gesturesEnabled: false
      }
    }
  }
);
const AppContainer = createAppContainer(TabNavigator);
class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}
export default App;