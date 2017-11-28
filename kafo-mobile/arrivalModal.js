import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default class ArrivalModal extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            curTime:null,
            tillDepart: null,
        };
    }
    
    componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString('en-US',
                                            {hour: 'numeric', minute:'numeric', hour12:true})
      })
    },1000)
    
    this.setState({
        tillDepart:this.props.minsTillDepart
    });
  }
    
render() {
    return (
    <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
        <Text style={styles.question1Style}>Heading to {this.props.selectedShop.name}</Text>
        </View>
        <Text style={styles.paragraph1Style}> Current Time: {this.state.curTime}</Text>
        <Text style={styles.paragraph2Style}> Until your bus arrives: {"\n"}{this.state.tillDepart} minutes</Text>
        
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
     
    question1Style:{
        flex: 1,
        borderRadius: 0,
        textAlign: 'center',
        padding:20,
        width: '100%',
        fontSize: 15,
        color: '#f4efe3',
        backgroundColor:'#462f23',
        overflow: 'hidden',
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
        
      },
    paragraph1Style:{
        flex: 1,
        borderRadius: 0,
        textAlign: 'left',
        padding:20,
        width: '100%',
        fontSize: 15,
        color: '#303C45'
    },
    paragraph2Style:{
        flex: 1,
        borderRadius: 0,
        textAlign: 'right',
        padding:20,
        //marginTop:-100,
        width: '100%',
        fontSize: 15,
        color: '#303C45',
      },
    
     headerContainer:{
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        overflow: 'hidden'
    }
});