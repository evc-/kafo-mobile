import React, { Component } from 'react';
import { Modal, Dimensions, AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import KafoHeader from './kafo-header';
import KafoIcon from './kafo-icon';
import KafoTextInput from './kafo-textinput';

class KafoModal extends Component {
    constructor(props){
        super(props);
        
        this.state={
     
        };
        
    }
    
  render() {
    return (

            <View style={styles.modalStyle}>
                <KafoHeader headerText={this.props.headerText} />
                <Text style={styles.question1Style}> Got enough time for coffee?</Text>
                <Text style={styles.question2Style}> Which bus stop are you going to?</Text>
                <KafoTextInput translinkAPICall={this.translink} changePage={(pagenum) => this.changeAppPage(pagenum)} />
            </View>

    );
  }
}

const styles = StyleSheet.create({

     modalStyle: {
        position: 'absolute',
        borderRadius: 15,
        bottom: 20,
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
        lineHeight: 80,
        backgroundColor:'#76ABAC'
        
        
      },
    
    
    question2Style:{
        position: 'absolute',
        textAlign: 'center',
        left: '15%',
        top: 95,
        fontSize: 16,
        color: 'grey',
        fontStyle: 'italic'
        
      }
    
    
});

export default KafoModal;
