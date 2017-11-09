import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableHighlight, View } from 'react-native';

class ModalTest extends Component {

  state = {
    modalVisible: true,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
        
        <View>
        
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {alert("Modal has been closed.")}}
              >
                  
              <View style={styles.modalStyle}>
                <Text>Hello World!</Text>

                <TouchableHighlight onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>

              </View>

            </Modal>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(true)
            }}>
              <Text>Show Modal</Text>
            </TouchableHighlight>

        </View>

    ); 
  }
}

const styles = StyleSheet.create({
    
    viewStyle1: {
        height: '50%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
     modalStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%', 
        height: '25%',
        backgroundColor: 'blue',
        position: 'absolute', 
        bottom: 0
      }

});

export default ModalTest;

