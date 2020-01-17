import store from './store';
import AsyncStorage from '@react-native-community/async-storage';
import HTTP from './request';

//获取缓存
export const _getCookie = key => {
  return new Promise(function(resolve, reject) {
    AsyncStorage.getItem(key, (err, result) => {
      if (!err && result) {
        resolve(JSON.parse(result));
      } else {
        resolve();
      }
    });
  });
};
//存储缓存
export const _setCookie = (key, value) => {
  return new Promise(function(resolve, reject) {
    AsyncStorage.setItem(key, JSON.stringify(value));
    resolve();
  });
};
//删除缓存
export const _delCookie = key => {
  return new Promise(function(resolve, reject) {
    AsyncStorage.removeItem(key);
    resolve();
  });
};

//设备信息
export const _set_client_info = param => {
  return new Promise(function(resolve, reject) {
    const action = {
      type: 'set_client_info',
      data: {...param},
    };
    store.dispatch(action);
    resolve();
  });
};

//用户登录
export const _member_login = (param, callback) => {
  HTTP.post('/v2/api/mobile/login', param).then(res => {
    if (res.code == 0) {
      const {org_id, token, token_type} = res.data;
      let newParam = {...param, org_id, token, token_type};
      _setCookie('memberInfo', newParam);
      const action = {
        type: 'set_member_info',
        data: {...res.data},
      };
      store.dispatch(action);
    } else {
      _delCookie('memberInfo');
    }
    callback && callback();
  });
};
