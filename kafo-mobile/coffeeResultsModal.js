import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

export default class CoffeeResultsModal extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
       
        this.startTimer = this.startTimer.bind(this);
    }
    
//    componentWillMount(){
//        if(this.props.shopWithStatus !== undefined){
//            this.setState({
//               coffeeShops:this.props.shopWithStatus
//            });
//        }
//    }
    
    startTimer(i){
        this.props.changeModal(3);
        this.props.selectShop(i);
    }
    

render() {    
    if(this.props.shopWithStatus){
        var shopInfo = this.props.shopWithStatus.map(function callback(obj, i) {
        return(
            
    <View key={i}>
      <TouchableOpacity onPress={this.startTimer.bind(this, i)} style={i%2==1 ? styles.touchableStyle1 : styles.touchableStyle2}> 
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{backgroundColor: 'orange', alignSelf:'flex-start', height: '100%', paddingLeft: 10, paddingRight: 10, justifyContent: 'center'}}>
                        <Image 
                            source={require('./img/cup-icon-02.png')} 
                            style={{width: 10, height: 10, alignSelf:'flex-start'}}
                        />
                    </View>
                    <View style={{height: '100%'}}>
                        <Text style={{fontSize: 30, color: '#42565E', textAlign: 'left', fontWeight: 'bold', paddingLeft: 10}}>{obj.name}</Text>
                        <Text style={{fontSize: 15, color: '#42565E', textAlign: 'left', fontWeight: 'bold', paddingLeft: 10}}>Bus arrives in {obj.nextBus} min{"\n"}</Text>
                        <Text style={{fontSize: 15, color: '#42565E', textAlign: 'left', paddingLeft: 10, paddingBottom: 5}}>Trip time is {obj.journeyTime} min</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={this.startTimer.bind(this, i)} style={{alignSelf:'flex-end', height: '100%', justifyContent: 'center'}}>
                        <Image 
                            source={require('./img/arrow-01.png')} 
                            style={{width: 40, height: 40, alignSelf: 'flex-end'}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    </View>
    );
}, this)
};
    return (
       
        <View style={{flex:1}} >
            <View style={styles.headerContainer}>
                <Text style={styles.headerStyle}> Here are the shops!</Text>
            </View>
            <ScrollView style={{flex:1}}>
                {shopInfo}
            </ScrollView>
        </View>
    
    )
  }
}

const styles = StyleSheet.create({
    
    headerStyle:{
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 25,
        textAlign: 'center',
        color: '#f4efe3',
        backgroundColor:'#462f23',
        overflow: 'hidden',
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
      },
    
     headerContainer:{
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        overflow: 'hidden'
    },
    
    statusRedStyle:{
        backgroundColor: 'red'
    },
    
    statusOrangeStyle:{
        backgroundColor: 'orange'
    },
    
    statusGreenStyle:{
        backgroundColor: 'green'
    }, 
    
    touchableStyle1:{
        flex: 1,
        width: '100%',
        backgroundColor: '#e6e6e6',
        justifyContent: 'center',
    },
    
     touchableStyle2: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
    }
});