const defaultState = {
  member: null,
  member_id: null,
  member_token: null,
  org_id: 214,
  token_type: 'android',
  client_type: 'QY',
  client: {},
  fullScreen: false, //是否组建全屏
  videoUri: null, //视频地址
};

export default (state = defaultState, action) => {
  let newState = {...state};
  switch (action.type) {
    case 'set_client_info':
      newState.client = {...action.data};
      break;
    case 'set_member_info':
      newState.member = {...action.data};
      newState.member_id = newState.member.id;
      newState.member_token = newState.member.token;
      newState.org_id = newState.member.org_id;
      break;
    case 'set_full_screen':
      newState.fullScreen = action.data;
      newState.videoUri = null;
      break;
    case 'set_video_uri':
      newState.videoUri = action.data;
      break;
    default:
      break;
  }
  return newState;
};
