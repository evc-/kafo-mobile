import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity } from 'react-native';
import KafoHeader from './kafo-header';

export default class EndPageModal extends React.Component {

  render() {
      return (


<View>
          
     <View>
          <KafoHeader innerText="Thanks for using Kafo!"/>
            <Text style={{textAlign: 'center', fontSize: 18, color:'#42565E',fontWeight: 'bold', padding: 8}}> Enjoy Your Day! </Text>
        
            <Text style={{textAlign: 'center', fontSize: 16, color:'#42565E'}}> If youd like to leave us feeback on your experience, please leave us a rating. {"\n"} </Text>
    </View>
          
    <View style={{flex:3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <TouchableOpacity style={styles.rateStyle}><Text style={{textAlign: 'center', color: '#f4efe3',fontSize: 20, fontWeight: 'bold',}}>Rate Us </Text>
          </TouchableOpacity> 
          
                        
          <TouchableOpacity style={styles.learnStyle}><Text style={{textAlign: 'center', color: '#f4efe3',fontSize: 20, fontWeight: 'bold', }}>Learn More </Text>
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
        


