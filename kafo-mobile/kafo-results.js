import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import KafoMap from './kafo-map.js';

export default class KafoResults extends Component {
  render() {
    return (        
        <View>
        {
            
        }
            <MapJS 
        latt={this.state.lat}
        longg = {this.state.lng}
        />
      </View>
      
    );
  }
}


