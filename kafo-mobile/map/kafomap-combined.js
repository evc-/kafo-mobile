import React, { Component } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import KafoResults from '../kafo-results';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class KafoMapCombined extends Component {
    constructor(props){
        super(props);
        
        this.state={
             lat: 49.250951,
            lng: -123.116460,
            error: null,
            appState: 2,
        };
        this.addLat = this.addLat.bind(this);
        this.addLong = this.addLong.bind(this);
        
    }
    addLat(){
        this.props.checkLat(this.state.lat);
    }
    addLong(){
        this.props.checkLong(this.state.long);
    }
    
    getAllShopStatus(shopAPIArray, userLocation, busStopNum, busResponse){
        
        var statusArray = shopAPIArray.map(function getShopStatus(currentShopObj, index, array) {
            var shopCoords = this.getShopCoords(currentShopObj);
            var busStopCoords = this.getBusStopCoords(busStopNum);
            var walkingTimeValue = this.getWalkingTime(userLocation, shopCoords, busStopCoords);
            var shopStatus = this.checkShopStatus(walkingTimeValue, busResponse.expectedCountdown);
            
            return {Status:shopStatus, Coordinates:shopCoords};
            
        },this)
        
        return statusArray;
    }
    
    //this function takes the object returned by the Places API call and gets its coordinates 
    getShopCoords(mapsObj){
        var shopCoords = {lat:0, long:0};
        return shopCoords;
    }
    
    //TODO: make this function take a bus stop ID and return its coordinates
    getBusStopCoords(busStopNum){
        var busStopCoords = {lat:0, long:0};
        return busStopCoords;
    }
    
    //this function adds up the walking times from the user location to the shop and then to the bus stop
    //requires the direction api 
    getWalkingTime(userlocation, shopCoords, busStopCoords){
        var walkingTimeValue = 0; //minutes
        //replace with userlocation to shopCoords to busCoords;
        return walkingTimeValue;
    }
    
    //this function takes the walking time value calculated from the previous function and compares it to the time until the next bus arrival, to return a status of red, green, or orange 
    checkShopStatus(walkingTimeValue, nextBusTimeValue){
        var timeRequired = walkingTimeValue + nextBusTimeValue; //TODO: add time buffer 
        
        if (timeRequired > nextBusTimeValue){
            return "statusRed";
        }
        
        if (timeRequired == nextBusTimeValue){
            return "statusOrange";
        }
        
        if (timeRequired < nextBusTimeValue){
            return "statusGreen";
        }
    }
    
    
        componentWillMount(){
            //set to true to get actual location 
            if (false){
                  this.watchId = navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                    lng: position.coords.longitude,
                    lat:position.coords.latitude,
                    error: null,
                    });
                    //get  coffee shops within a 500m radius
                     fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI&location="+position.coords.latitude+","+position.coords.longitude+"&type=cafe&radius=500").then((resp)=>{
                    console.log("resp");
                    return resp.json();
                    }).then((json)=>{
                    console.log("test", json);
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
                
  render() {
              
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
