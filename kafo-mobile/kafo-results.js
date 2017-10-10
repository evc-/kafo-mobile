import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapJS from './kafo-maps.js';

export default class KafoResults extends Component {
  render() {
    return (        
        <View>
        {
            //this will display the map
        }
            <MapJS 
        latt={this.state.lat}
        longg = {this.state.lng}
        />
      </View>
      </View>
    );
  }
}


