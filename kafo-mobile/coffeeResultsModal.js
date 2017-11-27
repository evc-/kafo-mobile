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
            });
            console.log(this.state.coffeeShops);
        }
    }
    startTimer(){
        this.props.changeModal(3);
    }

render() {
    
//    if (this.state.coffeeShops.status === "statusRed"){
//           var statusStyle = styles.statusRedStyle;
//      } else if (this.state.coffeeShops.status === "statusOrange"){
//          var statusStyle = styles.statusOrangeStyle;
//      } else if (this.state.coffeeShops.status === "statusGreen") {
//          var statusStyle = styles.statusGreenStyle;
//      }
//    
    
    if(this.props.shopWithStatus){
    var shopInfo = this.props.shopWithStatus.map(function callback(obj, index) {
        return(
            
            <View key={index}>
                <Text style={styles.shopText}>{obj.name}</Text>
                <Text style={styles.statusStyle}>{obj.status}</Text>
            
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
        <View style={styles.headerContainer}>
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
        overflow: 'hidden',
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
      },
    
   shopText: {
       color:'#303C45',
       fontSize: 30,
       alignSelf: 'flex-start'
       
       
   },
    goBtnStyle:{
        backgroundColor: '#303C45',
        borderRadius: 20,
        width:"10%",
        padding: 5,
        alignSelf: 'flex-end'
    },
    goBtnText:{
        fontSize: 15,
        color: 'white',
    },
    
     headerContainer:{
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        overflow: 'hidden'
    },
    
    statusRedStyle:{
        color: 'red'
    },
    
    statusOrangeStyle:{
        color: 'orange'
    },
    
    statusGreenStyle:{
        color: 'green'
    }
});