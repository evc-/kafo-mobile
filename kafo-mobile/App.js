import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Keyboard, Text, View, ScrollView } from 'react-native';
import KafoIcon from './kafo-icon';
import KafoHeader from './kafo-header';
import KafoTextInput from './kafo-textinput';
import KafoSelectBus from './kafo-selectbus';
import KafoMap from './kafo-map';
import KafoResults from './kafo-results';
import KafoButton2 from './kafo-button2';

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
    
    
     constructor(props) {
        super(props);
        this.state = {appState: 0}; 
     }
    
 
    changeAppPage(pagenum){
        this.setState({appState: pagenum});
        Keyboard.dismiss();
    }
 
    
    
  render() {
      
        var busResponses = translinkResponse.map(function callback(currentValue, index, array) {
            return(
                <KafoButton2 key={index+"buttons"} routeName={currentValue.RouteName} routeNumber={currentValue.RouteNo} minsTillDepart={currentValue.Schedules.ExpectedCountdown} buttonColor ={(index % 2 == 1)} />
            );
        })
            
      
      if (true){
            return (
                <View style={styles.container}>
                    <KafoIcon  />
                    <KafoHeader headerText="Which stop are you at?" />
                    <KafoTextInput changePage={(pagenum) => this.changeAppPage(pagenum)} />
                    {(this.state.appState == 1) ? <KafoSelectBus /> :[]}
                    {(this.state.appState == 1) ? 
                        <ScrollView>
                        {busResponses}
                        </ScrollView>
                        :[]
                    }
                    <KafoMap changePage={(pagenum) => this.changeAppPage(pagenum)} />
                    {(this.state.appState == 2) ? <KafoMap /> :[]}
                
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


