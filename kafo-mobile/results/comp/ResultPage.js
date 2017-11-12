import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity,Alert} from 'react-native';

export default class ResultPage extends React.Component {
 
    constructor(props){
        super(props);
        
        this.trackerBut = this.trackerBut.bind(this);
    }
    
    trackerBut(){
        
         this.props.changeModal(3);
        
    }
    
render() {
    return (
    <View style={{flex:1, bottom:0, position:"absolute"}}>
        <View style={styles2.Wstyle}>
            <Text  
                style={styles2.Style2}>
                Yes
            </Text>
        
        
            <Text  
                style={styles2.Style3}>
                    JJ Bean:  The current time is 7:34 AM, and your bus arrives at 7:46. It will take an extra 5 minutes to walk there. So you have seven minutes to get coffee. 
            </Text>
        </View>
        <View>
        <TouchableOpacity>
            <Text 
                onPress={this.trackerBut} 
                style={styles2.touchableStyle1}>
                    Start live bus tracker and timer
            </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
    
    Wstyle:{
        flexDirection: 'row'
    },
    
     Style2: {
        width: 125,
        height: 100,
        backgroundColor: '#81C783',
        fontSize: 30,
        textAlign: 'center',
        lineHeight: 100,
        color: '#F4EEE3',
        fontWeight: 'bold',
    },
    
     Style3: {
        width: 250,
        height: 100,
        backgroundColor: 'white',
        fontSize: 14,
        padding: 5,
        textAlign: 'center',
        color: '#303C45'
    },
    
    touchableStyle1: {
        backgroundColor: '#6FA7A8',
        fontSize: 24,
        textAlign: 'center',
        padding:10,
        color: '#F4EEE3',
        fontWeight: 'bold',
    }
});
        