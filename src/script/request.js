import qs from 'qs';
import store from './store';

const ctxPath = 'http://www.tuibook.com';
const HTTP = {
  get: (url, params) => {
    if (!params) params = {};
    return new Promise((resolve, reject) => {
      fetch(`${ctxPath}${url}?${qs.stringify(params)}`, {
        method: 'GET',
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject({
            code: 400,
            message: '数据请求异常',
          });
        });
    });
  },
  post: (url, params) => {
    if (!params) params = {};
    const {
      token_type,
      client_type,
      member_token,
      member_id,
      org_id,
    } = store.getState();
    let newParam = {
      token_type,
      client_type,
      member_token,
      member_id,
      org_id,
      ...params,
    };
    return new Promise((resolve, reject) => {
      fetch(`${ctxPath}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: qs.stringify(newParam),
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject({
            code: 400,
            message: '数据请求异常',
          });
        });
    });
  },
};

export default HTTP;