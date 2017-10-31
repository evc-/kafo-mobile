import React, { Component } from 'react';
import { AppRegistry, TextInput, StyleSheet} from 'react-native';

export default class KafoTextInput extends Component {
    
  constructor(props) {
    super(props);
    this.state = { text: '' };
      
    this.updateText = this.updateText.bind(this);
  }
    
//a function to update the text with with whatever is entered 
//then we check the length of the entry and if its 5 characters then we set the "state" of the component to be 1"
    updateText(text){
        console.log(text);
        this.setState({text});
        if (text.length == 5){
           var stopInp = this.state.text;
           console.log("Stop Input: "+stopInp);
            this.props.changePage(1);
        }
    }

  render() {
    return (
      <TextInput
        style={inputStyles.textInputStyle}
        onChangeText={(text) => this.updateText(text)}
        value={this.state.text}
        maxLength={6}
        placeholder={"Enter Stop ID"}
keyboardType={'numeric'}

      />
    );
  }
}

const inputStyles = StyleSheet.create({
    
    textInputStyle:{ 
        height: 120,
        width: 400,  
        borderColor: 'gray',
        fontSize: 30,
        textAlign: 'center',
    },
    
  container: {
    flex: 1,
    fontSize: 30,
    alignItems: 'center',
  },
    
});