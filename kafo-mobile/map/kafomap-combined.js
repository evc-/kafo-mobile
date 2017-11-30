import React, { Component } from 'react';
import { Dimensions, AppRegistry, StyleSheet, Text, View, Button, Image } from 'react-native';
import CoffeeResultsModal from '../coffeeResultsModal';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';             

class KafoMapCombined extends Component {
    constructor(props){
        super(props);
        
        this.state={
            error: null,
            coords: [],
            busStopCoords: null,
            allBusStops:[]
        }
    }

//componentDidMount(){
//    if(true){
//        this.getDirections(this.props.userLat, this.props.userLng,this.props.sendShopIndex.coords.lat,this.props.sendShopIndex.coords.lng)
//        }    
//    }
    
    
busStop(){
    if(this.props.busStopCoords){
        this.setState({
            busLat:this.props.busStopCoords.lat,
            busLng:this.props.busStopCoords.lng
        });
    }
}
componentDidMount(){
    if(true){
        this.setState({
            bs:this.props.bs
        });
        this.props.tsAllStops();
    }
}


// transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
    decode(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}


  render(){
var walkingLine = null;
      if(this.props.coords){ 
//          console.log(this.decode(this.props.coords))
          walkingLine = (
            <MapView.Polyline 
            coordinates={this.decode(this.props.coords)}
            strokeWidth={5}
            strokeColor="#6fa7a8"
            />
          )
      }
var allStops = null;    
if(this.props.modalState === 0 ){
    console.log(this.props.bs);
    allStops = this.props.bs.map((stop) => {
            return (
                <MapView.Marker
              title={stop.Name}
              id={stop.stopNo}
              coordinate={{
                latitude: stop.Latitude,
                longitude: stop.Longitude,
              }}
            />
                   )
        }) 
      }  else if (this.props.modalState > 0) {
        allStops = null;
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
//console.log(this.props.shopWithStatus);
 if (this.props.modalState >= 1){
          if (this.props.shopWithStatus){
            coffeeResp = this.props.shopWithStatus.map((currentValue, index, array)=>{
                console.log(currentValue);
                var statusimg = null;
                    if(currentValue.status === "statusGreen"){
                        statusimg=require('../img/Green04.png')
                    } 
                    else if(currentValue.status === "statusOrange"){
                        statusimg=require('../img/Orange04.png')
                    }
                    else if(currentValue.status === "statusRed"){
                        statusimg=require('../img/Red04.png')
                    }
                console.log("status", statusimg);
                return(
                        <MapView.Marker 
                        key={index}
                        id={index}
                        coordinate={{
                            latitude: currentValue.coords.lat,
                            longitude: currentValue.coords.lng}} 
                        title={currentValue.name}
                        image={statusimg}
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
        {allStops}
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
