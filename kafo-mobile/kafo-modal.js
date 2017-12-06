import React, { Component } from 'react';
import { Modal, Dimensions, Keyboard, AppRegistry, StyleSheet, ScrollView, Text, View, Button, TouchableOpacity } from 'react-native';
import KafoTextInput from './kafo-textinput';
import KafoButton from './kafo-button';
import ArrivalModal from './arrivalModal';
import CoffeeResultsModal from './coffeeResultsModal';
import EndPageModal from './EndPageModal';
import KafoHeader from './kafo-header';

class KafoModal extends Component {
    constructor(props){
        super(props);
        
        this.state={
            selectedBus:'',
            selectedShop:''
        };
        
            this.changeModal = this.changeModal.bind(this);
            this.selectShop = this.selectShop.bind(this);
            this.pushBusStopNum = this.pushBusStopNum.bind(this);
    }
    
    changeModal(page){
        this.props.changeModalState(page);
        Keyboard.dismiss();
    }
    
    selectRoute(i){
            this.setState({
                selectedBus:this.props.tdata[i]
           });
    }
    
    selectShop(i){
        this.props.selectShop(i);
        this.setState({
            selectedShop:this.props.shopWithStatus[i]
        })
    }
    pushBusStopNum(text){
    this.setState({
        busStopNum:text
    });
    console.log("chosen bus number: "+text);
}

  render() {
      var modal = null; 
          
        if(this.props.modalState === 0){
            modal =(
                <View >
                    <KafoHeader innerText={"Got enough time for coffee?"}/>
                    <Text style={styles.question2Style}>{this.props.errorMsg}</Text>
                    
                        <KafoTextInput 
                            tsRouteCall={this.props.tsRouteCall} 
                            tsStopCall={this.props.tsStopCall} 
                            changeModal={this.changeModal}
                            setBusStopNum = {this.pushBusStopNum}
                            idFromMap = {this.props.idFromMap}
                        />
                    
                </View>
                )
                
      } else if (this.props.modalState === 1){
          var busResponses = null;
          
          if (this.props.tdata){
                busResponses = this.props.tdata.map(function callback(currentValue, index, array) {
                    var minsTillDepart = currentValue.Schedules[this.props.busArrivalChoice].ExpectedCountdown;
                    return(
                        <KafoButton 
                            key={index} 
                            routeName={currentValue.RouteName} 
                            routeNumber={currentValue.RouteNo} 
                            minsTillDepart={currentValue.Schedules[index].ExpectedCountdown} 
                            buttonColor ={(index % 2 == 1)} 
                            busIndex={index}
                            selectedBus={this.props.selectedBus}
                            changeModal={this.changeModal}
                            getCoffeeShops = {this.props.getCoffeeShops}
                            changeBusArrival = {this.props.changeBusArrival}
                            increaseMaxState = {this.props.increaseMaxState}
                        />
                    );
                }, this);
        }
          
        modal =(
                <View style={{flex: 1}}>
                    <View>
                        <KafoHeader innerText={"Select Your Route"}/>
                    </View>
                
                    <ScrollView style={{flex: 1}}>
                        {busResponses}
            {
                       // <Text style={styles.question2Style}>Not the right busses?</Text>
            }
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            {
//                            <TouchableOpacity style={{width: '40%', borderColor: '#6fa7a8', borderWidth: 2, borderRadius: 15,                                 width: '40%'}} onPress={()=> this.changeModal(0)}>
//                            <Text style={{textAlign: 'center', color: '#6fa7a8'}}>Go Back</Text>
//                            </TouchableOpacity> 
            }
                        </View>
                    </ScrollView>
                </View>
          )
      
      } else if (this.props.modalState===2){
          modal = (
        
          <View style={{flex: 1}}>
              
                <CoffeeResultsModal 
                    changeModal={this.changeModal}
                    shopWithStatus = {this.props.shopWithStatus}
                    getShopIndex = {this.props.getShopIndex}
                    selectShop = {this.selectShop}
                    selectedBus = {this.props.SelectedBus}
                    selectedBusState = {this.props.selectedBusState}
                    getCoffeeShops = {this.props.getCoffeeShops}
                    changeBusArrival = {this.props.changeBusArrival}
                    increaseMaxState = {this.props.increaseMaxState}
                    busArrivalChoice = {this.props.busArrivalChoice}
                    
                />
              
          </View>
          )
      } else if (this.props.modalState ===3){
          var estimateResponse = null;
          
          if(this.props.tdata){
                  estimateResponse = this.props.shopWithStatus.map(function callback(currentValue, index, array){

 //                     var minsTillDepart = currentValue.Schedules[this.props.busArrivalChoice].ExpectedCountdown;
                        var minsTillDepart = currentValue.nextBus;  
                        var busIndex = currentValue.busIndex;
                        var expectedLeaveTime = currentValue.expectedLeaveTime;
                      return (
                          modal = (
                          <ArrivalModal 
                            changeModal={this.changeModal}
                            minsTillDepart={minsTillDepart}
                            expectedLeaveTime = {expectedLeaveTime}
                            busIndex = {busIndex}
                            selectedShop = {this.state.selectedShop}
                            increaseMaxState = {this.props.increaseMaxState}
                            selectedBusState = {this.props.selectedBusState}
                            busStopNum = {this.state.busStopNum}
                            tdata = {this.props.tdata}
                            
                          />
                              )
                      );
                  }, this);
          }
      } else if (this.props.modalState === 4){
              modal = (
                <View>
                  <EndPageModal/>
                </View>
          )
      }
      
    return (
        <View style={{flex:1}}>
            {modal}
            {this.props.children}
        </View>

    );
  }
}

const styles = StyleSheet.create({
    
    question2Style:{
        textAlign: 'center',
        padding:15,
        fontSize: 15,
        color: 'grey'
      },
    
    errorStyle:{
        textAlign: 'center',
        color: 'red',
        fontSize: 12
    }

    
});

export default KafoModal;
