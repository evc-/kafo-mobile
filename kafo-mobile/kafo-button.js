import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity } from 'react-native';

export default class KafoButton extends React.Component {
    
    constructor(props) {
    super(props);    
        
            this.selectRoute = this.selectRoute.bind(this);
  } 
    //set selectRouteProp to be the selectedBusIndex 
    //selectRouteProp is the selectRoute function with the parameter of the index 
    selectRoute(){   
            this.props.selectedBus(this.props.busIndex);
            this.props.getCoffeeShops();
            this.props.changeModal(2);
        }

  render() {
      
      if (this.props.buttonColor){
           var style = styles.touchableStyle1;
      } else {
          var style = styles.touchableStyle2;
      }
      
    return (
        
      <View>
        <TouchableOpacity style={style}>
        <Image 
            source={require('./img/front-bus-icon.png')} 
            style={{width: 10, height: 10}}
        />
        <Text onPress={() => this.selectRoute()}>
        
                <Text style={{fontSize: 60, color: '#42565E', textAlign: 'left', fontWeight: 'bold'}}>{this.props.routeNumber}{"\n"}</Text>
                <Text style={{fontSize: 20, color: '#42565E', textAlign: 'left', fontWeight: 'bold'}}>{this.props.routeName}</Text>
                <Text style={{fontSize: 15, color: '#42565E', textAlign: 'right'}}>{this.props.minsTillDepart}</Text>
        </Text>
        </TouchableOpacity> 
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
    
     touchableStyle1: {
        
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%',
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        borderLeftColor: '#42565E',
        borderLeftWidth: 30,
         borderBottomWidth: 3, 
         borderBottomColor: '#acacac',
         paddingLeft: 35
    },
    
    touchableStyle2: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%',
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        borderLeftColor: '#42565E',
        borderLeftWidth: 30,
        borderBottomWidth: 3, 
        borderBottomColor: '#acacac',
        paddingLeft: 35
    }
    
});
        


