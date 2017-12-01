import React, { Component } from 'react';
import { Modal, TouchableHighlight, AppRegistry, Image, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView,  TouchableOpacity, Text, View, ScrollView, Button, ActivityIndicator } from 'react-native';
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
            userLocation: {lat: null, lng:null },
            positionBump: 0,
            busStopCoords: {lat: null, lng: null},
            busStopNum: null,
            selectedBus: null,
            selectedShop:[],
            shopWithStatus: null,
            toggle: false,
            shopIndex:"",
            errorMsg: "What bus are you going to?",
            modalState: 0,
            busStopCoords: '',
            busStopNum: "",
            toggle: false,
            bs:[],
            busArrivalChoice: 0,
            coords:[],
            maxState: 0,
            modalVisible: false
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
        this.changeBusArrival = this.changeBusArrival.bind(this);
        this.navBack = this.navBack.bind(this);
        this.navForward = this.navForward.bind(this);
        this.increaseMaxState = this.increaseMaxState.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
     }

/*SIMPLE FUNCTIONS*/
    
    
componentWillMount() {
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

    
componentWillUpdate(nextProps, nextState){
    if(this.state.busArrivalChoice != nextState.busArrivalChoice){
       this.getAllShopDirections(nextState.busArrivalChoice);
    }
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
    this.setState({
        positionBump: event.endCoordinates.height
    });
}

keyboardWillHide = (event) => {
    this.setState({positionBump: 0});
}
 
selectedBus(busIndex){
    this.setState({
        selectedBus: this.state.translinkData[busIndex]
    });
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

changeBusArrival(choice){
    this.setState({
        busArrivalChoice: choice
    });
}

increaseMaxState(maxState){
    this.state.maxState = maxState;
}

navBack(){
    if (this.state.modalState == 0){
    } else {
        this.changeModalState(this.state.modalState -1);
    }
}

navForward(){
    if (this.state.modalState == 4){
    } else if (this.state.maxState > this.state.modalState) {
        this.changeModalState(this.state.modalState +1);
    }
}

 setModalVisible(visible) {
    this.setState({modalVisible: visible});
     console.log("click modal");
  }

/*API CALLS*/

//sets the coords for the polyline
selectedShop(data){
    
    //console.log("data", this.state.shopWithStatus[data], this.state.busStopCoords);
    var shop = this.state.shopWithStatus[data];

    fetch("https://maps.googleapis.com/maps/api/directions/json?origin="+this.state.userLocation.lat+","+this.state.userLocation.lng+"&destination="+this.state.busStopCoords.lat+","+this.state.busStopCoords.lng+"&waypoints="+shop.coords.lat+","+shop.coords.lng+"&mode=walking&key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI").then((resp)=>{
                return resp.json();
            }).then((json)=>{
                //console.log("OVER HERE!", json);
                this.setState({coords: json.routes[0].overview_polyline.points})
            })
   
}    
    
    
//get all bus stops
tsAllStops(userLocation){
    fetch('https://kafo-all-stops.herokuapp.com/translink/latlng/'+this.state.userLocation.lat.toFixed(3)+'/'+this.state.userLocation.lng.toFixed(2), {
        method: 'GET',
        headers:{
            "Content-Type": "application/json"
        }})
    .then(response=>response.json())
    .then((response) => {
        this.setState({
            bs:response
        });
    })
    .catch((error) => {
        //console.log(error);
    });
}

//get transit information 
tsRouteCall(stopNum) {
    fetch('https://kafo-call.herokuapp.com/translink/' + stopNum , {method:'GET', headers:{
          "Content-Type": "application/json"
          }})
    .then(response => response.json())
    .then((responseJson) => {
        console.log(responseJson);
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
            for (var i=0; i < responseJson.length ; i++){ //splice out negative bus arrival times 
                var currentRoute = responseJson[i].Schedules;
                for(var j = 0; j < currentRoute.length; j++){
                          if(currentRoute[j].ExpectedCountdown < 0){
                              currentRoute.splice(j, 1);
                              j--;
                          }
                      }
            }
            this.setState({translinkData:responseJson}); 
            this.setState({modalState: 1});
            () => {this.increaseMaxState(1)};
        }
    },
        (reason) => { //this happens if we can't communicate to translink 
        //console.log(reason);
    })
    
    
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
       // console.log(error);
    });
}

getCoffeeShops(){
    var debugging = false; //Set this to true to put fake shop data in for debugging porpoises
    var debugShops =[
      {
         "geometry" : {
            "location" : {
               "lat" : 49.2356307,
               "lng" : -123.1855271
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 49.2369876802915,
                  "lng" : -123.1840735197085
               },
               "southwest" : {
                  "lat" : 49.2342897197085,
                  "lng" : -123.1867714802915
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
         "id" : "dbfed865a8c8ad4d2240699b894df42129e6b244",
         "name" : "The Q Coffee",
         "opening_hours" : {
            "open_now" : false,
            "weekday_text" : []
         },
         "photos" : [
            {
               "height" : 612,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/105384840234948122622/photos\"\u003eThe Q Coffee\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAAAPJVyc2FeW6P3QK-AEXHNegl16TX5zgMyPQajP-Ju4sQiRYmUHgSvKh2sMSenXFKppdgh2ORV2_q8mfJYCfpqkt9BeivmyVwH4MxFHaMyuUXPP5XrUiLbpgZ_bPXkyvKEhAere1Qyp5Ta7hx4APsbBXmGhSPrSQ_1lxHUig2dNMUZpAqsGvwmA",
               "width" : 612
            }
         ],
         "place_id" : "ChIJZXbyw0FzhlQRNH_XBTsAAtY",
         "rating" : 3.7,
         "reference" : "CmRSAAAAldt-FzcV3kyblcShGWotzO-COlUqdm-JEGpxwtsIm33vq3zWJx-9OvkF3wHYhLoca7CEwSR1ZmtlVJAtGF0Mfte4O-47NQhALHr_dRQ0ulrz1zsayy0C8_ubO2CntBz0EhAjt5X0FvUSn_pcSLVJAOw_GhRZfR4jUoClcUVTIjKhdGga2KIvOw",
         "scope" : "GOOGLE",
         "types" : [
            "bakery",
            "cafe",
            "restaurant",
            "food",
            "store",
            "point_of_interest",
            "establishment"
         ],
         "vicinity" : "5607 Dunbar Street, Vancouver"
      },
      {
         "geometry" : {
            "location" : {
               "lat" : 49.2346202,
               "lng" : -123.1822015
            },
            "viewport" : {
               "northeast" : {
                  "lat" : 49.2360409302915,
                  "lng" : -123.1808526197085
               },
               "southwest" : {
                  "lat" : 49.2333429697085,
                  "lng" : -123.1835505802915
               }
            }
         },
         "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
         "id" : "5e778d1d99264323903aad02fc30f04d61070aed",
         "name" : "Crepe & Cafe",
         "opening_hours" : {
            "open_now" : false,
            "weekday_text" : []
         },
         "photos" : [
            {
               "height" : 1152,
               "html_attributions" : [
                  "\u003ca href=\"https://maps.google.com/maps/contrib/109784026534613288658/photos\"\u003eGoogle Guide\u003c/a\u003e"
               ],
               "photo_reference" : "CmRaAAAALDeAmDidqDNXuMSROvGMlGPkRuWZmwlv8XnVGPth-kA8QBDV1bcju99fV-seSgwZWbmVu-MN_j408EBEb3Yf_SndxkvgiL1g2uixqQD492lASKTODM5TcfZbGTUdmo7_EhBRZTigOJcLf70SaQPA43JCGhQy0f39X24oMuYwRKLHDV4OJ7dJAw",
               "width" : 2048
            }
         ],
         "place_id" : "ChIJMVvu_mlzhlQRrQ0J-GSY6aw",
         "rating" : 3.1,
         "reference" : "CmRSAAAAZl4YdHjEbr-GIB2fX7nJo4Q2YtQWF6Rp9IoDgGbGTQnYj37LYPQkdsQW_M-rdbf2DnXR_PgSbpL14NjEu4IupTxobF925aCP_GrfALG3YulEfne97cHjnxFJPhYovTbIEhAZlXWkJ6S-daWxjwVJmyZTGhRCeRRhAXsOoRTJIh572pp4qWR4Hw",
         "scope" : "GOOGLE",
         "types" : [ "restaurant", "cafe", "food", "point_of_interest", "establishment" ],
         "vicinity" : "3500 West 41st Avenue, Vancouver"
      }
   ];
    if(debugging){
        this.setState({
                coffeeShopData: debugShops
            }, 
                () => {this.getAllShopDirections(0)}  
                 
            );
    }
    else {
        fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI&location="+this.state.userLocation.lat+","+this.state.userLocation.lng+"&type=cafe&radius=500").then((CSresp)=>{
            console.log("getting coffee shops..")
            return CSresp.json();
        }, (reason)=>{
            console.log("Get coffee shops fetch failed");
           // console.log(reason);
        }
        ).then((CSjson)=>{
            console.log("got the shops");
            //console.log(CSjson.results);
            this.setState({
                coffeeShopData:CSjson.results
            }, 
                () => {this.getAllShopDirections(0)} //run get walking directions to each shop 
            ); 
        });
    }
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
getAllShopDirections(busChoice){
    if(this.state.coffeeShopData){
        var promisedDirectionsArr = this.state.coffeeShopData.map(function getDirections(currentShopObj, index, array) {
            var shopCoords = this.getShopCoords(currentShopObj);
            var busStopCoords = this.state.busStopCoords;
            var shopDirections = this.shopDirections(shopCoords, busStopCoords);
            
            return shopDirections; //return array of promises 
        },this);

        var promisedDirection = Promise.all(promisedDirectionsArr);
        promisedDirection.then((Directions)=>{ 
             var Statuses = Directions.map(function getStatuses(currentValue, index, array){
                 
                 var walkingtimeValue = currentValue.routes[0].legs[0].duration.value + currentValue.routes[0].legs[1].duration.value;
            
                 var shopStatus = this.checkShopStatus(walkingtimeValue/60, this.state.selectedBus.Schedules[busChoice].ExpectedCountdown);
                 
                 var polyline= currentValue.routes[0].legs[0].steps[0].polyline.points;       
                 
                 var shopWithStatus = {
                        name:this.state.coffeeShopData[index].name,
                        status:shopStatus,
                        nextBus: this.state.selectedBus.Schedules[busChoice].ExpectedCountdown,
                        journeyTime:Number((walkingtimeValue/60).toFixed()),
                        orderTime:this.state.selectedBus.Schedules[busChoice].ExpectedCountdown - (walkingtimeValue/60) ,
                        coords: this.state.coffeeShopData[index].geometry.location,
                        polyline: polyline,
                        
                   }

                 return shopWithStatus;
                 
             }, this);
             
             this.setState({
                 shopWithStatus: Statuses
             });
            
        });
    }
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
                        selectedBusState = {this.state.selectedBus}
                        changeBusArrival = {this.changeBusArrival}
                        busArrivalChoice ={this.state.busArrivalChoice}
                        increaseMaxState = {this.increaseMaxState}
                        >
                        </KafoModal>
                );

    return (
            <View style={{flexDirection: 'column'}}>

                <View style={{flexDirection: 'column', alignItems: 'center'}}> 
        
                        <View style={{height: Dimensions.get('window').height * .1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor:'rgba(255, 255, 255, 0.7)', width: '100%', paddingTop: 30, paddingBottom: 5, paddingLeft: 10, paddingRight: 10}}>
                            <TouchableOpacity onPress={() => {this.setModalVisible(true)}}>
                                <Image 
                                    source={require('./img/top-icons-01.png')} 
                                    style={{width: 15, height: 15}}
                                />
                            </TouchableOpacity>

                            <Text style={{textAlign:'center', color: '#42565E', fontWeight: 'bold', fontSize: 15}}> kafo </Text>

                            <Image 
                                source={require('./img/top-icons-02.png')} 
                                style={{width: 15, height: 15}}
                            />
    
                    </View>

                  <View>
                    <Modal
                      animationType="slide"
                      transparent={false}
                      visible={this.state.modalVisible}
                      onRequestClose={() => {alert("Modal has been closed.")}}
                      >
                     <View style={{marginTop: 22}}>
                      <View>
                        <Text>Hello World!</Text>

                        <TouchableHighlight onPress={() => {
                          this.setModalVisible(!this.state.modalVisible)
                        }}>
                          <Text>Hide Modal</Text>
                        </TouchableHighlight>

                      </View>
                     </View>
                    </Modal>
                  </View>


                    <KafoMapCombined
                        changeModalState = {this.changeModalState}
                        modalState = {this.state.modalState}
                        getBusStopCoords = {this.tsStopCall}
                        coffeeShopData = {this.state.coffeeShopData} 
                        userLat = {this.state.userLocation.lat}
                        userLng = {this.state.userLocation.lng}
                        busStopCoords = {this.state.busStopCoords} 
                        coords = {this.state.coords}
                        shopWithStatus = {this.state.shopWithStatus}
                        bs = {this.state.bs}
                        tsAllStops = {this.tsAllStops}
                        allBusStops = {this.state.allBusStops}
                        />
                </View>

                <View style={[styles.modalStyle, {bottom: Dimensions.get('window').height * .4 + this.state.positionBump}]}>
                    <View style={{flex:7}}>
                        {modal} 
                    </View>
                    <View style={{backgroundColor:'#42565E', flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}> 
                        
                        <TouchableOpacity onPress={()=> {this.navBack()}}>
                            <Image 
                                source={require('./img/arrow-02.png')} 
                                style={{width: 40, height: 40, alignSelf: 'flex-end'}}
                            />
                        </TouchableOpacity>

                        <Text style={this.state.modalState == 0 ? styles.dotStyleBig : 0 <= this.state.maxState ? styles.dotStyleSmall : styles.dotStyleGrey}>&bull;</Text>
                        <Text style={this.state.modalState == 1 ? styles.dotStyleBig : 1 <= this.state.maxState ? styles.dotStyleSmall : styles.dotStyleGrey}>&bull;</Text>
                        <Text style={this.state.modalState == 2 ? styles.dotStyleBig : 2 <= this.state.maxState ? styles.dotStyleSmall : styles.dotStyleGrey}>&bull;</Text>
                        <Text style={this.state.modalState == 3 ? styles.dotStyleBig : 3 <= this.state.maxState ? styles.dotStyleSmall : styles.dotStyleGrey}>&bull;</Text>
                        <Text style={this.state.modalState == 4 ? styles.dotStyleBig : 4 <= this.state.maxState ? styles.dotStyleSmall : styles.dotStyleGrey}>&bull;</Text>

                        <TouchableOpacity onPress={()=> this.navForward()}>
                            <Image 
                                source={require('./img/arrow-01.png')} 
                                style={{width: 40, height: 40, alignSelf: 'flex-end'}}
                            />
                        </TouchableOpacity>

                    </View>  
                </View>
        
            </View>

            );
      } 
  }
}

const styles = StyleSheet.create({

    modalStyle: { 
        width: '100%',
        backgroundColor:'rgba(255, 255, 255, 0.9)',
        height: Dimensions.get('window').height * .4
      },
    
    dotStyleBig: {
        color: 'white',
        fontSize: 50,
    },
    
     dotStyleSmall: {
        color: 'white',
        fontSize: 30,
    },
    
    dotStyleGrey:{
        color: 'grey',
        fontSize: 30
    }
    
});