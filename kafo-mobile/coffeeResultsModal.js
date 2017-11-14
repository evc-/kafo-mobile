import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class CoffeeResultsModal extends React.Component {
    constructor(props){
        super(props);
        
       
        this.startTimer = this.startTimer.bind(this);
    }
    
    startTimer(){
        this.props.changeModal(3);
    }
    
render() {
    return (
       
        <View style={{flex: 1}} >
                  <Text style={styles.question1Style}>Youve got time for coffee!</Text>
              
                <Text style={styles.paragraph1Style}>The current time is and your bus arrives at. It will take you an extra 5 minutes to woalk to and from, so that leaves you an extra minutes to get a coffee. Plenty of time!</Text>
        
        
                <TouchableOpacity> 
                    <Text 
                        style={styles.question2Style}
                        onPress={() => this.startTimer()}>
                 Start Live Bus Tracker & Timer
                    </Text>
                </TouchableOpacity> 
        </View>
    
    )
  }
}
const styles = StyleSheet.create({
    
    question1Style:{
        flex: 1,
        textAlign: 'center',
        padding:15,
        width: '100%',
        fontSize: 15,
        color: 'white',
        backgroundColor:'#76ABAC',
      },
    paragraph1Style:{
        flex: 1,
        textAlign: 'center',
        width: '100%',
        padding: 15,
        fontSize: 14,
        color: 'black'
    },
    question2Style:{
        flex: 1,
        textAlign: 'center',
        padding:15,
        width: '100%',
        fontSize: 15,
        color: 'white',
        backgroundColor: '#303C45'
      }
});