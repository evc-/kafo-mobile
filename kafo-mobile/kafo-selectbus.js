import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class KafoSelectBus extends Component {
  render() {
    return (        
            <View style={styles.containerStyle}> 
                <Text style={styles.textStyle}> Select Bus</Text>
            </View>
    );
  }
} 

const styles = StyleSheet.create({
    textStyle: {
        padding: 35,
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
        
  },
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#F4EFE3'
    },
});

