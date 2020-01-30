import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  findNodeHandle,
  TouchableOpacity,
} from 'react-native';
import store from '../../script/store';
import HTTP from '../../script/request';
import Util from '../../script/util';
import {BlurView} from '@react-native-community/blur';
import Icons from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {_set_public_loading} from '../../script/action';

const {width, height} = Dimensions.get('window');
const ImageWH = (width - 50) / 3; //图书
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    width: width,
    height: width * 0.5,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: width * 0.5,
  },
  header: {
    position: 'absolute',
    height: width * 0.5 - 30,
    top: 15,
    left: 15,
    bottom: 15,
    right: 15,
    zIndex: 2,
    flexDirection: 'row',
  },
  cover: {
    width: width * 0.3,
    height: width * 0.5 - 30,
    backgroundColor: '#eee',
    elevation: 10,
  },
  coverImg: {
    width: width * 0.3,
    height: width * 0.5 - 30,
  },
  detail: {
    flex: 1,
    paddingLeft: 15,
  },
  bookName: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  bookAuthor: {
    color: '#f4f4f4',
    marginBottom: 5,
  },
  bookPublisher: {
    color: '#f4f4f4',
  },
  actions: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  action1: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: width * 0.15,
    paddingRight: width * 0.15,
  },
  action2: {
    color: '#ccc',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: width * 0.15,
    paddingRight: width * 0.15,
  },
  action3: {
    transform: [{rotate: '90deg'}],
  },
  remark: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  comPlan: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleAction: {
    flexDirection: 'row',
  },
  titleText: {
    paddingLeft: 3,
  },
  titleName: {
    color: '#333',
  },
  footerCopy: {
    backgroundColor: '#fff',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    marginTop: 15,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  notData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  unText: {
    fontSize: 13,
  },
  commItem: {
    flexDirection: 'row',
    marginTop: 10,
  },
  comCover: {},
  comImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  comDetail: {
    paddingLeft: 10,
    flex: 1,
    borderRadius: 1,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#eee',
  },
  comRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  comNick: {
    color: '#000',
    lineHeight: 20,
    height: 20,
    fontSize: 12,
  },
  comTime: {
    fontSize: 12,
    lineHeight: 20,
    height: 20,
    color: '#999',
  },
  reviewContent: {
    fontSize: 12,
  },
  titleIcon: {
    paddingTop: 3,
  },
  tuijians: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  col3: {
    width: ImageWH,
    marginTop: 10,
    alignItems: 'center',
  },
  bookCover: {
    width: ImageWH,
    height: ImageWH * 1.4,
    borderRadius: 2,
    backgroundColor: '#eee',
  },
  bookName1: {
    fontSize: 12,
    paddingTop: 5,
  },
});
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
      book: null,
      viewRef: null,
      recommends: null,
      tuijian: [],
    };
    store.subscribe(this.storeChange);
  }
  componentDidMount() {
    if (!this.state.base.member) {
      this.props.navigation.navigate('Login');
    } else {
      this.getBookData(this.props.navigation.state.params.id);
    }
  }
  getBookData = bookid => {
    _set_public_loading(true);
    HTTP.post('/api/hbjt/bookdetail', {
      bookid: bookid,
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          book: res.data,
        });
      } else {
        ToastAndroid.showWithGravity(
          '没有找到图书资料!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
      _set_public_loading(false);
    });
    HTTP.post('/v2/api/mobile/bookReview/list', {
      book_id: bookid,
      pageNum: 1,
      pageSize: 5,
      book_type: 2,
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          recommends: res.data.rows,
        });
      }
    });
    HTTP.post('/api/hbjt/bookrecommends', {
      bookid: bookid,
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          tuijian: res.data,
        });
      }
    });
  };
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
  imageLoaded = () => {
    this.setState({viewRef: findNodeHandle(this.backgroundImage)});
  };
  //页面跳转
  _goToPage = (key, param) => {
    this.props.navigation.setParams(param);
    this.getBookData(param.id);
    this.myScroll.scrollTo({x: 0, y: 0, animated: true});
  };
  //收藏
  _bookShelf = () => {
    let {book} = this.state;
    if (book.shelf_id) {
      HTTP.post('/v2/api/bookShelf/delBook', {
        book_id: book.book_id,
      }).then(res => {
        if (res.code == 0) {
          book.shelf_id = null;
          this.setState({
            book: {...book},
          });
          ToastAndroid.showWithGravity(
            '删除成功!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          ToastAndroid.showWithGravity(
            res.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      });
    } else {
      HTTP.post('/v2/api/bookShelf/addBook', {
        book_id: book.book_id,
      }).then(res => {
        if (res.code == 0) {
          book.shelf_id = 1;
          this.setState({
            book: {...book},
          });
          ToastAndroid.showWithGravity(
            '收藏成功!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          ToastAndroid.showWithGravity(
            res.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      });
    }
  };
  render() {
    const {book, viewRef, recommends, tuijian} = this.state;
    return (
      <ScrollView style={styles.container} ref={el => (this.myScroll = el)}>
        {book ? (
          <View style={styles.content}>
            <Image
              ref={img => (this.backgroundImage = img)}
              source={{uri: Util.transImgUrl(book.book_cover_small)}}
              style={styles.absolute}
              onLoadEnd={this.imageLoaded}
            />
            {viewRef ? (
              <BlurView
                style={styles.absolute}
                viewRef={viewRef}
                blurType="light"
                blurAmount={10}
              />
            ) : null}

            <View style={styles.header}>
              <View style={styles.cover}>
                <Image
                  source={{uri: Util.transImgUrl(book.book_cover_small)}}
                  style={styles.coverImg}
                />
              </View>
              <View style={styles.detail}>
                <Text style={styles.bookName}>{book.book_name}</Text>
                <Text style={styles.bookAuthor}>{book.book_author}</Text>
                <Text style={styles.bookPublisher}>{book.book_publisher}</Text>
              </View>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={this._bookShelf}>
                {book.shelf_id ? (
                  <Text style={styles.action2}>取消收藏</Text>
                ) : (
                  <Text style={styles.action1}>加入收藏</Text>
                )}
              </TouchableOpacity>
              <Icons
                name="minus"
                size={20}
                color="#ddd"
                style={styles.action3}
              />
              <TouchableOpacity>
                <Text style={styles.action1}>立即阅读</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.remark}>
              <Text style={styles.remarkTitle}>书籍简介：</Text>
              <Text style={styles.remarkText}>{book.book_remark}</Text>
            </View>
            <View style={styles.comPlan}>
              <View style={styles.titleRow}>
                <Text style={styles.titleName}>书籍评论</Text>
                <TouchableOpacity style={styles.titleAction}>
                  <Icons
                    name="form"
                    size={14}
                    color="#787878"
                    style={styles.titleIcon}
                  />
                  <Text style={styles.titleText}>写评论</Text>
                </TouchableOpacity>
              </View>
              {/* 还没有评论 */}
              {recommends && recommends.length == 0 ? (
                <View style={styles.notData}>
                  <EvilIcons
                    name="comment"
                    size={22}
                    color="#787878"
                    style={styles.unIcon}
                  />
                  <Text style={styles.unText}>还没有评论</Text>
                </View>
              ) : null}
              <View style={styles.commAll}>
                {recommends &&
                  recommends.map((item, index) => {
                    return (
                      <View key={`comm-${index}`} style={styles.commItem}>
                        <View style={styles.comCover}>
                          <Image
                            source={{
                              uri: Util.transImgUrl(item.icon),
                            }}
                            style={styles.comImg}
                          />
                        </View>
                        <View style={styles.comDetail}>
                          <View style={styles.comRow1}>
                            <Text style={styles.comNick}>{item.nick_name}</Text>
                            <Text style={styles.comTime}>
                              {item.create_time}
                            </Text>
                          </View>
                          <Text style={styles.reviewContent}>
                            {item.review_content}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>

            <View style={styles.comPlan}>
              <View style={styles.titleRow}>
                <Text style={styles.titleName}>相关推荐</Text>
              </View>
              <View style={styles.tuijians}>
                {tuijian.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      key={`book-${index}`}
                      onPress={this._goToPage.bind(this, 'Book', {
                        id: item.book_id,
                        name: item.book_name,
                      })}>
                      <View style={styles.col3}>
                        <Image
                          style={styles.bookCover}
                          source={{
                            uri: Util.transImgUrl(item.book_cover_small),
                          }}
                        />
                        <Text style={styles.bookName1} numberOfLines={1}>
                          {item.book_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <Text style={styles.footerCopy}>
              2017-2027 @ All Rights Reservd By 微悦读
            </Text>
          </View>
        ) : null}
      </ScrollView>
    );
  }
}

export default Page;
