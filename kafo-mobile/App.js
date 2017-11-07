import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Keyboard, Text, View, ScrollView, Button } from 'react-native';
import KafoIcon from './kafo-icon';
import KafoHeader from './kafo-header';
import KafoTextInput from './kafo-textinput';
import KafoSelectBus from './kafo-selectbus';
//import KafoMap from './kafo-map';
//import KafoMap from './map/kafomap';
import KafoMapCombined from './map/kafomap-combined';
import KafoButton2 from './kafo-button2';
import ArrivalPage from './kafo-arrival';    
import KafoModal from './kafo-modal';
import ModalTest from './modal-test';

export default class App extends React.Component {

//setting the "appState" to be zero as a baseline. the "appState" changes when we want other elements, like buttons or maps to appear. 
     constructor(props) {
        super(props);
        this.state = {
            appState: 0,
            translinkData: ""
        };
         
        this.changeAppPage = this.changeAppPage.bind(this);
        this.translink = this.translink.bind(this);
     }
    
    
//defining a function to change the state of the app. 
//we set "this" (app.js) to be pagenum, which is defined as zero up above. 
//then we hide the keyboard 
    changeAppPage(pagenum){
        this.setState({appState: pagenum});
        Keyboard.dismiss();
    }
    
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
    
  render() {

//add a selectedbusIndex prop so we have the index of which button they clicked on 
//add a selectRouteProp so we can call have the selectRoute function from the button component 
//if the state exists, map the object (in the state) to create the buttons 
      
      if (this.state.translinkData){
        var busResponses = this.state.translinkData.map(function callback(currentValue, index, array) {
            return(
                <KafoButton2 
                key={index+"buttons"} 
                routeName={currentValue.RouteName} 
                routeNumber={currentValue.RouteNo} 
                minsTillDepart={currentValue.Schedules.ExpectedCountdown} 
                buttonColor ={(index % 2 == 1)} 
                changePage={(pagenum) => this.changeAppPage(pagenum)}
                selectedBusIndex= {index}
                selectRouteProp={(i) => this.selectRoute(i)}
                />
            );
        }, this);
}
            
//this always runs 
      if (true){
        var head = null;
          if(this.state.appState <= 1){
              head = (
                <View>
                  
                    <KafoMapCombined/>
                    <KafoIcon/>
                    <KafoTextInput translinkAPICall={this.translink} changePage={(pagenum) => this.changeAppPage(pagenum)} />
                    <KafoModal/>
                  

            </View>
            );
          }

        var comp = null;
        switch (this.state.appState){
            case 1:
                comp = (
                    <View>
                    
                    <KafoSelectBus />
                        <ScrollView>
                        {busResponses}
                        </ScrollView>
                    </View>
                )
                break;
                
          case 2:
            comp = (
                <KafoMapCombined changePage={this.changeAppPage}/>
            )
          break;

        }
            return (
                <View style={styles.container}>
                    {head}
                    {comp}
                </View>
            );
      } 
  }
}


const styles = StyleSheet.create({
    
  container: {
        alignItems: 'center',
        flex: 1
  }

});


