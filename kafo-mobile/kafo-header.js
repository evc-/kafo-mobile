import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class KafoHeader extends Component {
  render() {
    return (        
        <View style={styles.headerStyle}>
            <View style={styles.containerStyle}> 
                <Text style={styles.textStyle}>{this.props.headerText}</Text>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    
    
    headerStyle: {
        flexDirection: 'row',
        width: 400,
        height: 100, 
        justifyContent: 'center',
        padding: 0
        
        
    },
    
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

