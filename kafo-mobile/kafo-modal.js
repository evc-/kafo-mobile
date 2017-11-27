import React, { Component } from 'react';
import { Modal, Dimensions, Keyboard, AppRegistry, StyleSheet, ScrollView, Text, View, Button } from 'react-native';
import KafoTextInput from './kafo-textinput';
import KafoButton from './kafo-button';
import ArrivalModal from './arrivalModal';
import CoffeeResultsModal from './coffeeResultsModal';

class KafoModal extends Component {
    constructor(props){
        super(props);
        
        this.state={
            modalState: this.props.modalState,
            selectedBus:''
        };
        
            this.changeModal = this.changeModal.bind(this);
    }
    
    changeModal(page){
        this.props.changeModalState(page);
        Keyboard.dismiss();
    }
    
//      changeModal(mstatenum){
//            this.setState({modalState: mstatenum});
//            this.props.modalState(this.state.modalState);
//            
//}
    
        selectRoute(i){
            this.setState({
                selectedBus:this.props.tdata[i]
           });
    }

  render() {
      var modal = null; 
          
        if(this.props.modalState === 0){
            modal =(
                <View >
                    <Text style={styles.question1Style}> Got enough time for coffee?</Text>
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
                    return(
                        <KafoButton 
                            key={index} 
                            routeName={currentValue.RouteName} 
                            routeNumber={currentValue.RouteNo} 
                            minsTillDepart={currentValue.Schedules.ExpectedCountdown} 
                            buttonColor ={(index % 2 == 1)} 
                            busIndex={index}
                            selectedBus={this.props.selectedBus}
                            changeModal={this.changeModal}
                            getCoffeeShops = {this.props.getCoffeeShops}
                            
                        />
                    );
                }, this);
        } else {
//            busResponses = <Text style={styles.errorStyle}>Not a Valid route </Text>
        }
          modal =(

                <View style={{flex: 1}}>
                    <Text style={styles.question1Style}> Select your route </Text>
                    <ScrollView style={{flex: 1}}>
                        {busResponses}
                    </ScrollView>
                </View>

          )
      } else if (this.props.modalState===2){
          modal = (
        
          <View style={{flex: 1}}>
                <CoffeeResultsModal 
                    changeModal={this.changeModal}
                    shopWithStatus = {this.props.shopWithStatus}
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
                            minsTillDepart={currentValue.Schedules[0].ExpectedCountdown}
                          />
                              )
                      );
                  }, this);
          }
      }
      
    return (
        <View style={{flex:1}}>
            {modal}
        </View>

    );
  }
}

const styles = StyleSheet.create({
    
    question1Style:{
        borderRadius: 0,
        textAlign: 'center',
        padding:20,
        width: '100%',
        fontSize: 20,
        color: 'white',
        backgroundColor:'#76ABAC',
      },
    
    question2Style:{
        textAlign: 'center',
        padding:15,
        fontSize: 15,
        color: 'grey',
        fontStyle: 'italic'
      },
    
    errorStyle:{
        textAlign: 'center',
        color: 'red',
        fontSize: 12
    }

    
});

export default KafoModal;
