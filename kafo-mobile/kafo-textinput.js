import React, { Component } from 'react';
import { AppRegistry, TextInput, StyleSheet} from 'react-native';

export default class KafoTextInput extends Component {
    
  constructor(props) {
    super(props);
    this.state = { text: '' };
      
    this.updateText = this.updateText.bind(this);
  }
    
    
    updateText(text){
        this.setState({text});
        if (text.length === 5){
            this.props.tsRouteCall(text);
            this.props.changeModal(1);
            this.props.tsStopCall(text);
        }
    }

  render() {
    return (
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => this.updateText(text)}
        value={this.state.text}
        maxLength={5}
        placeholder={"Enter Stop ID"}
        keyboardType={'numeric'}
        underlineColorAndroid={'transparent'}
        autoFocus={true}
      />
    );
  }
}

const styles = StyleSheet.create({
       textInputStyle:{ 
        padding: 10,
        fontSize: 25,
        textAlign: 'center',
        color: '#76ABAC',
       }
});
 
 
