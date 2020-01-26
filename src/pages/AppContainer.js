import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {View} from 'react-native';
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
          headerRight: () => {
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
          },
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
      navigationOptions: {
        headerTitle: '视频',
      },
    },
    Audios: {
      screen: Audios,
      navigationOptions: {
        headerTitle: '听书',
      },
    },
    Books: {
      screen: Books,
      navigationOptions: {
        headerTitle: '图书',
      },
    },
    Video: {
      screen: Video,
      navigationOptions: {
        headerTitle: '视频详情',
      },
    },
    Audio: {
      screen: Audio,
      navigationOptions: {
        headerTitle: '听书详情',
      },
    },
    Book: {
      screen: Book,
      navigationOptions: {
        headerTitle: '图书详情',
      },
    },
    Tuijian: {
      screen: Tuijian,
      navigationOptions: {
        headerTitle: '好书推荐',
      },
    },
    VideoPlay: {
      screen: VideoPlay,
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
              <Icons
                name="logo-buffer"
                size={25}
                color={focused ? '#ff8c00' : '#aaaaaa'}
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
              <Icons
                name="ios-bonfire"
                size={30}
                color={focused ? '#ff8c00' : '#aaaaaa'}
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
              <Icons
                name="ios-contact"
                size={25}
                color={focused ? '#ff8c00' : '#aaaaaa'}
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
