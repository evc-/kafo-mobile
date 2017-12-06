import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {DangerZone} from 'expo';
import Animation from 'lottie-react-native';

export default class Lottieloader extends Component {
  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 700,
              height: 400
            }}
            loop={true}
            source={require('./assets/kafo2.json')}
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
    backgroundColor: '#fff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  }
});
