import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import store from '../../script/store';
import Icons from 'react-native-vector-icons/AntDesign';
import {StackActions, NavigationActions} from 'react-navigation';
import {_clear_store_all} from '../../script/action';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 10,
  },
  name: {
    lineHeight: 30,
    color: '#999',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    lineHeight: 30,
  },
  valueIcon: {
    paddingTop: 6,
    paddingLeft: 5,
  },
  rightAccount: {
    lineHeight: 30,
    paddingRight: 25,
  },
  button: {
    marginTop: 100,
    marginBottom: 30,
    backgroundColor: '#e94f4f',
    borderRadius: 5,
    marginLeft: 50,
    marginRight: 65,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
  },
});
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: store.getState(),
    };
    store.subscribe(this.storeChange);
  }
  componentDidMount() {}
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
  //注销
  _loginup = () => {
    Alert.alert('提示', '你确定退出登录吗?', [
      {text: '取消'},
      {
        text: '确定',
        onPress: () => {
          _clear_store_all().then(() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Home'})],
            });
            this.props.navigation.dispatch(resetAction);
          });
        },
      },
    ]);
  };
  render() {
    return (
      <View style={styles.safeAreaView}>
        <View style={styles.row}>
          <Text style={styles.name}>账号</Text>
          <View style={styles.rightAccount}>
            <Text style={styles.value}>12222</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>头像</Text>
          <View style={styles.right}>
            <Text style={styles.value}>12222</Text>
            <Icons
              style={styles.valueIcon}
              name="right"
              size={20}
              color="#ccc"
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>昵称</Text>
          <View style={styles.right}>
            <Text style={styles.value}>12222</Text>
            <Icons
              style={styles.valueIcon}
              name="right"
              size={20}
              color="#ccc"
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>性别</Text>
          <View style={styles.right}>
            <Text style={styles.value}>12222</Text>
            <Icons
              style={styles.valueIcon}
              name="right"
              size={20}
              color="#ccc"
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>个性签名</Text>
          <View style={styles.right}>
            <Text style={styles.value}>12222</Text>
            <Icons
              style={styles.valueIcon}
              name="right"
              size={20}
              color="#ccc"
            />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={this._loginup}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>注销</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Page;
