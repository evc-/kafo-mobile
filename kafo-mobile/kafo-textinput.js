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
    
//the translink call function was passed as a prop. it takes an argument of bus number. we're giving it what was entered into the text input.

//TODO: show error for if stop number is invalid 
    
    updateText(text){
        console.log(text);
        this.setState({text});
        
        if (text.length == 5){
            this.props.translinkAPICall(text);
            this.props.changeModal(1);
            this.props.translinkStopCall(text);
//            this.props.setBusStopNum(text);
        }
    }

  render() {
    return (
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => this.updateText(text)}
        value={this.state.text}
        maxLength={6}
        placeholder={"Enter Stop ID"}
        keyboardType={'numeric'}

      />
    );
  }
}

const styles = StyleSheet.create({
       textInputStyle:{ 
        padding: 40,
        fontSize: 15,
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: '#76ABAC',
       }
});
 
 
