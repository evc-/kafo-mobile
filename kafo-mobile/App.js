import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Keyboard, Text, View, ScrollView, Button } from 'react-native';
import KafoTextInput from './kafo-textinput';
import KafoMapCombined from './map/kafomap-combined';   
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
     console.log(this.state.userLat);
 }
getUserLong(data){
    this.setState({
        userLong:data
    });
    console.log(this.state.userLong);
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
    coffeeShopFetch(data){
        console.log(data);
    }
    
  render() {

//add a selectedbusIndex prop so we have the index of which button they clicked on 
//add a selectRouteProp so we can call have the selectRoute function from the button component 
//if the state exists, map the object (in the state) to create the buttons 
      
      

    if (true){
        var modal = null;
              modal = (
                  <View style={{alignItems:'center'}}>  
                    <KafoModal
                        tdata ={this.state.translinkData}
//                        changePage={(pagenum) => this.changeAppPage(pagenum)}
                        translinkAPICall ={this.translink}
                    >    
                        {this.props.children}
                    </KafoModal>
                </View>
          
            );

            return (
                <View style={styles.container}>
                       
                    <KafoMapCombined sendCSData = {this.coffeeShopFetch} getUserLong={this.checkLat} getUserLat = {this.checkLong} />
                    {modal}

                </View>
            );
      } 
  }
}

const styles = StyleSheet.create({
    
  container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
  }
});


