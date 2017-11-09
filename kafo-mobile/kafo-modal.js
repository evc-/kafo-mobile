import React, { Component } from 'react';
import { Modal, Dimensions, Keyboard, AppRegistry, StyleSheet, ScrollView, Text, View, Button } from 'react-native';
import KafoHeader from './kafo-header';
import KafoIcon from './kafo-icon';
import KafoTextInput from './kafo-textinput';
import KafoButton from './kafo-button2';

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
                <View style={{height: 400}}>
                
                <Text style={styles.question1Style}> Got enough time for coffee?</Text>
                <Text style={styles.question2Style}> Which bus stop are you going to?</Text>
                <View style={styles.lessAnnoying}>
                <KafoTextInput 
                    translinkAPICall={this.props.translinkAPICall} 
                    changeModal={(mstatenum) => this.changeModal(mstatenum)}
                />
      </View>
      
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
        }
          modal =(
              
                <View style={{height:500}}>
                <Text style={styles.question1Style}> Select your route </Text>
                <ScrollView>
                        {busResponses}
                </ScrollView>
      
            </View>

            
          )
      } else if (this.state.modalState===2){
          modal = (
                <View style={{height: 300}}>
                
                <Text style={styles.question1Style}></Text>
      
      </View>
          )
      }
      
      
    return (
        <View style={styles.modalStyle}>
        {modal}
        </View>

    );
  }
}

const styles = StyleSheet.create({
modalStyle: {
        position: 'absolute',
        borderRadius: 15,
        bottom: 50,
        zIndex: 800,
        width: '90%',
        backgroundColor:'rgba(255, 255, 255, 1.0)',
        height: 220
      },
    
    question1Style:{
        position: 'absolute',
        borderRadius: 0,
        textAlign: 'center',
        height: 60,
        width: '100%',
        fontSize: 15,
        color: 'white',
        lineHeight: 30,
        backgroundColor:'#76ABAC',
        
        
        
      },
    
    
    question2Style:{
        position: 'absolute',
        textAlign: 'center',
        left: '20%',
        top: 65,
        fontSize: 12,
        color: 'grey',
        fontStyle: 'italic'
        
      },
    lessAnnoying: {
        position:'absolute',
        width: 90,
        top: 50,
    },
    
    selectRouteStyle: {
        position: 'absolute',
        borderRadius: 0,
        textAlign: 'center',
        height: 61,
        width: '100%',
        fontSize: 20,
        color: 'white',
        lineHeight: 40,
        backgroundColor:'#76ABAC',
    }
    
    
});

export default KafoModal;
