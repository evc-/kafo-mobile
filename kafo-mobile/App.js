import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView,  Text, View, ScrollView, Button } from 'react-native';
import KafoTextInput from './kafo-textinput';
import KafoMapCombined from './map/kafomap-combined';
import ArrivalModal from './arrivalModal';    
import KafoModal from './kafo-modal';
import CoffeeResultsModal from './coffeeResultsModal';

export default class App extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
            appState: 0,
            translinkData: "",
            coffeeShopData: "",
           lat:49.24943966121919,
           lng:-123.00086935603458,
            positionBump: 0,
            busStopCoords: '',
            busStopNum: ""
        };

        this.tsRouteCall = this.tsRouteCall.bind(this);
        this.tsStopCall = this.tsStopCall.bind(this);
        this.modalState = this.modalState.bind(this);
        this.getCoffeeShops = this.getCoffeeShops.bind(this);
        this.apiWaypoints = this.apiWaypoints.bind(this);
     }

componentWillMount () {
    if (true){
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
            } else {
                this.setState({
                    lat: 49.250951,
                    lng: -123.116460,
                    error: null
                })
            }
    
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    navigator.geolocation.clearWatch(this.watchId);
  }
    
keyboardWillShow = (event) => {
    this.setState({positionBump: event.endCoordinates.height});
}

keyboardWillHide = (event) => {
    this.setState({positionBump: 0});
}

tsRouteCall(stopNum) {
    fetch('https://kafo-call.herokuapp.com/translink/' + stopNum , {method:'GET', headers:{
          "Content-Type": "application/json"
          }})
    .then(response => response.json())
    .then((responseJson) => {
        this.setState({translinkData:responseJson}); 
    })
    .catch((error) => {
        console.log(error);
    });
}
// attached to the "Go" button in Modal screen 4
apiWaypoints(){
    fetch("https://maps.googleapis.com/maps/api/directions/json?origin="+this.state.userLat+","+this.state.userLong+"&destination=49.25150043342449,-123.00415277481079&waypoints=49.250337898575935,-123.00160467624664&mode=walking&key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI")
            .then((directionsResp)=>{
              return directionsResp.json();
  
          }).then((directionsRespJson)=>{
              console.log("directions" +directionsResp.json);
          });
}

tsStopCall(stopNum){
        fetch('https://kafo-stop-call.herokuapp.com/translink/' + stopNum , {method:'GET', headers:{
          "Content-Type": "application/json"
          }})
    .then(response => response.json())
    .then((stopRespJson) => {
        this.setState({
            busStopCoords:{
            lat:stopRespJson.Latitude,
            lng:stopRespJson.Longitude
        }}); 
    })
    .catch((error) => {
        console.log(error);
    });
}
    selectedBus(data){
        this.setState({
            selectedBus: this.props.selectedBus
        });
    }
modalState(data){
    this.setState({
        modalState:data
    });
}
//get  coffee shops within a 500m radius
getCoffeeShops(){
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI&location="+this.state.lat+","+this.state.lng+"&type=cafe&radius=500").then((CSresp)=>{
                    return CSresp.json();
                    }).then((CSjson)=>{
                    console.log(CSjson);
                    this.setState({
                             coffeeShopData:CSjson.results
                         });
    });
}
 //this function combines the 4 different functions required. it will take in the array of shops fetched from the Places API, it'll take in the user location, the bus stop number they're at, and the entire bus response returned by the Translink API 
    
    getAllShopStatus(shopAPIArray, userLocation, busStopCoords, busResponse){
        
        //we need to check the status of each stop that is returned in the radius. so will use a map (like a for loop), to do the following functions to each item in the array 
        //1. get the coordinates of the shop (for each shop in the array)
        //2. get the coordinates of the bus stop 
        //3. calucate the walking time (from user location to each shop, and to the bus stop)
        //4. assign a status, taking the time required from walking and comparing it to the expected countdown property of the bus response from the translinkAPI 
        //finally, return an object (for each shop) that includes its status and its coordinates. that way, we can place the colored icons on the coordinates! 
        
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
  render() {

//add a selectedbusIndex prop so we have the index of which button they clicked on 
//add a selectRouteProp so we can call have the selectRoute function from the button component 
//if the state exists, map the object (in the state) to create the buttons 
      
    if (true){
        var modal = null;
                modal = (
                    <KafoModal
                        tdata ={this.state.translinkData}
                        tsStopCall = {this.tsStopCall}
                        tsRouteCall ={this.tsRouteCall}
                        setBusStopNum ={this.setBusStopNum}
                        modalState = {this.modalState}
                        selectedRoute = {this.selectedBus}
                        getCoffeeShops = {this.getCoffeeShops}
                    />    
                );

            return (
                <KeyboardAvoidingView  style={styles.container}           
                    behaviour="padding">
                    
                    <KafoMapCombined
                        modalState = {this.state.modalState}
                        getBusStopCoords = {this.tsStopCall}
                        coffeeShopData = {this.state.coffeeShopData} 
                        userLat = {this.state.lat}
                        userLng = {this.state.lng}
                    />
                    <View 
                        style={[styles.modalStyle,{bottom: Dimensions.get('window').height * .3 + 20 + this.state.positionBump} ]}>
                        {modal}
                    </View>
                </KeyboardAvoidingView >
            );
      } 
  }
}

const styles = StyleSheet.create({

    modalStyle: {
        borderRadius: 15,
        width: '90%',
        backgroundColor:'rgba(255, 255, 255, 0.9)',
        height: Dimensions.get('window').height * .3,
      },
    
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
  }
    
});


