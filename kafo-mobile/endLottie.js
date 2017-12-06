import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Animation from 'lottie-react-native';
//import anim from './assets/data.json';

export default class endLottie extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
                alignItems: 'center', 
                justifyContent: 'center',
                width: 300,
                height: 200
            }}
            loop={true}
            source={require('./assets/goodbyeAnimation.json')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
