import React, { Component } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import KafoResults from '../kafo-results';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class KafoMap extends Component {
    constructor(props){
        super(props);
        
        this.state={
            lng:0,
            lat:0,
            isMapReady: false,
            appState: 2
        }
    }

        navigator.geolocation.watchPosition(
        var self=this;
          function(data){
              self.setState({
                  lng:data.coords.longitude,
                  lat:data.coords.latitude
              })
          },
            function(err){
                console.log(err);
            },
            
             {enableHighAccuracy: false, timeout: 1000, maximumAge: 0}

      )
            this.setState({ 
                isMapReady: true 
            })
        
    }

//    onMapLayout = () => {
//        this.setState({ isMapReady: true });
//    }
    
    
  render() {
          const { region } = this.props;
      
            if (this.state.isMapReady == true){
                var renderMapView =   
                    <MapView 
                        provider = { PROVIDER_GOOGLE }
                        region={{
                        latitude: this.state.lat,
                        longitude: this.state.lng,
                        latitudeDelta: 0.075,
                        longitudeDelta: 0.045,
                        }}
                    ></MapView>
            }    
    
    
      if (this.state.isMapReady == true){
                var renderMapMarker =   
                     <MapView.Marker
                        coordinate={{
                        latitude: this.state.lat,
                        longitude: this.state.lng,
                        }}
                        />
                }   

    return (

    <View style={styles.container}>
        
        {renderMapView}
        {renderMapMarker}
        <KafoResults/>
        
    </View>
        
        
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    
    mapPage: {
    flex: 1
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
