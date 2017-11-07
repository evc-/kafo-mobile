import React, { Component } from 'react';
import { Modal, Dimensions, AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import KafoHeader from './kafo-header';

class KafoModal extends Component {
    constructor(props){
        super(props);
        
        this.state={
     
        };
        
    }
    
  render() {
            
    return (
        <View style={styles.viewStyle1}>

            <View style={styles.modalStyle}>
                <KafoHeader headerText={this.props.headerText} />
                {this.props.children}
            </View>

        </View>
    );
  }
}


const styles = StyleSheet.create({
    
    viewStyle1: {
        flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
    },
    
    
     modalStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '90%', 
        height: '25%',
         position: 'absolute',
         bottom: 0, 
        backgroundColor: 'blue'
      }

});

export default KafoModal;
