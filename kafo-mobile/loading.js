import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Animation from 'lottie-react-native';
import anim from './img/kafo2.json';
import Lottieloader from './lottie';

export default class Loading extends React.Component {
    
    state = {
        animating: true,
        isLoading: true
    }
    
    closeActivityIndicator = () => setTimeout(() => {
        this.setState({
            animating: false,
            isLoading: false
        })
        
        var toggle = true;
        
        this.props.animateEnd(toggle);
    }, 4000)
    
    componentDidMount = () =>
    this.closeActivityIndicator()
    
    
    
    
    //import this file into kafo
    //set kafo app.js to false
    //create a function that sets the state back to true once loading is done
    
  render() {
      const animating = this.state.animating
      const isLoading = this.state.isLoading
      
      
    return ( 
      <View style={styles.container}>
             <Lottieloader />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6DAD2',
    alignItems: 'center',
    justifyContent: 'center',
  },
    
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 600,
        width: 500,
        overflow: 'hidden',
    }
});
