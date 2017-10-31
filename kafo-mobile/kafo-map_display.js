import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class KafoMapDisplay extends Component {

    constructor(props) {
        super(props);  
        this.state = {appState: 2};
        this.buttonPressFunctions = this.buttonPressFunctions.bind(this);
        
  } 
    
    buttonPressFunctions(){   
            //this.props.mapPage(3);
           // this.props.selectRouteProp(this.props.selectedBusIndex);
        }
    
    render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style ={styles2.container}>
        
        <MapView 
            onPress={this.buttonPressFunctions}
            provider = { PROVIDER_GOOGLE }
            style={styles2.map}
            region={{
                latitude: this.props.latt,
                longitude: this.props.longg,
                latitudeDelta: 0.075,
                longitudeDelta: 0.045,
              }}
        >

        <MapView.Marker
            coordinate={{
            latitude: this.props.latt,
            longitude: this.props.longg,
            }}
        />
    
        </MapView>

      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

});


