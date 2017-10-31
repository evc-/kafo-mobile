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
    
        componentWillMount(){
            this.watchId = navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                    lng: position.coords.longitude,
                    lat:position.coords.latitude,
                    error: null,
                    });
                },
            (error) => 
                this.setState({ 
                    error: error.message
                }),
            
                {enableHighAccuracy: false, timeout: 2000, maximumAge: 1000, distanceFilter: 10 },
                    );
            }
    
      componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
  }
                

  render() {
       
                      
    return (

        <View>
        
         <MapView 
            style={styles2.map}
            provider = { PROVIDER_GOOGLE }
            region={{
                latitude: this.state.lat,
                longitude: this.state.lng,
                latitudeDelta: 0.075,
                longitudeDelta: 0.045
            }}
        >
        </MapView>

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


const styles2 = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
    
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1
  }

});

export default KafoMapCombined;
