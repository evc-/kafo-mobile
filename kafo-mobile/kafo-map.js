import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class KafoMap extends Component {
    constructor(props) {
        super(props);  
        this.state = {appState: 2};
        
  }
    
    
    
  render() {
    return (        
        <View>
            <Text>
                Map
            </Text>
      </View>
    );
  }
}


