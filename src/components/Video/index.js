import React, {Component} from 'react';
import {
  View,
  Text,
  Slider,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import Icons from 'react-native-vector-icons/Feather';
import {_set_full_screen} from '../../script/action';
import Util from '../../script/util';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 750,
      height: 350,
      loading: true,
      play: true,
      currentTime: 0, // 视频当前播放的时间
      duration: 0, // 视频的总时长
      showControl: true, //显示工具栏
    };
  }
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  //动态计算高度
  _onLayout = event => {
    let {width, height} = event.nativeEvent.layout;
    this.setState({
      width: width,
      height: height,
    });
  };
  //开始加载
  _onLoadStart = data => {
    console.log('开始加载', data);
  };
  //加载完成
  _onLoaded = data => {
    this.setState({
      duration: data.duration,
      loading: false,
    });
    //全屏
    // this.player.presentFullscreenPlayer();
    //翻转屏幕
    // Orientation.lockToLandscape();
    this._closeControl();
  };
  //播放进度
  _onProgressChanged = data => {
    if (this.state.play) {
      this.setState({
        currentTime: data.currentTime,
      });
    }
  };
  //视频结束
  _onPlayEnd = () => {};
  //视频异常
  _onPlayError = () => {};
  //缓冲
  _onBuffering = () => {
    console.log('开始缓冲');
  };
  //视频点击
  _videoEvent = () => {
    this.setState({
      showControl: !this.state.showControl,
    });
  };
  //进度条改变
  onSliderValueChanged = currentTime => {
    this.player.seek(currentTime);
    if (this.state.play) {
      this.setState({
        currentTime: currentTime,
      });
    } else {
      this.setState({
        currentTime: currentTime,
        play: true,
      });
    }
  };
  //暂停， 播放
  _videoChange = () => {
    let play = !this.state.play;
    this.setState({
      play: play,
    });
  };
  //关闭工具栏
  _closeControl = () => {
    this.timeOut = setTimeout(() => {
      this.setState({
        showControl: false,
      });
    }, 6000);
  };
  //显示工具栏
  _showControl = () => {
    clearTimeout(this.timeOut);
    this.setState({
      showControl: true,
    });
  };
  //推出视频
  _closeVideo = () => {
    //禁止全屏
    // this.player.dismissFullscreenPlayer();
    //翻转屏幕
    // Orientation.lockToPortrait();
    _set_full_screen(false);
  };

  render() {
    const {uri} = this.props;
    const {
      width,
      height,
      play,
      loading,
      currentTime,
      duration,
      showControl,
    } = this.state;
    const styles = StyleSheet.create({
      fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1000,
      },
      videoFull: {
        width: width,
        height: height,
        backgroundColor: '#000000',
      },
      control: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingLeft: 10,
        paddingRight: 10,
        width: width,
        zIndex: 1002,
      },
      time: {
        fontSize: 12,
        color: 'white',
        marginLeft: 10,
        marginRight: 10,
      },
      loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1001,
        justifyContent: 'center',
      },
    });
    return (
      <View onLayout={this._onLayout} style={styles.fullScreen}>
        <TouchableOpacity onPress={this._videoEvent} activeOpacity={1}>
          {uri ? (
            <Video
              ref={el => (this.player = el)}
              source={{
                uri: uri,
              }}
              rate={1.0} //播放速度
              volume={1.0} //音量
              muted={false} //是否静音
              paused={!play} //是否暂停
              resizeMode={'contain'} // contain（包含） cover(覆盖) stretch(拉伸)
              playInBackground={false} //后台播放
              playWhenInactive={false} //回到视频时 是否继续播放
              onLoadStart={this._onLoadStart}
              onLoad={this._onLoaded}
              onProgress={this._onProgressChanged}
              onEnd={this._onPlayEnd}
              onError={this._onPlayError}
              onBuffer={this._onBuffering}
              style={styles.videoFull}
            />
          ) : null}
        </TouchableOpacity>
        {showControl ? (
          <TouchableWithoutFeedback>
            <View style={styles.control}>
              <TouchableOpacity onPress={this._videoChange}>
                {play ? (
                  <Icons name="pause" size={20} color="#fff" />
                ) : (
                  <Icons name="play" size={20} color="#fff" />
                )}
              </TouchableOpacity>
              <Text style={styles.time}>{Util.formatTime(currentTime)}</Text>
              <Slider
                style={{flex: 1}}
                thumbTintColor={'#ffffff'}
                maximumTrackTintColor={'#999999'}
                minimumTrackTintColor={'#ffffff'}
                value={currentTime}
                minimumValue={0}
                maximumValue={this.state.duration}
                onValueChange={currentTime => {
                  this.onSliderValueChanged(currentTime);
                }}
              />
              <Text style={styles.time}>{Util.formatTime(duration)}</Text>
              {/* {play ? (
              <Icons name="minimize" size={20} color="#fff" />
            ) : (
              <Icons name="maximize" size={20} color="#fff" />
            )} */}
              <TouchableOpacity onPress={this._closeVideo}>
                <Icons name="x" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text>加载中</Text>
          </View>
        ) : null}
      </View>
    );
  }
}
