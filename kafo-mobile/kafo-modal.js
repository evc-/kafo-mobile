import React, { Component } from 'react';
import { Modal, Dimensions, Keyboard, AppRegistry, StyleSheet, ScrollView, Text, View, Button, TouchableOpacity } from 'react-native';
import KafoTextInput from './kafo-textinput';
import KafoButton from './kafo-button';
import ArrivalModal from './arrivalModal';
import CoffeeResultsModal from './coffeeResultsModal';
import EndPageModal from './EndPageModal';

class KafoModal extends Component {
    constructor(props){
        super(props);
        
        this.state={
            modalState: this.props.modalState,
            selectedBus:'',
            selectedShop:''
        };
        
            this.changeModal = this.changeModal.bind(this);
            this.selectShop = this.selectShop.bind(this);
            
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
    

  render() {
      var modal = null; 
          
        if(this.props.modalState === 0){
            modal =(
                <View >
                    <Text style={styles.headerStyle}> Got enough time for coffee?</Text>
                    <Text style={styles.question2Style}>{this.props.errorMsg}</Text>
                    
                        <KafoTextInput 
                            tsRouteCall={this.props.tsRouteCall} 
                            tsStopCall={this.props.tsStopCall} 
                            changeModal={this.changeModal}
                            setBusStopNum={this.props.setBusStopNum}
                        />
                    
                </View>
                )
                
      } else if (this.props.modalState === 1){
          var busResponses = null;
          
          if (this.props.tdata){
                busResponses = this.props.tdata.map(function callback(currentValue, index, array) {
                    var minsTillDepart = 0;
                      for(var i = 0; i < currentValue.Schedules.length; i++){
                          if(currentValue.Schedules[i].ExpectedCountdown > 0){
                              minsTillDepart = currentValue.Schedules[i].ExpectedCountdown;
                              break;
                          }
                      }
                    return(
                        <KafoButton 
                            key={index} 
                            routeName={currentValue.RouteName} 
                            routeNumber={currentValue.RouteNo} 
                            minsTillDepart={minsTillDepart} 
                            buttonColor ={(index % 2 == 1)} 
                            busIndex={index}
                            selectedBus={this.props.selectedBus}
                            changeModal={this.changeModal}
                            getCoffeeShops = {this.props.getCoffeeShops}
                            changeBusArrival = {this.props.changeBusArrival}
                        />
                    );
                }, this);
        }
          
        modal =(
                <View style={{flex: 1}}>
                    <View>
                        <Text style={styles.headerStyle}> Select your route </Text>
                    </View>
                
                    <ScrollView style={{flex: 1}}>
                        {busResponses}
                        <Text style={styles.question2Style}>Not the right busses?</Text>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <TouchableOpacity style={{width: '40%', borderColor: '#6fa7a8', borderWidth: 2, borderRadius: 15,  width: '40%'}} onPress={()=> this.changeModal(0)}>
                            <Text style={{textAlign: 'center', color: '#6fa7a8'}}>Go Back</Text>
                            </TouchableOpacity> 
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

                />
              
          </View>
          )
      } else if (this.props.modalState ===3){
          var estimateResponse = null;
          
          if(this.props.tdata){
                  estimateResponse = this.props.tdata.map(function callback(currentValue, index, array){
                      var minsTillDepart = 0;
                      for(var i = 0; i < currentValue.Schedules.length; i++){
                          if(currentValue.Schedules[i].ExpectedCountdown > 0){
                              minsTillDepart = currentValue.Schedules[i].ExpectedCountdown;
                              break;
                          }
                      }
                      return (
                          modal = (
                          <ArrivalModal 
                            changeModal={this.changeModal}
                            minsTillDepart={minsTillDepart}
                            selectedShop = {this.state.selectedShop}
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
    
    headerStyle:{
        textAlign: 'center',
        padding:10,
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f4efe3',
        backgroundColor:'#6fa7a8'
      },
    
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
