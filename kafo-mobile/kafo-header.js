import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class KafoHeader extends Component {
  render() {
    return (        
        <View style={{flexDirection: 'row', height: 100, padding: 0}}>
            <View style={styles.containerStyle}> 
                <Text style={styles.textStyle}>Which bus are you taking?</Text>
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
        
        backgroundColor:'#CAAB9A'
    },
});

