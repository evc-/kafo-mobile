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
            this.props.changeModal(2);
            this.props.selectRouteProp(this.props.selectedBusIndex);
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
                onPress={() => this.selectRoute()}
            >       {this.props.routeNumber}{" "}
                    {this.props.routeName}
                
            </Text>
        </TouchableOpacity> 
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
     touchableStyle1: {
        width: 400,
        height: 80,
        backgroundColor: '#303C45',
        fontSize: 14,
        flex: 0,
        textAlign: 'center',
        lineHeight: 100,
        color: '#F4EEE3',
        fontWeight: 'bold',
    },
    
    touchableStyle2: {
        width: 400,
        height: 0,
        backgroundColor: '#6FA7A8',
        fontSize: 14,
        flex: 0,
        textAlign: 'center',
        lineHeight: 100,
        color: '#F4EEE3',
        fontWeight: 'bold',
    }
});
        

