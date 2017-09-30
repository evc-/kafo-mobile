import React, { Component } from 'react';
import { Image, View } from 'react-native';


export default class KafoIcon extends Component {
  render() {
    return (
      <View>
        <Image
            style={{width: 100, height: 100}}
          source={require('./img/kafo-icon.png')}
        />
        
      </View>
    );
  }
}