import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    Button
} from 'react-native';
import KafoMapDisplay from '../kafo-map_display.js';
import KafoResults from '../kafo-results';


export default class KafoMap extends Component {
    constructor(props){
        super(props);
        
        this.state={
            lng:0,
            lat:0
        }
        
        this.myfunc=this.myfunc.bind(this);
        var self=this;
         
        navigator.geolocation.watchPosition(
          function(data){
            console.log(data);
              self.setState({
                  lng:data.coords.longitude,
                  lat:data.coords.latitude
              })
              
          },
            function(err){
                console.log(err);
                
            },
             {enableHighAccuracy: false, timeout: 1000, maximumAge: 0}
      )
         
    }
    
    myfunc(){
        
    }
    
    
    
  render() {
      
    return (
      <View style={styles.container}>
        <KafoMapDisplay
        style= {styles.mapDisplay}
        mapPage = {this.props.changePage}
        latt={this.state.lat}
        longg = {this.state.lng}
        />
        <KafoResults/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    
    mapDisplay:{
        flex: 1,
        width: 100,
        height:100
    }
  
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});