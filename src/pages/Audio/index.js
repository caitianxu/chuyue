import React from 'react';
import {View, Text} from 'react-native';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(1223);
  }
  render() {
    return (
      <View>
        <Text> audio Page </Text>
      </View>
    );
  }
}

export default Page;
