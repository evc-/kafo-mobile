import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default class ArrivalPage extends React.Component {

    
render() {
    return (
    <View>
            <Text 
                style={styles.Style1} >
                Placeholder Map
            </Text>
       
            <Text 
                style={styles.touchableStyle1}>
                  Current Time     7:34 AM
            </Text>
       
            <Text  
                style={styles.touchableStyle2}>
                   Untill Bus Arrives    6:59
            </Text>
        
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
     
    Style1: {
        width: 450,
        height: 520,
        backgroundColor: '#F4EEE3',
        fontSize: 40,
        flex: 0,
        textAlign: 'center',
        lineHeight: 330,
        color: 'white',
        fontWeight: 'bold',
    },
    
    
    touchableStyle1: {
        width: 450,
        height: 80,
        backgroundColor: '#6FA7A8',
        fontSize: 24,
        flex: 0,
        textAlign: 'center',
        lineHeight: 75,
        color: '#F4EEE3',
        fontWeight: 'bold',
    },
    touchableStyle2: {
        width: 450,
        height: 100,
        backgroundColor: '#81C783',
        fontSize: 24,
        flex: 0,
        textAlign: 'center',
        lineHeight: 75,
        color: '#F4EEE3',
        fontWeight: 'bold',
    }
});