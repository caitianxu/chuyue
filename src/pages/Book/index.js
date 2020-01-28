import React from 'react';
import {View, Text} from 'react-native';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.navigation.state.params.id);
    console.log(this.props.navigation.state.params.name);
  }
  // static navigationOptions = ({navigation}) => {
  //   console.log(navigation);
  //   let str = navigation.state.params.name;
  //   if (str.length > 10) {
  //     str = str.substr(0, 12) + '...';
  //   }
  //   return {
  //     headerTitle: str,
  //     headerRight: (
  //       <TouchableOpacity>
  //         <Text>搜索</Text>
  //       </TouchableOpacity>
  //     ),
  //   };
  // };
  render() {
    return (
      <View>
        <Text> book Page </Text>
      </View>
    );
  }
}

export default Page;
