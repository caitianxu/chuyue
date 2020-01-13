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
import Setting from "./src/pages/Setting/Page";
import Test from "./src/pages/Test/Page";


const AppNavigator = createStackNavigator({
  Home: {
    screen: Index,
    navigationOptions: {
      // header: null // React元素或一个返回React元素HeaderProps的函数，以显示为标题。设置为null隐藏标题
      headerTitle: "首页", // 设置标题
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      header: <View><Text>设置</Text></View>
    }
  },
  Test: {
    screen: Test,
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
        console.log('xxxxxxxxx', navigation)
        return {
          tabBarLabel: '主页面',
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
    Test: {
      screen: Test,
      navigationOptions: ({ navigation }) => {
        console.log('yyyyyyyyy', navigation)
        return {
          tabBarLabel: '测试页面',
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
    }
  }
);
const AppContainer = createAppContainer(TabNavigator);
class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }
  render() {
    return (
      <AppContainer />
    )
  }
}
export default App;