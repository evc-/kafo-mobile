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
                <KafoIcon/>
                <KafoTextInput translinkAPICall={this.translink} changePage={(pagenum) => this.changeAppPage(pagenum)} />
            </View>
    );
  }
}

const styles = StyleSheet.create({
     modalStyle: {
        flex: 1,
        backgroundColor: 'blue'
      }
});

export default KafoModal;
