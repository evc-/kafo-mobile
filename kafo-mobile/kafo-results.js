import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class KafoResults extends React.Component {
    
     constructor(props) {
        super(props);  
        this.state = {appState: 3};
        
     } 

  render() {
      
    
      
    return (
        
      <View>
    
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
     touchableStyle1: {
        width: 450,
        height: 100,
        backgroundColor: '#303C45',
        fontSize: 30,
        flex: 0,
        textAlign: 'center',
        lineHeight: 100,
        color: '#F4EEE3',
        fontWeight: 'bold',
    },
    
    touchableStyle2: {
        width: 450,
        height: 100,
        backgroundColor: '#6FA7A8',
        fontSize: 30,
        flex: 0,
        textAlign: 'center',
        lineHeight: 100,
        color: '#F4EEE3',
        fontWeight: 'bold',
    }
});
   
