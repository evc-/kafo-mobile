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
                <View style={{height: 300}}>
                
                <Text style={styles.question1Style}> Got enough time for coffee?</Text>
                <Text style={styles.question2Style}> Which bus stop are you going to?</Text>
                
                <KafoTextInput 
                style={{height:300, position: 'absolute', bottom:200}}
                    translinkAPICall={this.props.translinkAPICall} 
                    changeModal={(mstatenum) => this.changeModal(mstatenum)}
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
                
                <Text style={styles.question1Style}>Success!</Text>
      
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
        bottom: 100,
        zIndex: 800,
        width: '90%',
        backgroundColor:'rgba(255, 255, 255, 1.0)'

      },
    
    question1Style:{
        position: 'absolute',
        borderRadius: 15,
        textAlign: 'center',
        height: 80,
        width: '100%',
        fontSize: 24,
        color: 'white',
        lineHeight: 40,
        backgroundColor:'#76ABAC'
        
        
      },
    
    
    question2Style:{
        position: 'absolute',
        textAlign: 'center',
        left: '15%',
        top: 60,
        fontSize: 16,
        color: 'grey',
        fontStyle: 'italic'
        
      }
    
    
});

export default KafoModal;
