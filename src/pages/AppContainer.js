import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {View, Image} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import BookRack from './BookRack';
import Index from './Index';
import Search from './Search';
import Setting from './Setting';
import Me from './Me';
import Videos from './Videos';
import Audios from './Audios';
import Books from './Books';
import Video from './Video';
import Audio from './Audio';
import Book from './Book';
import Tuijian from './Tuijian';
import VideoPlay from './VideoPlay';
import News from './News';

const headerRight = navigation => {
  return (
    <View>
      <Icons
        name="md-search"
        style={{paddingRight: 15, paddingLeft: 15, paddingTop: 5}}
        size={25}
        color="#999"
        onPress={e => {
          navigation.navigate('Search');
        }}
      />
    </View>
  );
};
// 书架
const navigatorRack = createStackNavigator({
  BookRack: {
    screen: BookRack,
    navigationOptions: {
      headerTitle: '我的书架',
    },
  },
});
//悦读
const navigatorHome = createStackNavigator(
  {
    Home: {
      screen: Index,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: '微悦读',
          headerTintColor: '#fd6655',
          headerRight: headerRight.bind(this, navigation),
        };
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        headerTitle: '搜索',
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        headerTitle: '设置',
      },
    },
    Videos: {
      screen: Videos,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: '视频',
          headerTintColor: '#fd6655',
          headerRight: headerRight.bind(this, navigation),
        };
      },
    },
    Audios: {
      screen: Audios,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: '听书',
          headerTintColor: '#fd6655',
          headerRight: headerRight.bind(this, navigation),
        };
      },
    },
    Books: {
      screen: Books,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: '图书',
          headerTintColor: '#fd6655',
          headerRight: headerRight.bind(this, navigation),
        };
      },
    },
    Video: {
      screen: Video,
      navigationOptions: ({navigation}) => {
        let str = navigation.state.params.name;
        if (str.length > 10) {
          str = str.substr(0, 12) + '...';
        }
        return {
          headerTitle: str,
          headerRight: headerRight.bind(this, navigation),
        };
      },
    },
    Audio: {
      screen: Audio,
      navigationOptions: ({navigation}) => {
        let str = navigation.state.params.name;
        if (str.length > 10) {
          str = str.substr(0, 12) + '...';
        }
        return {
          headerTitle: str,
          headerRight: headerRight.bind(this, navigation),
        };
      },
    },
    Book: {
      screen: Book,
      navigationOptions: ({navigation}) => {
        let str = navigation.state.params.name;
        if (str.length > 10) {
          str = str.substr(0, 12) + '...';
        }
        return {
          headerTitle: str,
          headerRight: headerRight.bind(this, navigation),
        };
      },
    },
    Tuijian: {
      screen: Tuijian,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: '好书推荐',
          headerTintColor: '#fd6655',
          headerRight: headerRight.bind(this, navigation),
        };
      },
    },
    VideoPlay: {
      screen: VideoPlay,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    News: {
      screen: News,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
  },
  {
    // 设置二级页面隐藏tabBar
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index > 0 ? false : true,
    }),
  },
);
// 我的
const navigatorMe = createStackNavigator({
  Me: {
    screen: Me,
    navigationOptions: {
      headerTitle: '个人中心',
      headerTintColor: '#fd6655',
    },
  },
});

const TabNavigator = createBottomTabNavigator(
  {
    BarRack: {
      screen: navigatorRack,
      navigationOptions: ({navigation}) => {
        return {
          tabBarLabel: '书架',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../assets/img/rack-at.png')
                    : require('../assets/img/rack.png')
                }
                style={{width: 26, height: 26}}
              />
            );
          },
        };
      },
    },
    BarMain: {
      screen: navigatorHome,
      navigationOptions: ({navigation}) => {
        return {
          tabBarLabel: '悦读',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../assets/img/home-at.png')
                    : require('../assets/img/home.png')
                }
                style={{width: 25, height: 25}}
              />
            );
          },
        };
      },
    },
    BarMe: {
      screen: navigatorMe,
      navigationOptions: ({navigation}) => {
        return {
          tabBarLabel: '我的',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={
                  focused
                    ? require('../assets/img/me-at.png')
                    : require('../assets/img/me.png')
                }
                style={{width: 26, height: 26}}
              />
            );
          },
        };
      },
    },
  },
  {
    initialRouteName: 'BarMain',
    tabBarOptions: {
      inactiveTintColor: '#aaaaaa',
      activeTintColor: '#ff8c00',
    },
  },
);

export default createAppContainer(TabNavigator);
