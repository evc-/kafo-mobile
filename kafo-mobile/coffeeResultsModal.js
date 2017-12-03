import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import KafoHeader from './kafo-header';

export default class CoffeeResultsModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectedTrip: 0
        }    
        
        this.startTimer = this.startTimer.bind(this);
        this.changeBusTime = this.changeBusTime.bind(this);
        this.compareTimesToSort = this.compareTimesToSort.bind(this);
    }
  
    startTimer(i){
        this.props.changeModal(3);
        this.props.selectShop(i);
        this.props.increaseMaxState(3);
    }
    
    changeBusTime(choice){
        this.props.changeBusArrival(choice);
        this.setState({
            selectedTrip: choice
        })
        
    }
    
    compareTimesToSort(shop1, shop2){
        return(
            shop1.journeyTime - shop2.journeyTime
        )
    }
    

render() {
    var selectedColor;
    
    if(this.props.shopWithStatus){
        console.log(this.props.shopWithStatus);
        
        this.props.shopWithStatus.sort(this.compareTimesToSort(this.props.shopWithStatus, this.props.shopWithStatus));
        
        var shopInfo = this.props.shopWithStatus.map(function callback(currentValue, i) {
           
        return(
            
    <View key={i}>
      <TouchableOpacity onPress={this.startTimer.bind(this, i)} style={i%2==1 ? styles.touchableStyle1 : styles.touchableStyle2}> 
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                                     
                                                     
                    <View style={(currentValue.status == 'statusGreen') ? styles.statusGreenStyle : ((currentValue.status == 'statusRed') ? styles.statusRedStyle : styles.statusOrangeStyle)}>                      
                        <Image 
                            source={require('./img/cup-icon-02.png')} 
                            style={{width: 10, height: 10, alignSelf:'flex-start'}}
                        />
                    </View>
                    <View style={{height: '100%'}}>
                        <Text style={{fontSize: 28, color: '#303C45', textAlign: 'left', fontWeight: 'bold', paddingLeft: 10}} numberOfLines={1} ellipsizeMode={'tail'}>{currentValue.name}</Text>
                        <Text style={{fontSize: 12, color: '#303C45', textAlign: 'left', fontWeight: 'bold', paddingLeft: 10}}>Bus arrives in {currentValue.nextBus} min{"\n"}</Text>
                        <Text style={{fontSize: 12, color: '#303C45', textAlign: 'left', paddingLeft: 10, paddingBottom: 10}}>Trip time is {currentValue.journeyTime} min</Text>
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

var arrivalChoices; 

if (this.props.selectedBusState){
    
    arrivalChoices = 
         <View style={{backgroundColor:'#42565E', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 4}}>
                                <Text style={{color: 'white', fontWeight: 'bold', paddingLeft: 5}}>Bus {this.props.selectedBusState.RouteNo}</Text>
                            </View>
                            <View style={{flex: 4}}>
                                <TouchableOpacity onPress={() => this.changeBusTime(0)} style={{backgroundColor:(this.state.selectedTrip === 0)?'#6fa7a8':'#42565E'}}> 
                                    <Text style={{color: 'white', textAlign: 'center'}}>
                                        {this.props.selectedBusState.Schedules[0].ExpectedLeaveTime}
                                    </Text> 
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 4}}>
                                <TouchableOpacity onPress={() => this.changeBusTime(1)} style={{backgroundColor:(this.state.selectedTrip === 1)?'#6fa7a8':'#42565E'}}> 
                                    <Text style={{color: 'white', textAlign: 'center'}}>
                                        {this.props.selectedBusState.Schedules[1].ExpectedLeaveTime}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 4}}>
                                <TouchableOpacity onPress={() => this.changeBusTime(2)} style={{backgroundColor:(this.state.selectedTrip === 2)?'#6fa7a8':'#42565E'}}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>
                                        {this.props.selectedBusState.Schedules[2].ExpectedLeaveTime}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    </View>
;
}

    return (
       
        <View style={{flex:1}} >
        
            <View>
                <KafoHeader innerText={"Time for coffee at these shops"}/>
            </View>
            <View>
                {arrivalChoices}
            </View>
            <ScrollView style={{flex:1}}>
                {shopInfo}
            </ScrollView>
        
        </View>
    
    )
  }
}

const styles = StyleSheet.create({
    
    statusRedStyle:{
        alignSelf:'flex-start', 
        height: '100%', 
        paddingLeft: 10, 
        paddingRight: 10, 
        justifyContent: 'center',
        backgroundColor: '#C65156'
    },
    
    statusOrangeStyle:{
        alignSelf:'flex-start', 
        height: '100%', 
        paddingLeft: 10, 
        paddingRight: 10, 
        justifyContent: 'center',
        backgroundColor: '#fcd259'
    },
    
    statusGreenStyle:{
        alignSelf:'flex-start', 
        height: '100%', 
        paddingLeft: 10, 
        paddingRight: 10, 
        justifyContent: 'center',
        backgroundColor: '#1e7a29'
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