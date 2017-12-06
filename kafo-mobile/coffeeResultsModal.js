import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import KafoHeader from './kafo-header';

export default class CoffeeResultsModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectedTrip: 0,
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
    }
    
    compareTimesToSort(shop1, shop2){
        return(
            shop1.journeyTime, shop2.journeyTime
        )
    }
    

render() {
    var headerMsg;
    if(this.props.shopWithStatus){
        if (this.props.shopWithStatus.length > 1){
            this.props.shopWithStatus.sort(this.compareTimesToSort(this.props.shopWithStatus, this.props.shopWithStatus));
        } 
        
        if (this.props.shopWithStatus.length == 0){
            headerMsg ="Oh no!";
            shopInfo = (
                <View style={{alignItems:'center'}}>
                <Text style={styles.question2Style}>
                There are no open coffee shops around you right now. 
                </Text>
                
                <Image 
                    source={require('./img/heart-01.png')}
                    style={{width: 70, height: 70}}
                 />
                
                <Text style={styles.question2Style}>
                    Don't panic - Try again in a different place, or tomorrow morning. If there's coffee around, you'll be the first to know.
                    </Text>
                </View>
            )
        } else {
            headerMsg ="Time for coffee at these shops";
           var shopInfo = this.props.shopWithStatus.map((currentValue, i, array)=> {
                return(  
                    <View key={i}>
                      <TouchableOpacity onPress={this.startTimer.bind(this, i)} style={i%2==1 ? styles.touchableStyle1 : styles.touchableStyle2}> 
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
                                    <View style={(currentValue.status == 'statusGreen') ? styles.statusGreenStyle : ((currentValue.status == 'statusRed') ? styles.statusRedStyle : styles.statusOrangeStyle)}>                      
                                        <Image 
                                            source={require('./img/cup-icon-02.png')} 
                                            style={{width: 10, height: 10, alignSelf:'flex-start'}}
                                        />
                                    </View>
                                    <View style={{height: '100%', width: '100%'}}>
                                        <Text style={{width: '85%', fontSize: 28, color: '#303C45', textAlign: 'left', fontWeight: 'bold', paddingLeft: 10}} numberOfLines={1} ellipsizeMode={'tail'}>{currentValue.name}</Text>
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
            });
        }
    }

    var arrivalChoices; 
    if (this.props.selectedBusState && this.props.getCoffeeShops.length >= 0){
        var mtime0 = this.props.selectedBusState.Schedules[0].ExpectedLeaveTime.split(" ");
        var datestr0 = mtime0[0];

        var mtime1 = this.props.selectedBusState.Schedules[1].ExpectedLeaveTime.split(" ");
        var datestr1 = mtime1[0];

        var mtime2 = this.props.selectedBusState.Schedules[2].ExpectedLeaveTime.split(" ");
        var datestr2 = mtime2[0];
        
        arrivalChoices = 
             <View style={{backgroundColor:'#42565E', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 4}}>
                                    <Text style={{color: 'white', fontWeight: 'bold', paddingLeft: 5}}>Bus {this.props.selectedBusState.RouteNo}</Text>
                                </View>
                                <View style={{flex: 4}}>
                                    <TouchableOpacity onPress={() => this.changeBusTime(0)} style={{backgroundColor:(this.props.busArrivalChoice === 0)?'#6fa7a8':'#42565E'}}> 
                                        <Text style={{color: 'white', textAlign: 'center'}}>
                                            {datestr0}
                                        </Text> 
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 4}}>
                                    <TouchableOpacity onPress={() => this.changeBusTime(1)} style={{backgroundColor:(this.props.busArrivalChoice === 1)?'#6fa7a8':'#42565E'}}> 
                                        <Text style={{color: 'white', textAlign: 'center'}}>
                                            {datestr1}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex: 4}}>
                                    <TouchableOpacity onPress={() => this.changeBusTime(2)} style={{backgroundColor:(this.props.busArrivalChoice === 2)?'#6fa7a8':'#42565E'}}>
                                        <Text style={{color: 'white', textAlign: 'center'}}>
                                            {datestr2}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
    }
    return (
        <View style={{flex:1}}>
            <View>
                <KafoHeader innerText={headerMsg}/>
            </View>
            <View>
                {arrivalChoices}
            </View>
            <ScrollView style={{flex:1}}>
                {shopInfo}
            </ScrollView>
        </View>
    );
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
        backgroundColor: '#199e5c'
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
    },
    
    question2Style:{
        textAlign: 'center',
        padding:15,
        fontSize: 15,
        color: 'grey'
      },
});