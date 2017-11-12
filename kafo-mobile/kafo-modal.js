import React, { Component } from 'react';
import { Modal, Dimensions, Keyboard, AppRegistry, StyleSheet, ScrollView, Text, View, Button } from 'react-native';
import KafoHeader from './kafo-header';
import KafoIcon from './kafo-icon';
import KafoTextInput from './kafo-textinput';
import KafoButton from './kafo-button2';
import KafoArrival from './kafo-arrival';
import KafoResults from './kafo-results';

class KafoModal extends Component {
    constructor(props){
        super(props);
        
        this.state={
            modalState: 0
        };
        
            this.changeModal = this.changeModal.bind(this);
            this.selectRoute = this.selectRoute.bind(this);
    }
    
      changeModal(mstatenum){
            this.setState({modalState: mstatenum});
          this.props.modalState(this.state.modalState);
            Keyboard.dismiss();
        }
    //returning undefined currently
        selectRoute(i){
        this.setState({
            selectedBus: this.props.selectRouteProp
        });
            console.log(this.state.selectedBus);
    }
    
  render() {
      var modal = null; 
          
        if(this.state.modalState === 0){
            
            modal =(
                <View >
                    <Text style={styles.question1Style}> Got enough time for coffee?</Text>
                    <Text style={styles.question2Style}> Which bus stop are you going to?</Text>
                    
                        <KafoTextInput 
                            translinkAPICall={this.props.translinkAPICall} 
                            translinkStopCall={this.props.translinkStopCall} 
                            changeModal={(mstatenum) => this.changeModal(mstatenum)}
                            setBusStopNum={this.props.setBusStopNum}
                        />
                    
                </View>
                )
                
      } else if (this.state.modalState === 1){
          var busResponses = null;
          
          if (this.props.tdata){
          
                busResponses = this.props.tdata.map(function callback(currentValue, index, array) {
                    return(
                        <KafoButton 
                            key={index+"buttons"} 
                            routeName={currentValue.RouteName} 
                            routeNumber={currentValue.RouteNo} 
                            minsTillDepart={currentValue.Schedules.ExpectedCountdown} 
                            buttonColor ={(index % 2 == 1)} 
                            selectedBusIndex= {index}
                            selectRouteProp={(i) => this.selectRoute(i)}
                            changeModal={this.changeModal}
                            getCoffeeShops ={this.props.coffeeShopCall}
                        />
                    );
                }, this);
        } else {
            busResponses = <Text style={styles.errorStyle}>Not a Valid route </Text>
        }
          modal =(

                <View style={{flex: 1}}>
                    <Text style={styles.question1Style}> Select your route </Text>
              
                    {
              //EMULATOR ISSUE: SCROLLING CHANGES MODAL STATE
              
              }
              
                    <ScrollView style={{flex: 1}}>
                        {busResponses}
                    </ScrollView>
                </View>

          )
      } else if (this.state.modalState===2){
          modal = (
        
          <View style={{flex: 1}}>
                <KafoResults 
                    changeModal={this.changeModal}
                />
          </View>
          )
      } else if (this.state.modalState ===3){
          modal = (
               <View style={{flex: 1}}>
                <KafoArrival 
                    changeModal={this.changeModal}
                />
          </View>
          )
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
        fontSize: 15,
        color: 'white',
        backgroundColor:'#76ABAC',
      },
    
    question2Style:{
        textAlign: 'center',
        padding:15,
        fontSize: 12,
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
