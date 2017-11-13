import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default class KafoArrival extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            curTime:null,
            tillDespart: "",
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
        tillDespart:this.props.minsTillDepart
    });
  }
    
render() {
    return (
    <View style={{flex: 1}}>
        <Text style={styles.question1Style}>Heading to Waves Coffee!</Text>
        
        <Text style={styles.paragraph1Style}> Current Time: {"\n"} {this.state.curTime}</Text>
        <Text style={styles.paragraph2Style}> Until bus arrives: {"\n"} {this.state.tillDespart}</Text>
        
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
        color: 'white',
        backgroundColor:'#76ABAC',
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
      }
});