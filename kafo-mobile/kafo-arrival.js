import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default class KafoArrival extends React.Component {

    
render() {
    return (
    <View>
            <Text>
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
        flex: 1,
        paddingTop: 50,
        paddingBottom: 50,
        width:'100%',
        fontSize: 40,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#F4EEE3',
    },
    
    
    touchableStyle1: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 50,
        width:'100%',
        backgroundColor:'#6FA7A8',
        fontSize: 14,
        textAlign: 'center',
        color: '#F4EEE3',
        fontWeight: 'bold',
    },
    touchableStyle2: {
        flex: 1,
        paddingTop: 50,
        paddingBottom: 50,
        width:'100%',
        backgroundColor:'#6FA7A8',
        fontSize: 14,
        textAlign: 'center',
        color: '#F4EEE3',
        fontWeight: 'bold',
    }
});