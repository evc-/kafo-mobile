import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default class CoffeeResultsModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            coffeeShops:[]
        }
       
        this.startTimer = this.startTimer.bind(this);
    }
    componentWillMount(){
        if(this.props.shopWithStatus !== undefined){
            this.setState({
               coffeeShops:this.props.shopWithStatus
                /*[
                   {
                       name:'Tim Hortons',
                       status:'Good',
                       journeyTime:'5 min',
                       buffer:'3 min',
                       coords:{
                           lat:'49.250338',
                           long:'-123.001602'
                       }
                   }
                   ]*/
            });
        }
    }
    startTimer(){
        this.props.changeModal(3);
    }

render() {
    if(this.props.shopWithStatus){
    var shopInfo = this.props.shopWithStatus.map(function callback(obj, index) {
        return(
            
            <View key={index}>
                <Text style={styles.shopText}>{obj.name}</Text>
                <Text style={styles.shopText}>{obj.status}</Text>
                <View 
                    style={styles.goBtnStyle}
                >
                    <TouchableOpacity
                    onPress={()=>this.startTimer()}
                    >
                    <Text style={styles.goBtnText}>GO</Text>
                    </TouchableOpacity>  
                </View>
            </View>
                                     
                                                 
                    );
                }, this);
}
    return (
       
        <View style={{flex:1}} >
        <View>
            <Text style={styles.question1Style}> Here are the shops!</Text>
        </View>
        <ScrollView style={{flex:3, flexDirection:'column'}}>
              {shopInfo}
        </ScrollView>
        </View>
    
    )
  }
}
const styles = StyleSheet.create({
    
    question1Style:{
        width: '100%',
        fontSize: 15,
        padding: 25,
        color: 'white',
        //textAlign: 'center',
        backgroundColor:'#76ABAC',
      },
    
   shopText: {
       color:'#303C45',
       fontSize: 15,
       
   },
    
    
    goBtnStyle:{
        backgroundColor: '#303C45',
        borderRadius: 20,
        width:"10%",
        padding: 5,
        //textAlign: 'center',
        
        
    },
    goBtnText:{
        fontSize: 15,
        color: 'white',
        
    }
});