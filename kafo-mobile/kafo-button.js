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
                style={styles.touchableStyle1}>
                    25 Brentwood
            </Text>
        </TouchableOpacity> 
        <TouchableOpacity>
            <Text 
                onPress={this.myClick} 
                style={styles.touchableStyle2}>
                    07 Dunbar
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
     touchableStyle1: {
        width: 450,
        height: 100,
        backgroundColor: '#303C45',
        fontSize: 50,
        flex: 0,
        textAlign: 'center',
        lineHeight: 100,
        color: '#F4EEE3',
        fontWeight: 'bold',
    },
    
    touchableStyle2: {
        width: 450,
        height: 100,
        backgroundColor: '#6FA7A8',
        fontSize: 50,
        flex: 0,
        textAlign: 'center',
        lineHeight: 100,
        color: '#F4EEE3',
        fontWeight: 'bold',
    }
});
        

