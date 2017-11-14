import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView,  Text, View, ScrollView, Button } from 'react-native';
import KafoIcon from './kafo-icon';
import KafoHeader from './kafo-header';
import KafoTextInput from './kafo-textinput';
import KafoSelectBus from './kafo-selectbus';
import KafoMapCombined from './map/kafomap-combined';
//import KafoButton2 from './kafo-button2';
import KafoArrival from './kafo-arrival';    
import KafoModal from './kafo-modal';
import KafoResults from './kafo-results';

export default class App extends React.Component {

//setting the "appState" to be zero as a baseline. the "appState" changes when we want other elements, like buttons or maps to appear. 
     constructor(props) {
        super(props);
        this.state = {
            appState: 0,
            translinkData: "",
            coffeeShopData: "",
            userLat:"",
            userLong:"",
            positionBump: 0,
            busStopCoords: ""
        };
         
//      this.changeAppPage = this.changeAppPage.bind(this);
        this.translink = this.translink.bind(this);
        this.coffeeShopFetch = this.coffeeShopFetch.bind(this);
        this.getUserLat = this.getUserLat.bind(this);
        this.getUserLong = this.getUserLong.bind(this);
        this.translinkStopCall = this.translinkStopCall.bind(this);
        this.setBusStopNum = this.setBusStopNum.bind(this);
        this.modalState = this.modalState.bind(this);
     }
    
 getUserLat(data){
     this.setState({
         userLat:data
     });
 }
getUserLong(data){
    this.setState({
        userLong:data
    });
}
componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
    
keyboardWillShow = (event) => {
    this.setState({positionBump: event.endCoordinates.height});
}

keyboardWillHide = (event) => {
    this.setState({positionBump: 0});
}

//we set "this" (app.js) to be pagenum, which is defined as zero up above. 

//    changeAppPage(pagenum){
//        this.setState({appState: pagenum});
//        Keyboard.dismiss();
//    }
 
//translink function now takes stop number(stopNum) as a parameter. replaced dummy stop # with the parameter. 
//passed translink function as prop to text input component below. 

translink(stopNum) {
    fetch('https://kafo-call.herokuapp.com/translink/' + stopNum , {method:'GET', headers:{
          "Content-Type": "application/json"
          }})
    .then(response => response.json())
    .then((responseJson) => {
        //console.log(responseJson);
        this.setState({translinkData:responseJson});     //set the state to be the response object from the translink api 
        
    })
    .catch((error) => {
        console.log(error);
    });
}

translinkStopCall(stopNum){
        fetch('https://kafo-stop-call.herokuapp.com/translink/' + stopNum , {method:'GET', headers:{
          "Content-Type": "application/json"
          }})
    .then(response => response.json())
    .then((stopRespJson) => {
        //console.log(stopRespJson);
        var stopCoords = {
            lat: stopRespJson.Latitude,
            lng: stopRespJson.Longitude,
        };
        this.setState({
            busStopCoords:stopCoords
        }); 
    })
    .catch((error) => {
        console.log(error);
    });
}

//setBusStopNum(busID){
//    this.setState({
//        busStopNum: busID
//    });
//}

//this function takes an index parameter and saves the corresponding bus route to STATE as "selectedBus" 
    
    selectRoute(i){
        this.setState({
            selectedBus: this.state.translinkData[i]
        });
    }
    
//get  coffee shops within a 500m radius
     coffeeShopFetch(data){
        //console.log(data);
    }
modalState(data){
    this.setState({
        modalState:data
    });
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
                        translinkStopCall = {this.translinkStopCall}
    //                  changePage={(pagenum) => this.changeAppPage(pagenum)}
                        translinkAPICall ={this.translink}
//                      setBusStopNum ={this.setBusStopNum}
                        modalState = {this.modalState}
                    />    
                );

            return (
                <KeyboardAvoidingView  style={styles.container}           
                    behaviour="padding">
                    
                    <KafoMapCombined
                        modalState = {this.state.modalState}
                        sendCSData = {this.coffeeShopFetch} 
                        getUserLong ={this.checkLat} 
                        getUserLat = {this.checkLong} 
                        sendStopCoords = {this.state.busStopCoords}
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


