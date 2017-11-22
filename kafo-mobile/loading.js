import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

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
    }, 6000)
    
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
        {isLoading && (
            <ActivityIndicator 
                animating = {animating}
                color = '#c65156'
                size = 'large'
                style = {styles.activityIndicator}
            />
    )}
    
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
    
    activityIndicator: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 100,
    },
});
