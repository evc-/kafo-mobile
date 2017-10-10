import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class KafoMap extends Component {
  constructor(props){
      super(props);
      
  }
    
    render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style ={styles2.container}>
        <MapView
          style={styles2.map}
        {
        //the latt and the longg is when the user clicks the bus route and then it grabs the latitude and longitude from that original page, latt and longg are just the names I gave it
        }
        region={{
            latitude: this.props.latt,
            longitude: this.props.longg,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
      width: 250,
      height: 250,
  },
});


