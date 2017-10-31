import React, { Component } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import KafoResults from '../kafo-results';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class KafoMapCombined extends Component {
    constructor(props){
        super(props);
        
        this.state={
            lng: 0,
            lat: 0,
            error: null,
            appState: 2,
        };
    }
    
        componentDidMount(){
            this.watchId = navigator.geolocation.watchPosition(
                (position) => {
                    this.setState({
                    lng:position.coords.longitude,
                    lat:position.coords.latitude,
                    error: null,
                    });
                },
            (error) => 
                this.setState({ 
                    error: error.message
                }),
            
                {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 10 },
                    );
            }
    
      componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
                

  render() {
                      
    return (

        <View>
         <MapView 
            provider = { PROVIDER_GOOGLE }
            region={{
                latitude: this.state.lat,
                longitude: this.state.lng,
                latitudeDelta: 0.075,
                longitudeDelta: 0.045
            }}
        />

        <MapView.Marker
            coordinate={{
                latitude: this.state.lat,
                longitude: this.state.lng,
            }}
                        
        />

        

            <KafoResults/>
        </View>  
    );
}
}

export default KafoMapCombined;
