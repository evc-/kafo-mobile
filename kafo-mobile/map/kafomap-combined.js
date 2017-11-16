import React, { Component } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import CoffeeResultsModal from '../coffeeResultsModal';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
class KafoMapCombined extends Component {
    constructor(props){
        super(props);
        
        this.state={
            lat: 49.250951,
            lng: -123.116460,
            error: null
        };
        this.addLat = this.addLat.bind(this);
        this.addLong = this.addLong.bind(this);
    }
    addLat(){
        var lat = this.state.lat;
        this.props.userLat(lat);
    }
    addLong(){
        var lng = this.state.lng;
        this.props.userLong(lng);
    }
        componentWillMount(){
            //set to true to get actual location 
            if (true){
                  this.watchId = navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                    lng: position.coords.longitude,
                    lat:position.coords.latitude,
                    error: null,
                    });
                        this.addLat();
                        this.addLong();
                },
            (error) => 
                this.setState({ 
                    error: error.message
                }),
            
                {enableHighAccuracy: false, timeout: 2000, maximumAge: 1000, distanceFilter: 10 },
                    );
            } else {
                this.setState({
                    lat: 49.250951,
                    lng: -123.116460,
                    error: null
                })
            }
        }
    
      componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
  }             
  render(){
    var coffeeResp = null;
      //console.log("results",this.props.coffeeShopData);
 if (this.props.modalState >= 1){
          if (this.props.coffeeShopData){
            coffeeResp = this.props.coffeeShopData.map((currentValue, index, array)=>{
                    return(
                        <MapView.Marker 
                        id={index}
                        coordinate={{
                            latitude: currentValue.geometry.location.lat,
                            longitude: currentValue.geometry.location.lng}} 
                        title={currentValue.name}
                    />  
                    )                                      
                });
          }
 }
    
      
    return (

        <View>
                
         <MapView 
            style={styles.map}
            provider = { PROVIDER_GOOGLE }
            region={{
                latitude: this.state.lat,
                longitude: this.state.lng,
                latitudeDelta: 0.075,
                longitudeDelta: 0.045
            }}
        >
        <MapView.Marker
            coordinate={{
        
                latitude: this.state.lat,
                longitude: this.state.lng,
        
            }}
        />
               {coffeeResp}
        </MapView>
        </View>  

    );
}
}


const styles = StyleSheet.create({
  map: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      zIndex: -6000
      
  }
});

export default KafoMapCombined;
