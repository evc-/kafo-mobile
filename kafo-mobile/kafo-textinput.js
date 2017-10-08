import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

export default class KafoTextInput extends Component {
    
  constructor(props) {
    super(props);
    this.state = { text: '' };
      
    this.updateText = this.updateText.bind(this);
  }
    
    //a function to update the text with with whatever is entered 
    //then we check the length of the entry and if its 5 characters then we set the "state" of the components text to be "test"
    updateText(text){
        
        this.setState({text});
        if (text.length == 5){
            this.props.changePage(1);
        }
    }

  render() {
    return (
      <TextInput
        style={{height: 140, width: 300,  borderColor: 'gray'}}
        onChangeText={(text) => this.updateText(text)}
        value={this.state.text}
        maxLength={5}
        placeholder={"Enter Stop ID"}

      />
    );
  }
}