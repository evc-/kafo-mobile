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
            userLocation: {lat: 49.24943966121919, lng:-123.00086935603458 },
            positionBump: 0,
            busStopCoords: {lat: null, lng: null},
            busStopNum: null,
            selectedBus: ""
        };
    
        this.tsRouteCall = this.tsRouteCall.bind(this);
        this.tsStopCall = this.tsStopCall.bind(this);
        this.modalState = this.modalState.bind(this);
        this.getCoffeeShops = this.getCoffeeShops.bind(this);
        this.apiWaypoints = this.apiWaypoints.bind(this);
        this.getAllShopDirections = this.getAllShopDirections.bind(this);
        this.selectedBus = this.selectedBus.bind(this);
     }

/*SIMPLE FUNCTIONS*/
    
componentWillMount () {
    if (true){
            this.watchId = navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        //changing userlocation to be an object with lat and long 
                        userLocation: {lng: position.coords.longitude, lat:position.coords.latitude},
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
                    userLocation: {lat: 49.250951, lng: -123.116460},
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
 
selectedBus(busIndex){
    this.setState({
        selectedBus: this.state.translinkData[busIndex]
    });
}

modalState(data){
    this.setState({
        modalState:data
    });
}

/*API CALLS*/

//get transit information 
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

//get bus stop long and lat from translink 
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

//get  coffee shops within a 500m radius
getCoffeeShops(){
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI&location="+this.state.userLocation.lat+","+this.state.userLocation.lng+"&type=cafe&radius=500").then((CSresp)=>{
        return CSresp.json();
    }).then((CSjson)=>{
        this.setState({
            coffeeShopData:CSjson.results
        }, 
            this.getAllShopDirections //run get walking directions to each shop 
        ); 
    });
}

//send directions request to google maps for 'from user location to bus stop with coffee shop on the way' 
//returns a 'promise' which is sort of like an unfulfilled request 
apiWaypoints(coffeeShop, busStop){    
    return fetch("https://maps.googleapis.com/maps/api/directions/json?origin="+this.state.userLocation.lat+","+this.state.userLocation.lng+"&destination="+busStop.lat+","+busStop.lng+"&waypoints="+coffeeShop.lat+","+coffeeShop.lng+"&mode=walking&key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI")
            .then((directionsResp)=>{
                return directionsResp.json();
          }).then((directionsRespJson)=>{
              return directionsRespJson;
          });
}

/*COMPLEX FUNCTIONS*/

//get only the coordinates for each shop  
getShopCoords(mapsObj){
    var shopCoords = mapsObj.geometry.location;
    return shopCoords;
}

//get only directions for one shop 
shopDirections(shopCoords, busStopCoords){
    var walkingTimeValue = 0; //minutes
    var allDirections = this.apiWaypoints(shopCoords, busStopCoords); //apiwaypoints returns a promise  
    return allDirections;
}
    
//get walking directions for all shops 
getAllShopDirections(){
        var promisedDirectionsArr = this.state.coffeeShopData.map(function getDirections(currentShopObj, index, array) {
            var shopCoords = this.getShopCoords(currentShopObj);
            var busStopCoords = this.state.busStopCoords;
            var shopDirections = this.shopDirections(shopCoords, busStopCoords);
            
            return shopDirections; //return array of promises 
        },this)
        
        //loop over all coffee shop data to get directions to each of them 
        //but will only get an array of promises, because apiWaypoints returns a promise
        //(shopDirections runs apiWaypoints inside it)
        //must resolve promises 
        //would usually use .then but you cant do .then on an array
        //so do promise.all

        var promisedDirection = Promise.all(promisedDirectionsArr);
        promisedDirection.then((Directions)=>{ 
             var Statuses = Directions.map(function getStatuses(currentValue, index, array){
                 //from house to shop 
                 console.log(currentValue.routes[0].legs[0].duration.value);
                 //from shop to bus stop  
                 console.log(currentValue.routes[0].legs[1].duration.value);
                 //get total walking time in seconds 
                 var walkingtimeValue = currentValue.routes[0].legs[0].duration.value + currentValue.routes[0].legs[1].duration.value;
                 
                 console.log("expected bus");
                 var shopStatus = this.checkShopStatus(walkingtimeValue/60, this.state.selectedBus.Schedules[0].ExpectedCountdown);
                 
                 var shopWithStatus = {
                       name:this.state.coffeeShopData[index].name,
                       status:shopStatus,
                       journeyTime: walkingtimeValue/60,
                       orderTime:this.state.selectedBus.Schedules[0].ExpectedCountdown - walkingtimeValue/60 ,
                       coords: this.state.coffeeShopData[index].geometry.location
                   }
                 console.log(shopWithStatus);
                 return shopWithStatus;
                 
                 
             }, this)
             
             this.setState=({
                 shopWithStatus: shopWithStatus
             });
        });
    }

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
    if (true){
        var modal = null;
                modal = (
                    <KafoModal
                        tdata ={this.state.translinkData}
                        tsStopCall = {this.tsStopCall}
                        tsRouteCall ={this.tsRouteCall}
                        setBusStopNum ={this.setBusStopNum}
                        modalState = {this.modalState}
                        selectedBus = {this.selectedBus}
                        getCoffeeShops = {this.getCoffeeShops}
                        coffeeShopData = {this.state.coffeeShopData} 
                    />    
                );

            return (
                <KeyboardAvoidingView  style={styles.container}           
                    behaviour="padding">
                    
                
                    <KafoMapCombined
                        modalState = {this.state.modalState}
                        getBusStopCoords = {this.tsStopCall}
                        coffeeShopData = {this.state.coffeeShopData} 
                        userLat = {this.state.userLocation.lat}
                        userLng = {this.state.userLocation.lng}
                    />
                
                <Text style={[styles.header]}> kafo </Text> 
                
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
        flex: 3,
        flexDirection: 'column',
        alignItems:'center',
  },
    
    header: {
        flex: 1,
        textAlign:'center',
        color: '#42565E',
        fontWeight: 'bold',
        fontSize: 27,
        backgroundColor:'rgba(255, 255, 255, 0.7)',
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: 15
        
    }
    
});


