import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default class ArrivalPage extends React.Component {

    
render() {
    return (
   <View style={{flex:1, bottom:0, position:"absolute"}}>
            <Text 
                style={styles3.touchableStyle1}>
                  Current Time     7:34 AM
            </Text>
       
            <Text  
                style={styles3.touchableStyle2}>
                   *COUNTDOWN*  6:59
            </Text>
        
      </View>
    ); 
  }
}

const styles3 = StyleSheet.create({
   
    
    touchableStyle1: {
        width: 450,
        height: 80,
        backgroundColor: '#6FA7A8',
        fontSize: 24,
        lineHeight: 70,
        textAlign: 'center',
        color: '#F4EEE3',
        fontWeight: 'bold',
    },
    touchableStyle2: {
        width: 450,
        height: 80,
        lineHeight: 70,
        backgroundColor: '#81C783',
        fontSize: 24,
        textAlign: 'center',
        color: '#F4EEE3',
        fontWeight: 'bold',
    }
});