import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native';
import KafoIcon from './kafo-icon';
import KafoHeader from './kafo-header';
import KafoTextInput from './kafo-textinput';
import KafoButton from './kafo-button';
import KafoSelectBus from './kafo-selectbus';
import KafoMap from './kafo-map';
import KafoResults from './kafo-results';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <KafoIcon  />
        <KafoHeader headerText="TEST" />
        <KafoTextInput />
        <KafoSelectBus />
        <KafoButton />
        <KafoMap />
        <KafoResults />
        
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});


