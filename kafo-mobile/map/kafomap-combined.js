import React, { Component } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native';
import CoffeeResultsModal from '../coffeeResultsModal';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Polyline from '@mapbox/polyline';

class KafoMapCombined extends Component {
    constructor(props){
        super(props);
        
        this.state={
            error: null,
            coords: [],
            busStopCoords: null
        }
    }

//componentDidMount(){
//    if(true){
//        this.getDirections(this.props.userLat, this.props.userLng,this.props.sendShopIndex.coords.lat,this.props.sendShopIndex.coords.lng)
//        }    
//    }
    
//async sends a request without witing for a reply
async getDirections() {
        try {
            let resp = await fetch("https://maps.googleapis.com/maps/api/directions/json?origin="+this.props.userLat+","+this.props.userLng+"&destination="+this.props.sendShopIndex.coords.lat+","+this.props.sendShopIndex.coords.lng)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }
    

    
busStop(){
    if(this.props.busStopCoords){
        this.setState({
            busLat:this.props.busStopCoords.lat,
            busLng:this.props.busStopCoords.lng
        });
        console.log("kafomapcombined bus stop coordinates are: "+this.state.busLat + this.state.busLng);
    }
}
//async getDirections(startLoc, destinationLoc) {
//        try {
//            let resp = await fetch("https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }")
//            let respJson = await resp.json();
//            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
//            let coords = points.map((point, index) => {
//                return  {
//                    latitude : point[0],
//                    longitude : point[1]
//                }
//            })
//            this.setState({coords: coords})
//            return coords
//        } catch(error) {
//            alert(error)
//            return error
//        }
//    }

    
    
  render(){
var walkingLine = null;
      if(this.props.sendShopIndex){
          walkingLine = (
            <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="blue"
            />
          )
      }
      
      
var busStop = null;
if(this.props.busStopCoords){
    busStop = (
        <MapView.Marker 
                coordinate={{
                     latitude:this.props.busStopCoords.lat,
                    longitude: this.props.busStopCoords.lng}}
                    />  
    )
}
var comp=null;
var coffeeResp = null;
 if (this.props.modalState >= 1){
          if (this.props.coffeeShopData){
            coffeeResp = this.props.coffeeShopData.map((currentValue, index, array)=>{
//                    if(this.props.coffeeShopData[index].currentValue.status === "statusGreen"){
//                    comp=(image={require('../img/Green.png')})
//                    } 
//                    else if(this.props.coffeeShopData[index].currentValue.status === "statusOrange"){
//                       comp=(image={require('../img/Orange.png')})
//                    }
//                    else if(this.props.coffeeShopData[index].currentValue.status === "statusRed"){
//                      comp=(image={require('../img/Red.png')})
//                    }
                return(
                        <MapView.Marker 
                        key={index}
                        id={index}
                        coordinate={{
                            latitude: currentValue.geometry.location.lat,
                            longitude: currentValue.geometry.location.lng}} 
                        title={currentValue.name}
                        image={require('../img/storeLocator.png')}
                    />  
                    
                    )                                      
                });
          }
      


      }
    return (

        <View>
                
         <MapView 
            style={styles.map}
            provider = { PROVIDER_GOOGLE }
            region={{
                latitude: this.props.userLat,
                longitude: this.props.userLng,
                latitudeDelta: 0.008,
                longitudeDelta: 0.0008
            }}
        >
        <MapView.Marker
            coordinate={{
                latitude: this.props.userLat,
                longitude: this.props.userLng,
            }}
         image={require('../img/user02.png')}
             
        />
        {busStop}
        {coffeeResp}
        {walkingLine}
        </MapView>
        </View>  

    );
}
}


const styles = StyleSheet.create({
  map: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      zIndex: -6000
      
  },
    
});

export default KafoMapCombined;
