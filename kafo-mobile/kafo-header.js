import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

export default class KafoHeader extends React.Component {
    constructor(props){
        super(props);
        this.state={
            
        }    
        
    }
  

render() {
 
    return (
        <View>
            <Text style={styles.headerStyle} numberOfLines={1} ellipsizeMode={'tail'}>{this.props.innerText}</Text>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    
    headerStyle:{
        width: '100%',
        fontSize: 20,
        fontWeight: '500',
        padding: 10,
        textAlign: 'center',
        color: '#f4efe3',
        backgroundColor:'#6fa7a8'
      },
    
    
});