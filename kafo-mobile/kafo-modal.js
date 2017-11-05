import React, { Component } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import KafoHeader from './kafo-header';

class KafoModal extends Component {
    constructor(props){
        super(props);
        
        this.state={
     
        };
        
    }
    
        
  render() {
       
                      
    return (
        <KafoHeader headerText="Got enough time for coffee?" />
       
    );
  }
}

const styles = StyleSheet.create({
  map: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }

});

export default KafoModal;
