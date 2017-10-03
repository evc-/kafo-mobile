import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class KafoSelectBus extends Component {
  render() {
    return (        
        <View style={{flexDirection: 'row', height: 50, padding: 0}}>
            <View style={styles.containerStyle}> 
                <Text style={styles.textStyle}> Select Bus</Text>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    textStyle: {
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

