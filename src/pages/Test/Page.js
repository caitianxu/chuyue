import React from 'react';
import {  View, Text, Button } from 'react-native';

export default class Page extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  newPage = () => {
    this.props.navigation.navigate('Setting')
  }
  render() {
    return (
      <View>
        <Text> test componentText </Text>
        <Button title="go to new page" onPress={this.newPage} />
      </View>
    );
  }
}
