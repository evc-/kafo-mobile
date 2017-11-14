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
            error: null,
            userCoords: {
                        lng:49.250951,
                        lat:-123.116460
                    },
            appState: 2,
            coffeeShopData:''

        };
        this.addLat = this.addLat.bind(this);
        this.addLong = this.addLong.bind(this);
        this.addCoffeeShopData = this.addCoffeeShopData.bind(this);
        this.getWalkingTime = this.getWalkingTime.bind(this);
        this.testDirectionsAPI = this.testDirectionsAPI.bind(this);

    }
    addLat(){
        this.props.checkLat(this.state.lat);
    }
    addLong(){
        this.props.checkLong(this.state.long);
    }
    
    //this function combines the 4 different functions required. it will take in the array of shops fetched from the Places API, it'll take in the user location, the bus stop number they're at, and the entire bus response returned by the Translink API 
    
    getAllShopStatus(shopAPIArray, userLocation, busResponse){
        
        //we need to check the status of each stop that is returned in the radius. so will use a map (like a for loop), to do the following functions to each item in the array 
        //1. get the coordinates of the shop (for each shop in the array)
        //2. get the coordinates of the bus stop 
        //3. calucate the walking time (from user location to each shop, and to the bus stop)
        //4. assign a status, taking the time required from walking and comparing it to the expected countdown property of the bus response from the translinkAPI 
        //finally, return an object (for each shop) that includes its status and its coordinates. that way, we can place the colored icons on the coordinates! 
        
        var statusArray = shopAPIArray.map(function getShopStatus(currentShopObj, index, array) {
            
            var shopCoords = this.getShopCoords(currentShopObj);
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
    getBusStopCoords(){
        return this.props.sendStopCoords;
    }
    
    //this function adds up the walking times from the user location to the shop and then to the bus stop
    //requires the direction api 
    
    getWalkingTime(userlocation, shopCoords, busStopCoords){
        /*this is returning the user location and two undefined objects
        fetch will be uncommented when it works properly!
        console.log(userlocation, shopCoords, busStopCoords);
       fetch("https://maps.googleapis.com/maps/api/directions/json?origin="+userLocation+"&destination="+busStopCoords+"&waypoints="+shopCoords+"&key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI")
           .then((directionsResp)=>{
            return directionsResp.json();

        }).then((directionsRespJson)=>{
            console.log(directionsRespJson);
        });
        //var walkingTimeValue = 0; //minutes
        //replace with userlocation to shopCoords to busCoords;
        //return walkingTimeValue;
    
        */
    }
    
testDirectionsAPI(){
    fetch("https://maps.googleapis.com/maps/api/directions/json?origin=49.24944847090056,-123.00076246261597&destination=49.25150043342449,-123.00415277481079&waypoints=49.250337898575935,-123.00160467624664&mode=walking&key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI")
           .then((response)=>{
            return response.json();

        }).then((responseJson)=>{
            console.log(responseJson);
           });
    console.log("sent fetch request!");
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
            if (true){
                  this.watchId = navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                    lng: position.coords.longitude,
                    lat:position.coords.latitude,
                    error: null,
                    userCoords : {
                        lng:position.coords.longitude,
                        lat:position.coords.latitude
                    }
                    });
                    //get  coffee shops within a 500m radius
                     fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI&location="+position.coords.latitude+","+position.coords.longitude+"&type=cafe&radius=100").then((CSresp)=>{
                   // console.log(CSresp);
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
    
    

                
  render(){
      
      /*
              var coffeeResp = null;
          if (this.state.coffeeShopData != '' ){
          //this isn't working!!!
            var coffeeResp = this.state.coffeeShopData.map(function callback(currentValue, index, array) {
  
          if (this.state.coffeeShopData != '' ){
          //this isn't working!!!
                var coffeeResp = this.state.coffeeShopData.map(function makeShopMaker(currentValue, index, array) {

                    return(
                        <MapView.Marker 
                        id={index}
                        coordinate={{
                            latitude: currentValue.lat,
                            longitude: currentValue.lng}} 
                        title={currentValue.name}
                    />  
                    )                                      
                }, this); 
                */
        var dummyShops = null;
      if (this.props.modalState >= 1){
          dummyShops = (
          <View>
              <MapView.Marker
            coordinate={{
                latitude: 49.2501606,
                longitude:-123.0000981599999
        }}
        title={"Tim Hortons"}
        onPress={this.testDirectionsAPI}
       />
        <MapView.Marker
            coordinate={{
                latitude: 49.2507179999999,
                longitude: -123.00140379999999
        }}
        title={"Gateway Deli"}
        />
        <MapView.Marker
            coordinate={{
                latitude: 49.2470834,
                longitude: -123.00188270000001
        }}
        title={"The Stand"}
        />
              </View>
          )
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
               
        {dummyShops}
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
