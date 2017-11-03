
import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Keyboard, Text, View, ScrollView, Button } from 'react-native';
import KafoIcon from './kafo-icon';
import KafoHeader from './kafo-header';
import KafoTextInput from './kafo-textinput';
import KafoSelectBus from './kafo-selectbus';
//import KafoMap from './kafo-map';
import KafoMap from './map/kafomap';
import KafoMapCombined from './map/kafomap-combined';
import KafoButton2 from './kafo-button2';
import ArrivalPage from './kafo-arrival';

//this is placeholder data that is similar to what will get returned from nicolas data 
//  var translinkResponse = [{
//        RouteNo: "025", 
//        RouteName: "BRENTWOOD STN/UBC",
//        Direction: "WEST", 
//        RouteMap: {
//            href:"http://nb.translink.ca/geodata/025.kmz"
//        }, 
//        Schedules: [
//            {Pattern: "WB1B5", Destination: "UBC", ExpectedLeaveTime: "2:16pm", ExpectedCountdown: 9, ScheduleStatus: " ",  AddedStop:false, AddedTrip:false, CancelledStop:false, CancelledTrip:false, LastUpdate:"01:11:07 pm"}
//        ]
//    }, {
//        RouteNo: "015", 
//        RouteName: "Cambie",
//        Direction: "North", 
//        RouteMap: {
//            href:"http://nb.translink.ca/geodata/025.kmz"
//        }, 
//        Schedules: [
//            {Pattern: "WB1B5", Destination: "UBC", ExpectedLeaveTime: "2:16pm", ExpectedCountdown: 9, ScheduleStatus: " ",  AddedStop:false, AddedTrip:false, CancelledStop:false, CancelledTrip:false, LastUpdate:"01:11:07 pm"}
//        ]
//    }, {
//        RouteNo: "99", 
//        RouteName: "UBC",
//        Direction: "WEST", 
//        RouteMap: {
//        href:"http://nb.translink.ca/geodata/025.kmz"
//        }, 
//        Schedules: [
//        {Pattern: "WB1B5", Destination: "UBC", ExpectedLeaveTime: "2:16pm", ExpectedCountdown: 9, ScheduleStatus: " ",  AddedStop:false, AddedTrip:false, CancelledStop:false, CancelledTrip:false, LastUpdate:"01:11:07 pm"}
//        ]
//    }];


    

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
    
//fetch translink API
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
//use STATE for changing how app looks 
    selectRoute(i){
        this.setState({
            selectedBus: this.state.translinkData[i]
        });
    }
    
  render() {

//usually, information flows from the app.js down to the components through use of "props". 
//when we want to bring information back up from a component to the app, we use a callback function. 
//we want to call back up button2 to use but with certain properties defined here (eg. current route name, etc)
//we're making a variable called busResponses and 'mapping' (looping through) the info from translinkResponse above and creating buttons with the right properties for each one 
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
                    <KafoIcon  />
                    <KafoHeader headerText="Which stop are you at?" />
                    <KafoTextInput translinkAPICall={this.translink} changePage={(pagenum) => this.changeAppPage(pagenum)} />
                    
          
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

{
//this is shorthand for an if statement in react. if true, if app state is one (aka if we've changed it to 1 from the text input component) then the select bus header appears. else nothing happens. 
//same for the next lines. if appstate is one, show the bus responses variable.  
}
                
                {head}
                {comp}


                </View>
            );

          
      } else {
           return (
              <View>
               </View>
            );
      }

    /*if(true){
        return(
            <View style={styles.container} >
                <KafoMap changePage={(pagenum) => this.changeAppPage(pagenum)} />
                {(this.state.appState == 2) ? <KafoMap /> :[]}
            </View>
        );
    } else {
        return(
            <View>
            </View>
        );
                
    }*/


  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});


