import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';


export default class KafoIcon extends Component {
  render() {
    return (
      <View>
        <Image
            style={styles.iconStyle}
          source={require('./img/kafo-icon.png')}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    
    iconStyle:{
        width: 100, 
        left: 150,
        height: 100, 
        alignItems: 'center',
        marginTop: 20
          
    }
    
});