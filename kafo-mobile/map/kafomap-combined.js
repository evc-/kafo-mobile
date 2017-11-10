import React, { Component } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class KafoMapCombined extends Component {
    constructor(props){
        super(props);
        
        this.state={
             lat: 49.250951,
            lng: -123.116460,
            error: null,
            appState: 2,
            coffeeShopData:''
        };
        this.addLat = this.addLat.bind(this);
        this.addLong = this.addLong.bind(this);
        this.addCoffeeShopData = this.addCoffeeShopData.bind(this);
    }
    addLat(){
        this.props.checkLat(this.state.lat);
    }
    addLong(){
        this.props.checkLong(this.state.long);
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
                    //get  coffee shops within a 500m radius
                     fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI&location="+position.coords.latitude+","+position.coords.longitude+"&type=cafe&radius=500").then((CSresp)=>{
                    console.log(CSresp);
                    return CSresp.json();
                    }).then((CSjson)=>{
                    this.setState({
                             coffeeShopData:CSjson
                         });
            });
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
      addCoffeeShopData(){
        this.props.sendCSData(this.state.coffeeShopData);
    }
                
  render() {
        var coffeeResp = null;
          if (this.state.coffeeShopData != '' ){
          //this isn't working!!!
                coffeeResp = this.state.coffeeShopData.map(function callback(currentValue, index, array) {
                    return(
                        <MapView.Marker 
                        id={index}
                        coordinate={{
                            latitude: currentValue.lat,
                            longitude: currentValue.lng}} 
                        title={currentValue.name}
          />
                    );
                }, this);
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
      
  },
    location: {
        position:'absolute',
        top: 20
    }

});

export default KafoMapCombined;
