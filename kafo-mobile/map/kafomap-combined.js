import React, { Component } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native';
import CoffeeResultsModal from '../coffeeResultsModal';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
class KafoMapCombined extends Component {
    constructor(props){
        super(props);
        
        this.state={
            error: null,
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

var coffeeResp = null;
 if (this.props.modalState >= 1){
          if (this.props.coffeeShopData){
            coffeeResp = this.props.coffeeShopData.map((currentValue, index, array)=>{
                    return(
                        <MapView.Marker 
                        key={index}
                        id={index}
                        coordinate={{
                            latitude: currentValue.geometry.location.lat,
                            longitude: currentValue.geometry.location.lng}} 
                        title={currentValue.name}
                        image={require('../img/storeLocator.png')}
                        
                    /*if(currentValue.status ==="good"){
                    image={require('../assets/green-shop.png')}
                    } else if ( .status === "maybe"){
                        immage={require('../assets/yellow-shop.png')}
                    }*/
                    />  
                    )                                      
                });
          }
      
 }
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
      
    return (

        <View>
                
         <MapView 
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
         image={require('../img/user.png')}
             
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
