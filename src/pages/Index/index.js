import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icons from 'react-native-vector-icons/AntDesign';
import store from '../../script/store';
import HTTP from '../../script/request';
import {_member_login, _getCookie, _setCookie} from '../../script/action';
import Util from '../../script/util';

const {width} = Dimensions.get('window');
const ImageWH = (width - 40) / 3; //图书
const ImageVH = (width - 30) / 2; //图书
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
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
    fontSize: 12,
  },
  weiperDot: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 8,
    height: 8,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  weiperAtDot: {
    backgroundColor: 'rgba(255,255,255,1)',
    width: 8,
    height: 8,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  bannerImg: {
    width: width,
    height: width * 0.6,
  },
  planTitle: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planTitleName: {
    fontSize: 16,
    lineHeight: 22,
  },
  planTitleMore: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
  },
  planTitleMoreText: {
    fontSize: 12,
    lineHeight: 14,
    color: '#999',
  },
  videoCover: {
    width: ImageVH,
    height: ImageVH * 0.6,
    borderRadius: 3,
    backgroundColor: '#eee',
  },
  bookCover: {
    width: ImageWH,
    height: ImageWH * 1.4,
    borderRadius: 3,
    backgroundColor: '#eee',
  },
  bookName: {
    fontSize: 12,
    paddingTop: 5,
  },
  flexPlan: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  col3: {
    width: ImageWH,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  col2: {
    width: ImageVH,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    alignItems: 'center',
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
      hotBooks: [],
      hotVideos: [],
      hotAudios: [],
      hotPeiPeis: [],
    };
    store.subscribe(this.storeChange);
  }
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
    this.getMainHot();
    //this.props.navigation.navigate('BarMe');
  }
  getMainHot = reset => {
    _getCookie('hotPeiPeis').then(cookie => {
      if (cookie && !reset) {
        this.setState({
          hotPeiPeis: cookie,
        });
      } else {
        HTTP.get('https://play.daidaidj.com/web/api/god/v2/newHomeRecommend', {
          latitude: 30.58108413,
          longitude: 114.3162001,
          city_code: 218,
          register: 1,
          type: 1,
          page: 1,
          size: 15,
          source: 1,
          channelId: 1000,
          companyCode: 'PP_001',
        }).then(res => {
          if (res.code == 200 && res.data) {
            this.setState({
              hotPeiPeis: res.data,
            });
            _setCookie('hotPeiPeis', res.data);
          }
        });
      }
    });
    _getCookie('hotBooks').then(cookie => {
      if (cookie && !reset) {
        this.setState({
          hotBooks: cookie,
        });
      } else {
        HTTP.post('/api/hbjt/getbooks').then(res => {
          if (res.code == 0 && res.data.rows) {
            this.setState({
              hotBooks: res.data.rows,
            });
            _setCookie('hotBooks', res.data.rows);
          }
        });
      }
    });
    _getCookie('hotVideos').then(cookie => {
      if (cookie && !reset) {
        this.setState({
          hotVideos: cookie,
        });
      } else {
        HTTP.post('/api/hbjt/getvideos').then(res => {
          if (res.code == 0 && res.data.rows) {
            this.setState({
              hotVideos: res.data.rows,
            });
            _setCookie('hotVideos', res.data.rows);
          }
        });
      }
    });
    _getCookie('hotAudios').then(cookie => {
      if (cookie && !reset) {
        this.setState({
          hotAudios: cookie,
        });
      } else {
        HTTP.post('/api/hbjt/getaudios').then(res => {
          if (res.code == 0 && res.data.rows) {
            this.setState({
              hotAudios: res.data.rows,
            });
            _setCookie('hotAudios', res.data.rows);
          }
        });
      }
    });
  };
  render() {
    const {banner, hotBooks, hotVideos, hotAudios, hotPeiPeis} = this.state;
    console.log(hotBooks, hotVideos, hotAudios, hotPeiPeis);
    return (
      <View style={styles.safeAreaView}>
        <SafeAreaView style={styles.scrollView}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Swiper
              style={styles.swiper}
              showsButtons={false}
              // autoplayTimeout={6}
              // autoplay={true}
              dot={<View style={styles.weiperDot} />}
              activeDot={<View style={styles.weiperAtDot} />}>
              {banner.map((item, index) => {
                return (
                  <View key={`swiper-${index}`}>
                    <Image
                      source={item.pic}
                      style={styles.bannerImg}
                      resizeMode="cover"
                    />
                  </View>
                );
              })}
            </Swiper>
            {/* 菜单 */}
            <View style={styles.menuBar}>
              <TouchableOpacity>
                <View>
                  <Image
                    source={require('./img/m1.png')}
                    style={styles.menuItem}
                  />
                  <Text style={styles.menuItemText}>推荐</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <Image
                    source={require('./img/m2.png')}
                    style={styles.menuItem}
                  />
                  <Text style={styles.menuItemText}>图书</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <Image
                    source={require('./img/m3.png')}
                    style={styles.menuItem}
                  />
                  <Text style={styles.menuItemText}>听书</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <Image
                    source={require('./img/m4.png')}
                    style={styles.menuItem}
                  />
                  <Text style={styles.menuItemText}>视频</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <Image
                    source={require('./img/m5.png')}
                    style={styles.menuItem}
                  />
                  <Text style={styles.menuItemText}>报刊</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexPlan}>
              {hotPeiPeis.map((item, index) => {
                return (
                  <TouchableOpacity activeOpacity={0.8} key={`daidai-${index}`}>
                    <View style={styles.col3}>
                      <Image
                        style={styles.bookCover}
                        source={{
                          uri: Util.transImgUrl1(item.headPic),
                        }}
                      />
                      <Text style={styles.bookName} numberOfLines={1}>
                        {item.nickname}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* 最新图书 */}
            <View>
              <View style={styles.planTitle}>
                <Text style={styles.planTitleName}>最新图书</Text>
                <TouchableOpacity>
                  <View style={styles.planTitleMore}>
                    <Text style={styles.planTitleMoreText}>更多</Text>
                    <Icons name="doubleright" size={12} color="#999" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.flexPlan}>
                {hotBooks.map((item, index) => {
                  return (
                    <TouchableOpacity activeOpacity={0.8} key={`book-${index}`}>
                      <View style={styles.col3}>
                        <Image
                          style={styles.bookCover}
                          source={{
                            uri: Util.transImgUrl(item.book_cover_small),
                          }}
                        />
                        <Text style={styles.bookName} numberOfLines={1}>
                          {item.book_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/* 最新视频 */}
            <View>
              <View style={styles.planTitle}>
                <Text style={styles.planTitleName}>最新视频</Text>
                <TouchableOpacity>
                  <View style={styles.planTitleMore}>
                    <Text style={styles.planTitleMoreText}>更多</Text>
                    <Icons name="doubleright" size={12} color="#999" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.flexPlan}>
                {hotVideos.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      key={`audio-${index}`}>
                      <View style={styles.col2}>
                        <Image
                          style={styles.videoCover}
                          source={{
                            uri: Util.transImgUrl(item.cover_url_small),
                          }}
                        />
                        <Text style={styles.bookName} numberOfLines={1}>
                          {item.video_title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/* 最新听书 */}
            <View>
              <View style={styles.planTitle}>
                <Text style={styles.planTitleName}>最新听书</Text>
                <TouchableOpacity>
                  <View style={styles.planTitleMore}>
                    <Text style={styles.planTitleMoreText}>更多</Text>
                    <Icons name="doubleright" size={12} color="#999" />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.flexPlan}>
                {hotAudios.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      key={`audio-${index}`}>
                      <View style={styles.col3}>
                        <Image
                          style={styles.bookCover}
                          source={{
                            uri: Util.transImgUrl(item.cover_url_small),
                          }}
                        />
                        <Text style={styles.bookName} numberOfLines={1}>
                          {item.audio_title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
