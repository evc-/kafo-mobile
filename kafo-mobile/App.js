import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native';
import KafoIcon from './kafo-icon';
import KafoHeader from './kafo-header';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <KafoIcon />
        <KafoHeader />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


