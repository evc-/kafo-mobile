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
                <KafoTextInput translinkAPICall={this.translink} changePage={(pagenum) => this.changeAppPage(pagenum)} />
            </View>

    );
  }
}

const styles = StyleSheet.create({

     modalStyle: {
        position: 'absolute',
        bottom: 20,
        zIndex: 800,
        width: '90%',
        backgroundColor:'rgba(255, 255, 255, 1.0)',

      }
});

export default KafoModal;
