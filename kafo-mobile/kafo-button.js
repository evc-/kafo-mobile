import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native'

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
        <TouchableOpacity>
            <Text 
               style={style}
                onPress={() => this.selectRoute()}>    
                <Text style={{color: "orange", fontSize: 70}}>{this.props.routeNumber}</Text>
                {" "}
                <Text style={{color: "blue"}}>{this.props.routeName}</Text>
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
        width: '80%',
        backgroundColor: '#303C45',
        fontSize: 14,
        textAlign: 'center',
        color: '#F4EEE3',
        fontWeight: 'bold',
        borderRadius:10,
        justifyContent: 'center'
    },
    
    touchableStyle2: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        width: '80%',
        backgroundColor: '#42565E',
        fontSize: 14,
        textAlign: 'center',
        color: '#F4EEE3',
        fontWeight: 'bold',
        borderRadius:10,
        justifyContent: 'center'
    }
    
});
        

