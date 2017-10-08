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
    
     constructor(props) {
        super(props);
         //to change pages of the app 
        this.state = {appState: 0};
     }
    
    //a function to change pages in the app by updating "appState" - 0 for first page, 1 for second page, etc. 
    //gets a parameter of pagenum, which is used to set the "appState" 
    changeAppPage(pagenum){
        this.setState({appState: pagenum});
    }
 
    
    
  render() {
      
      if (this.state.appState == 0){
            return (
                <View style={styles.container}>
                    <KafoIcon  />
                    <KafoHeader headerText="Which stop are you at?" />
                    <KafoTextInput changePage={(pagenum) => this.changeAppPage(pagenum)} />
                </View>
            );
          
      } else {
           return (
                <View style={styles.container}>
                    <KafoSelectBus />
                    <KafoButton />
                </View>
            );
      }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});


