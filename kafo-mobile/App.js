import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Keyboard, Text, View, ScrollView, Button } from 'react-native';
import KafoIcon from './kafo-icon';
import KafoHeader from './kafo-header';
import KafoTextInput from './kafo-textinput';
import KafoSelectBus from './kafo-selectbus';
import KafoMapCombined from './map/kafomap-combined';
import KafoButton2 from './kafo-button2';
import ArrivalPage from './kafo-arrival';    
import KafoModal from './kafo-modal';

export default class App extends React.Component {

//setting the "appState" to be zero as a baseline. the "appState" changes when we want other elements, like buttons or maps to appear. 
     constructor(props) {
        super(props);
        this.state = {
            appState: 0,
            translinkData: ""
        };
         
//        this.changeAppPage = this.changeAppPage.bind(this);
        this.translink = this.translink.bind(this);
     }
    

//we set "this" (app.js) to be pagenum, which is defined as zero up above. 

//    changeAppPage(pagenum){
//        this.setState({appState: pagenum});
//        Keyboard.dismiss();
//    }
 
//translink function now takes stop number(stopNum) as a parameter. replaced dummy stop # with the parameter. 
//passed translink function as prop to text input component below. 

translink(stopNum) {
    fetch('https://kafo-call.herokuapp.com/translink/' + stopNum , {method:'GET', headers:{
          "Content-Type": "application/json"
          }})
    .then(response => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        this.setState({translinkData:responseJson});     //set the state to be the response object from the translink api 
        
    })
    .catch((error) => {
        console.log(error);
    });
}
//this function takes an index parameter and saves the corresponding bus route to STATE as "selectedBus" 
    
    selectRoute(i){
        this.setState({
            selectedBus: this.state.translinkData[i]
        });
    }
    
  render() {

//add a selectedbusIndex prop so we have the index of which button they clicked on 
//add a selectRouteProp so we can call have the selectRoute function from the button component 
//if the state exists, map the object (in the state) to create the buttons 
      
      

    if (true){
        var modal = null;
              modal = (
                  <View style={{alignItems:'center'}}>  
                    <KafoModal
                        tdata ={this.state.translinkData}
//                        changePage={(pagenum) => this.changeAppPage(pagenum)}
                        translinkAPICall ={this.translink}
                    >    
                        {this.props.children}
                    </KafoModal>
                </View>
          
            );

            return (
                <View style={styles.container}>
                       
                    <KafoMapCombined/>
                    {modal}

                </View>
            );
      } 
  }
}

const styles = StyleSheet.create({
    
  container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
  }
});


