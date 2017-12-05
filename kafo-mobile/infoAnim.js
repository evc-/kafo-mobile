import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Animation from 'lottie-react-native';

//import anim from './img/infoAnimation.json';

export default class InfoAnim extends Component {
  componentDidMount() {
    setTimeout(()=>{
        this.animation.play()
    }, 1000);
  }

  render() {
    return (
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 300,
              height: 200,
                position:"absolute",
                top:8
            }}
            source={require('./img/infoAnimation.json')}
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
