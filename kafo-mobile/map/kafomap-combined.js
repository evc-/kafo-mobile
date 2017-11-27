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
        }
    }

componentDidMount(){
    if(true){
        this.getDirections(this.props.userLat, this.props.userLng,this.props.sendShopIndex.lat,this.props.sendShopIndex.lng)
        }    
    }
    
//async sends a request without witing for a reply    
async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch("https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }")
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

    
    
  render(){
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
      
 
//    var lines ="null";
//    if(this.props.sendShopIndex !== null){ 
//        lines = (     
//            <MapView.Polyline 
//            coordinates={this.state.coords}
//            strokeWidth={2}
//            strokeColor="blue"/>)
//    }
/*var busStop = null;
if(this.state.busStop){
                busStop = (
                    <MapView.Marker
                        coordinate={{
                            latitute: this.state.busStop.lat,
                            longitude: this.state.busStop.lng
                                }}
                        id={"busStop"}
                        />
                )
            console.log(this.state.busStop);
            }
*/
      }
    return (

        <View>
                
         <MapView 
            style={styles.map}
            provider = { PROVIDER_GOOGLE }
            region={{
                latitude: this.props.userLat,
                longitude: this.props.userLng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.0005
            }}
        >
        <MapView.Marker
            coordinate={{
                latitude: this.props.userLat,
                longitude: this.props.userLng,
            }}
         image={require('../img/user02.png')}
             
        />
        {coffeeResp}

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
