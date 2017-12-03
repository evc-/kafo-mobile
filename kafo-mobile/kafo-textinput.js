import React, { Component } from 'react';
import { AppRegistry, TextInput, StyleSheet} from 'react-native';

export default class KafoTextInput extends Component {
    
  constructor(props) {
    super(props);
    this.state = { 
        text: '' 
    };
      
    this.updateText = this.updateText.bind(this);
  }
    
    updateText(text){
        this.setState({text});
        if (text.length === 5){
            this.props.tsRouteCall(text);
            this.props.tsStopCall(text);
        }
    }
    
    componentWillReceiveProps(nextProps){
        if (this.props.idFromMap != nextProps.idFromMap){
            
            this.updateText((nextProps.idFromMap).toString())
            
            this.setState({
                text: (nextProps.idFromMap).toString()
            })
        }
        console.log(this.props.idFromMap);
        console.log(this.state.text);
        console.log("component will update in text input");
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
        autoFocus={false}
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
 
 
