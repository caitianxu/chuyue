import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import store from '../../script/store';
import HTTP from '../../script/request';
import {_member_login} from '../../script/action';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
  },
  swiper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: width * 0.6,
  },
  menuBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
  },
  menuItem: {
    width: 45,
    height: 45,
  },
  menuItemText: {
    textAlign: 'center',
  },
});
export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      banner: [
        {
          href:
            'https://vodpub1.v.news.cn/original/20191231/b0f9a8e644dc47df93649077ee11373c.mp4',
          pic: require('./img/b01.jpg'),
        },
        {
          href:
            'https://vodpub1.v.news.cn/original/20191231/b0f9a8e644dc47df93649077ee11373c.mp4',
          pic: require('./img/b02.jpg'),
        },
        {
          href:
            'https://vodpub1.v.news.cn/original/20191231/b0f9a8e644dc47df93649077ee11373c.mp4',
          pic: require('./img/b03.jpg'),
        },
      ],
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
    
  }
  newPage = () => {
    this.props.navigation.navigate('BarMe');
  };
  render() {
    const {banner, swiperShow, base} = this.state;
    return (
      <View style={styles.safeAreaView}>
        <SafeAreaView style={styles.scrollView}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Swiper
              style={styles.swiper}
              showsButtons={false}
              // autoplayTimeout={6}
              // autoplay={true}
              dot={
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    width: 8,
                    height: 8,
                    marginLeft: 5,
                    marginRight: 5,
                    borderRadius: 5,
                  }}
                />
              }
              activeDot={
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,1)',
                    width: 8,
                    height: 8,
                    marginLeft: 5,
                    marginRight: 5,
                    borderRadius: 5,
                  }}
                />
              }>
              {banner.map((item, index) => {
                return (
                  <View key={`swiper-${index}`}>
                    <Image
                      source={item.pic}
                      style={{width: width, height: width * 0.6}}
                      resizeMode="cover"
                    />
                  </View>
                );
              })}
            </Swiper>
            <View style={styles.menuBar}>
              <View>
                <Image
                  source={require('./img/m1.png')}
                  style={styles.menuItem}
                />
                <Text style={styles.menuItemText}>推荐</Text>
              </View>
              <View>
                <Image
                  source={require('./img/m2.png')}
                  style={styles.menuItem}
                />
                <Text style={styles.menuItemText}>图书</Text>
              </View>
              <View>
                <Image
                  source={require('./img/m3.png')}
                  style={styles.menuItem}
                />
                <Text style={styles.menuItemText}>听书</Text>
              </View>
              <View>
                <Image
                  source={require('./img/m4.png')}
                  style={styles.menuItem}
                />
                <Text style={styles.menuItemText}>视频</Text>
              </View>
              <View>
                <Image
                  source={require('./img/m5.png')}
                  style={styles.menuItem}
                />
                <Text style={styles.menuItemText}>报刊</Text>
              </View>
            </View>

          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
