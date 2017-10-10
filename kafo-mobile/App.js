import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Keyboard, Text, View, ScrollView } from 'react-native';
import KafoIcon from './kafo-icon';
import KafoHeader from './kafo-header';
import KafoTextInput from './kafo-textinput';
import KafoSelectBus from './kafo-selectbus';
import KafoMap from './kafo-map';
import KafoResults from './kafo-results';
import KafoButton2 from './kafo-button2';

//this is placeholder data that is similar to what will get returned from nicolas data 
  var translinkResponse = [{
        RouteNo: "025", 
        RouteName: "BRENTWOOD STN/UBC",
        Direction: "WEST", 
        RouteMap: {
            href:"http://nb.translink.ca/geodata/025.kmz"
        }, 
        Schedules: [
            {Pattern: "WB1B5", Destination: "UBC", ExpectedLeaveTime: "2:16pm", ExpectedCountdown: 9, ScheduleStatus: " ",  AddedStop:false, AddedTrip:false, CancelledStop:false, CancelledTrip:false, LastUpdate:"01:11:07 pm"}
        ]
    }, {
        RouteNo: "015", 
        RouteName: "Cambie",
        Direction: "North", 
        RouteMap: {
            href:"http://nb.translink.ca/geodata/025.kmz"
        }, 
        Schedules: [
            {Pattern: "WB1B5", Destination: "UBC", ExpectedLeaveTime: "2:16pm", ExpectedCountdown: 9, ScheduleStatus: " ",  AddedStop:false, AddedTrip:false, CancelledStop:false, CancelledTrip:false, LastUpdate:"01:11:07 pm"}
        ]
    }, {
        RouteNo: "99", 
        RouteName: "UBC",
        Direction: "WEST", 
        RouteMap: {
        href:"http://nb.translink.ca/geodata/025.kmz"
        }, 
        Schedules: [
        {Pattern: "WB1B5", Destination: "UBC", ExpectedLeaveTime: "2:16pm", ExpectedCountdown: 9, ScheduleStatus: " ",  AddedStop:false, AddedTrip:false, CancelledStop:false, CancelledTrip:false, LastUpdate:"01:11:07 pm"}
        ]
    }];
    

export default class App extends React.Component {
    
//setting the "appState" to be zero as a baseline. the "appState" changes when we want other elements, like buttons or maps to appear. 
     constructor(props) {
        super(props);
        this.state = {appState: 0}; 
     }
    
//defining a function to change the state of the app. 
//we set "this" (app.js) to be pagenum, which is defined as zero up above. 
//then we hide the keyboard 
    changeAppPage(pagenum){
        this.setState({appState: pagenum});
        Keyboard.dismiss();
    }
 
    
    
  render() {

//usually, information flows from the app.js down to the components through use of "props". 
//when we want to bring information back up from a component to the app, we use a callback function. 
//we're making a variable called busResponses and 'mapping' (looping through) the info from translinkResponse above and creating buttons with the right properties for each one 
        var busResponses = translinkResponse.map(function callback(currentValue, index, array) {
            return(
                <KafoButton2 key={index+"buttons"} routeName={currentValue.RouteName} routeNumber={currentValue.RouteNo} minsTillDepart={currentValue.Schedules.ExpectedCountdown} buttonColor ={(index % 2 == 1)} />
            );
        })
            
//this always runs 
      if (true){
            return (
                <View style={styles.container}>
                    <KafoIcon  />
                    <KafoHeader headerText="Which stop are you at?" />
{
//textinput gets a property of "changePage" of a function to set its pagenum. we give it the pagenum property in the textinput component, it gets read here, and then the function runs to assign it to itself.  
}
                    <KafoTextInput changePage={(pagenum) => this.changeAppPage(pagenum)} />

{
//this is shorthand for an if statement in react. if true, if app state is one (aka if we've changed it to 1 from the text input component) then the select bus header appears. else nothing happens. 
//same for the next lines. if appstate is one, show the bus responses variable.  
}
                    {(this.state.appState == 1) ? <KafoSelectBus /> :[]}
                    {(this.state.appState == 1) ? 
                        <ScrollView>
                        {busResponses}
                        </ScrollView>
                        :[]
                    }
                </View>
            );

          
      } else {
           return (
              <View>
               </View>
            );
      }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});


