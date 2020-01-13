import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Page extends React.Component {
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
        <Text> Index Page 1</Text>
        <Button title="go to new page" onPress={this.newPage} />
      </View>
    );
  }
}
