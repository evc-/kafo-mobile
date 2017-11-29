import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView,  Text, View, ScrollView, Button, ActivityIndicator } from 'react-native';
import KafoTextInput from './kafo-textinput';
import KafoMapCombined from './map/kafomap-combined';
import ArrivalModal from './arrivalModal';    
import KafoModal from './kafo-modal';
import CoffeeResultsModal from './coffeeResultsModal';
import Loading from './loading';

export default class App extends React.Component {
     constructor(props) {
        super(props);
         
        this.state = {
            translinkData: "",
            coffeeShopData: "",
            userLocation: {lat: 49.24943966121919, lng:-123.00086935603458 },
            positionBump: 0,
            busStopCoords: {lat: null, lng: null},
            busStopNum: null,
            selectedBus: "",
            selectedShop:[],
            shopWithStatus: null,
            toggle: false,
            shopIndex:"",
            errorMsg: "What bus are you going to?",
            modalState: 0,
            busStopCoords: '',
            busStopNum: "",
            toggle: false,
            allBusStops:[]
        };
    
        this.tsRouteCall = this.tsRouteCall.bind(this);
        this.tsStopCall = this.tsStopCall.bind(this);
        this.tsAllStops = this.tsAllStops.bind(this);
        //this.modalState = this.modalState.bind(this);
         this.changeModalState = this.changeModalState.bind(this);
        this.getCoffeeShops = this.getCoffeeShops.bind(this);
        this.apiWaypoints = this.apiWaypoints.bind(this);
        this.getAllShopDirections = this.getAllShopDirections.bind(this);
        this.selectedBus = this.selectedBus.bind(this);
        this.selectedShop = this.selectedShop.bind(this);
        this.animateEnd = this.animateEnd.bind(this);
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
    if(this.state.userLocation !== null){
        this.tsAllStops(this.state.userLocation);
    }
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

selectedShop(data){
    this.setState({
        shopIndex:data
    })
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
selectedShop(shopIndex){
  this.setState({
        selectedShop: this.state.shopWithStatus[shopIndex]
      });
   console.log("App.js Line 93: "+this.state.shopWithStatus[shopIndex].name);
   console.log("App.js Line 93: "+this.state.shopWithStatus[shopIndex].coords.lat);
   console.log("App.js Line 93: "+this.state.shopWithStatus[shopIndex].coords.lng);
}

changeModalState(page){
    this.setState({
        modalState: page
    });
}

animateEnd(data){
    this.setState({
        toggle: data
    });
}

/*API CALLS*/

//get all bus stops
tsAllStops(userLocation){
    fetch('https://kafo-all-stops.herokuapp.com/translink/'+userLocation, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json"
        }})
    .then(response=>response.json())
    .then((response) => {
        //console.log(response);
        this.setState({allBusStops:response});
    })
    .catch((error) => {
        console.log(error);
    });
}

//get transit information 
tsRouteCall(stopNum) {
    fetch('https://kafo-call.herokuapp.com/translink/' + stopNum , {method:'GET', headers:{
          "Content-Type": "application/json"
          }})
    .then(response => response.json())
    .then((responseJson) => {
        //console.log(responseJson);
        if (responseJson.Code){
            switch (responseJson.Code) {
                case "3001":
                    this.setState({errorMsg: "Invalid Stop ID. Check the sign beside the stop!"})
                break;
                case "3002":
                    this.setState({errorMsg: "Stop ID Not Found. Double check the sign beside the stop."})
                break;
                case "3003":
                    this.setState({errorMsg: "We had a problem getting the estimates for this stop. Try re-entering the ID."})
                break;
                case "3005":
                    this.setState({errorMsg: "Sorry, there are no routes serving this stop right now."})
                break;
            }
        } else {
        this.setState({translinkData:responseJson}); 
        this.setState({modalState: 1});
        }
    },
        (reason) => { //this happens if we can't communicate to translink 
        console.log(reason);
    })
    
    
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
// I change the radius cause my house is in the middle of no where, feel free to change it back -tiff
getCoffeeShops(){
    //console.log("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI&location="+this.state.userLocation.lat+","+this.state.userLocation.lng+"&type=cafe&radius=500");
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI&location="+this.state.userLocation.lat+","+this.state.userLocation.lng+"&type=cafe&radius=500").then((CSresp)=>{
        return CSresp.json();
    }, (reason)=>{
        console.log("Get coffee shops fetch failed");
        console.log(reason);
    }
    ).then((CSjson)=>{
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

checkShopStatus(walkingTimeValue, nextBusTimeValue){
        var timeRequired = walkingTimeValue; //TODO: add time buffer 
        
        if (timeRequired > nextBusTimeValue){
            return "statusRed";
        }
        
        else if (timeRequired == nextBusTimeValue){
            return "statusOrange";
        }
        
       else if (timeRequired < nextBusTimeValue){
            return "statusGreen";
        }
}
    
//get walking directions for all shops 
getAllShopDirections(){
        var promisedDirectionsArr = this.state.coffeeShopData.map(function getDirections(currentShopObj, index, array) {
            var shopCoords = this.getShopCoords(currentShopObj);
            var busStopCoords = this.state.busStopCoords;
            var shopDirections = this.shopDirections(shopCoords, busStopCoords);
            
            return shopDirections; //return array of promises 
        },this);

        var promisedDirection = Promise.all(promisedDirectionsArr);
        promisedDirection.then((Directions)=>{ 
             var Statuses = Directions.map(function getStatuses(currentValue, index, array){
                 
                 //from house to shop 
                 //console.log(currentValue.routes[0].legs[0].duration.value);
                 //from shop to bus stop  
                 //console.log(currentValue.routes[0].legs[1].duration.value);
                 
                 //get total walking time in seconds 
                 
                 var walkingtimeValue = currentValue.routes[0].legs[0].duration.value + currentValue.routes[0].legs[1].duration.value;
            
                 var shopStatus = this.checkShopStatus(walkingtimeValue/60, this.state.selectedBus.Schedules[0].ExpectedCountdown);
                 //currently only getting first bus - we may want to include the second bus as well for high traffic location 
                 
                 var polyline= currentValue.routes[0].legs[0].steps[0].polyline.points;       

                 var shopWithStatus = {
                        name:this.state.coffeeShopData[index].name,
                        status:shopStatus,
                        nextBus: this.state.selectedBus.Schedules[0].ExpectedCountdown,
                        journeyTime:Number((walkingtimeValue/60).toFixed()),
                        orderTime:this.state.selectedBus.Schedules[0].ExpectedCountdown - (walkingtimeValue/60) ,
                        coords: this.state.coffeeShopData[index].geometry.location,
                        polyline: polyline
                   }

                 return shopWithStatus;
                 
             }, this);
             
             this.setState({
                 shopWithStatus: Statuses
             });
            
            //console.log(Statuses);
            
        });
    }
  render() {
       var display = null;
     if(this.state.toggle === false){
        display = (
             <Loading 
            animateEnd = {this.animateEnd}
            />
         )
        
        return display;
         
     } else if (this.state.toggle === true){
        var modal = null;
                modal = (
                    <KafoModal
                        tdata ={this.state.translinkData}
                        tsStopCall = {this.tsStopCall}
                        tsRouteCall ={this.tsRouteCall}
                        setBusStopNum ={this.setBusStopNum}
                        changeModalState = {this.changeModalState}
                        modalState = {this.state.modalState}
                        selectedBus = {this.selectedBus}
                        selectShop= {this.selectedShop}
                        getCoffeeShops = {this.getCoffeeShops}
                        coffeeShopData = {this.state.coffeeShopData}
                        shopWithStatus = {this.state.shopWithStatus}
                        errorMsg = {this.state.errorMsg}

                    />    
                );

    return (
                <KeyboardAvoidingView  style={styles.container}           
                    behaviour="padding">
                    
                
                    <KafoMapCombined
                        changeModalState = {this.changeModalState}
                        modalState = {this.state.modalState}
                        getBusStopCoords = {this.tsStopCall}
                        coffeeShopData = {this.state.coffeeShopData} 
                        userLat = {this.state.userLocation.lat}
                        userLng = {this.state.userLocation.lng}
                        busStopCoords = {this.state.busStopCoords}
                        sendShopIndex = {this.state.selectedShop} 
                        shopWithStatus = {this.state.shopWithStatus}
                        allBusStops = {this.state.allBusStops}
                    />
                
                <Text style={[styles.header]}> kafo </Text> 
                
                    <View 
                        style={[styles.modalStyle,{bottom: Dimensions.get('window').height * .4 + 20 + this.state.positionBump} ]}>
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
        height: Dimensions.get('window').height * .4
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
        fontSize: 15,
        backgroundColor:'rgba(255, 255, 255, 0.7)',
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: 15
        
    }
    
});


