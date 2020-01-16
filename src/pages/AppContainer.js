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
      headerTitle: '我的书架',
    },
  },
});
//悦读
const navigatorHome = createStackNavigator({
  Home: {
    screen: Index,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: '微悦读',
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
                }}></Icons>
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
          tabBarLabel: '书架',
          tabBarIcon: ({focused}) => {
            return (
              <Icons
                name="logo-buffer"
                size={25}
                color={focused ? '#286fd9' : '#aaaaaa'}
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
                color={focused ? '#286fd9' : '#aaaaaa'}
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
                color={focused ? '#286fd9' : '#aaaaaa'}
              />
            );
          },
        };
      },
    },
  },
  {
    initialRouteName: 'BarMain',
  },
);

export default createAppContainer(TabNavigator);
