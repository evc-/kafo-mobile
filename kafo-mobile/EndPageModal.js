import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import KafoHeader from './kafo-header';
import EndLottie from './endLottie';

export default class EndPageModal extends React.Component {

  render() {
      return (
            <View style={{flex: 1}}>
                <KafoHeader innerText="Thanks for using Kafo!"/>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{width: Dimensions.get('window').width, height: 320}}>
                        <EndLottie />
                    </View>
                </View>
                <View style={{paddingTop:50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                      <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://alexissrussell.github.io/kafo/')}} style={styles.rateStyle}><Text style={{textAlign: 'center', color: '#f4efe3',fontSize: 20, fontWeight: 'bold',}}>Rate Us </Text>
                      </TouchableOpacity>           
                      <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://alexissrussell.github.io/kafo/')}} style={styles.learnStyle}><Text style={{textAlign: 'center', color: '#f4efe3',fontSize: 20, fontWeight: 'bold', }}>Learn More </Text>
                      </TouchableOpacity> 
                </View>
            </View>
        );
  }
}

const styles = StyleSheet.create({
    
    rateStyle:{
        padding:10,
        margin: 15,
        borderRadius: 8,
        width: '20%',
        backgroundColor:'#6fa7a8',
        flex: 1
    },
    
    learnStyle:{
        padding:10,
        margin: 15,
        borderRadius: 8,
        width: '20%',
        backgroundColor:'#6fa7a8',
        flex: 1
        
    }
});
        


