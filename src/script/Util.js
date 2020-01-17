const Util = {
  //图片地址处理
  transImgUrl: url => {
    if (!url || url.trim() === '') {
      return '/assets/icon-user.png';
    } else if (url.indexOf('http') !== -1 || url.indexOf('https') !== -1) {
      return url;
    } else {
      return `http://www.tuibook.com${url}`;
    }
  },
  transImgUrl1: url => {
    if (!url || url.trim() === '') {
      return '/assets/icon-user.png';
    } else if (url.indexOf('http') !== -1 || url.indexOf('https') !== -1) {
      return url;
    } else {
      return `https://img-play.daidaidj.com/img/${url}`;
    }
  },
};
export default Util;
