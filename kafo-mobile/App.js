import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Keyboard, Text, View, ScrollView, Button } from 'react-native';
import KafoIcon from './kafo-icon';
import KafoHeader from './kafo-header';
import KafoTextInput from './kafo-textinput';
import KafoSelectBus from './kafo-selectbus';
import KafoMapCombined from './map/kafomap-combined';
//import KafoButton2 from './kafo-button2';
import ArrivalPage from './kafo-arrival';    
import KafoModal from './kafo-modal';

export default class App extends React.Component {

//setting the "appState" to be zero as a baseline. the "appState" changes when we want other elements, like buttons or maps to appear. 
     constructor(props) {
        super(props);
        this.state = {
            appState: 0,
            translinkData: "",
            coffeeShopData: "",
            userLat:"",
            userLong:""
        };
         
//        this.changeAppPage = this.changeAppPage.bind(this);
            this.translink = this.translink.bind(this);
         this.coffeeShopFetch = this.coffeeShopFetch.bind(this);
         this.getUserLat = this.getUserLat.bind(this);
         this.getUserLong = this.getUserLong.bind(this);
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
        console.log(responseJson);
        this.setState({translinkData:responseJson});     //set the state to be the response object from the translink api 
        
    })
    .catch((error) => {
        console.log(error);
    });
}
//this function takes an index parameter and saves the corresponding bus route to STATE as "selectedBus" 
    
    selectRoute(i){
        this.setState({
            selectedBus: this.state.translinkData[i]
        });
    }
    
//get  coffee shops within a 500m radius
    coffeeShopFetch(){
                     fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDHgRDyFKTu99g1EhxfiOTcT9LxRD11QxI&location="+position.coords.latitude+","+position.coords.longitude+"&type=cafe&radius=500").then((resp)=>{
                    console.log("resp");
                    return resp.json();
                    }).then((json)=>{
                    this.setState({
                        coffeeShopData:json
                    });
                         console.log(this.state.coffeeShopData);
            });
    }
    
  render() {

//add a selectedbusIndex prop so we have the index of which button they clicked on 
//add a selectRouteProp so we can call have the selectRoute function from the button component 
//if the state exists, map the object (in the state) to create the buttons 
      
    if (true){
        var modal = null;
              modal = (
                <View style={{ justifyContent: 'space-around', alignItems:'center',}}>  
                    <View style={styles.modalStyle}>
                        <KafoModal
                            tdata ={this.state.translinkData}
    //                        changePage={(pagenum) => this.changeAppPage(pagenum)}
                            translinkAPICall ={this.translink}
                            coffeeShopCall = {this.coffeeShopFetch}
                        />    
                    </View>
                </View>
          
            );

            return (
                <View style={{flex:1}}>
                    <KafoMapCombined />
                    <View style={styles.container}>
                        {modal}
                    </View>
                </View>
            );
      } 
  }
}

const styles = StyleSheet.create({

    modalStyle: {
        position: 'absolute',
        borderRadius: 15,
        bottom: 50,
        width: '90%',
        backgroundColor:'rgba(255, 255, 255, 1.0)',
        height: 220
      },
    
  container: {
        flex: 1,
        flexDirection: 'column',
  }
});


