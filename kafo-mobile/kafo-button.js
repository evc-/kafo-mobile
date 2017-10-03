import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native'

export default class MControl extends React.Component {
  
    myClick(){
        Alert.alert(
            "The title",
            "Starting live bus tracker", 
            [
                {text: "OK", onPress:()=>{}},
                {text: "NEXT", onPress:()=>{}},
            ]
        )
        
    }
    
    render() {
    return (
      <View>
        <TouchableOpacity>
            <Text 
                onPress={this.myClick} 
                style={{width: 450, height: 100,backgroundColor: '#303C45', fontSize: 70,flex: 0,  textAlign: 'center', color: '#F4EEE3', fontWeight: 'bold'}}>25
            </Text>
        </TouchableOpacity> 
        <TouchableOpacity>
            <Text 
                onPress={this.myClick} 
                style={{width: 450, height: 100,backgroundColor: '#6FA7A8', fontSize: 70,flex: 0,  textAlign: 'center', color: '#F4EEE3', fontWeight: 'bold'}}>7
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}