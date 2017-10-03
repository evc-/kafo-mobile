import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

export default class KafoTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Stop Id #' };
  }

  render() {
    return (
      <TextInput
        style={{height: 140, width: 300,  borderColor: 'gray'}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}