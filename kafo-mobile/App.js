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
            userLat:"",
            userLong:"",
            positionBump: 0,
            stopCoords: '',
            busStopNum: ""
        };

        this.tsRouteCall = this.tsRouteCall.bind(this);
        this.getUserLat = this.getUserLat.bind(this);
        this.getUserLong = this.getUserLong.bind(this);
        this.tsStopCall = this.tsStopCall.bind(this);
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

tsStopCall(stopNum){
        fetch('https://kafo-stop-call.herokuapp.com/translink/' + stopNum , {method:'GET', headers:{
          "Content-Type": "application/json"
          }})
    .then(response => response.json())
    .then((stopRespJson) => {
        this.setState({
            stopCoords:{
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
                    />    
                );

            return (
                <KeyboardAvoidingView  style={styles.container}           
                    behaviour="padding">
                    
                    <KafoMapCombined
                        modalState = {this.state.modalState}
                        getBusStopCoords = {this.tsStopCall}
                        sendCSData = {this.coffeeShopFetch} getUserLong={this.checkLat} getUserLat = {this.checkLong} 
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


