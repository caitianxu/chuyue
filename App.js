import React from 'react'
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Image
} from 'react-native';

import Icons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

//pages
import Index from "./src/pages/Index/Page";
import Setting from "./src/pages/Setting/Page";
import Me from "./src/pages/Me/Page";
import Search from "./src/pages/Search/Page";
import BookRack from "./src/pages/BookRack/Page";

// Dimensions 用于获取设备宽、高、分辨率
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {
    width: width,
    height: height
  },
  headerBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f90'
  },
  headerSearch: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10
  }
});

//topBar 样式
const topBarOption = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#286fd9',
    },
    headerTintColor: '#ffffff'
  }
}
// 书架
const AppNavigator_1 = createStackNavigator({
  BookRack: {
    screen: BookRack,
    navigationOptions: {
      headerTitle: "我的书架"
    }
  }
}, topBarOption);

//悦读
const AppNavigator_2 = createStackNavigator({
  Home: {
    screen: Index,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: '微悦读',
        headerRight: <View><Icons name='md-search' style={styles.headerSearch} size={25} color='white' onPress={(e) => {
          navigation.navigate('Search');
        }}></Icons></View>
      }
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      headerTitle: "搜索"
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      headerTitle: "设置"
    }
  }
}, topBarOption);

// 我的
const AppNavigator_3 = createStackNavigator({
  Me: {
    screen: Me,
    navigationOptions: {
      headerTitle: "个人中心"
    }
  }
}, topBarOption);

const TabNavigator = createBottomTabNavigator(
  {
    BarRack: {
      screen: AppNavigator_1,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "设置",
          tabBarLabel: '书架',
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
    BarMain: {
      screen: AppNavigator_2,
      navigationOptions: ({ navigation }) => {
        console.log('2', navigation)
        return {
          tabBarLabel: '悦读',
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
    BarMe: {
      screen: AppNavigator_3,
      navigationOptions: ({ navigation }) => {
        return {
          tabBarLabel: '我的',
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
  }, {
  initialRouteName: 'BarMain'
}
);
const AppContainer = createAppContainer(TabNavigator);



class App extends React.Component {
  componentDidMount() {
    //设置状态栏透明
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('rgba(0,0,0,0.1)');
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
        {/* <WebView
          style={styles.webView}
          source={{ uri: "http://h5.tuibook.com" }}
        /> */}
      </View>
    )
  }
}
export default App;