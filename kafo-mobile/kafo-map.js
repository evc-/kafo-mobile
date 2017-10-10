import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

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

  constructor(props){
      super(props);
      
  }
    
    render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style ={styles2.container}>
        <MapView style={styles2.map}
        region={{
            latitude: this.props.latt,
            longitude: this.props.longg,
            latitudeDelta: 0.075,
            longitudeDelta: 0.045,
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
      width: 300,
      height: 300,
      position:'absolute',
  },
});


