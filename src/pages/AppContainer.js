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

// 书架
const navigatorRack = createStackNavigator({
  BookRack: {
    screen: BookRack,
    navigationOptions: {
      // headerTitle: '我的书架',
      headerTitle: 'Title1',
    },
  },
});
//悦读
const navigatorHome = createStackNavigator({
  Home: {
    screen: Index,
    navigationOptions: ({navigation}) => {
      return {
        // headerTitle: '微悦读',
        headerTitle: '带带电竞',
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
});

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
          // tabBarLabel: '书架',
          tabBarLabel: '直播大厅',
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
          // tabBarLabel: '悦读',
          tabBarLabel: '首页',
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
