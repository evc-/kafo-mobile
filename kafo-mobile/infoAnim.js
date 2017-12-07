import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native';
import Animation from 'lottie-react-native';

//import anim from './img/infoAnimation.json';

export default class InfoAnim extends Component {
    
  componentDidMount() {
    setTimeout(()=>{
        this.animation.play()
    }, 500);
  }

  render() {
    return (
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
            flex: 1,
            width: 400,
            height: 250,
            alignItems: 'center',
            position:"absolute",
            }}
            source={require('./assets/infoAnimation.json')}
          />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  }
});
