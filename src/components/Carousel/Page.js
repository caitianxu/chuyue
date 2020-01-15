import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

/**
 * 跑马灯
 */
export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { banner, width } = this.props;
    const height = width * 0.5;
    const styles = StyleSheet.create({
      parent: {
        backgroundColor: '#f90',
        width: width,
        height: height,
        position: 'relative'
      },
      scroll: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute'
      },
      item: {
        width: width,
        height: height,
        backgroundColor: '#ff88aa',
        borderRightWidth: 1
      }
    });
    return (
      <View style={styles.parent}>
        <View style={styles.scroll}>
          {
            banner.map((item, index) => {
              return <View style={styles.item}>
                <Image source={item.pic} style={{ width: width, height: height }} resizeMode="cover"/>
              </View>
            })
          }
        </View>
      </View>
    )
  }
}
