import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';

export default class ArrivalModal extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            curTime:null,
            tillDepart: this.props.minsTillDepart
        };
    }
    
componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString('en-US', {hour: 'numeric', minute:'numeric', hour12:true, second: 'numeric'})
      })
    },1000)
  }
    

render() {
    
    return (
    <View style={{flex:3, flexDirection: 'column'}}>
        <View style={styles.headerContainer}>
        <Text style={styles.headerStyle}>Heading to {this.props.selectedShop.name}</Text>
        </View>
        <View style={{flexDirection:'row', flex: 1}}>
            <View>
                <Text style={styles.paragraph1Style}>Current Time{"\n"}
                <Text style={styles.paragraph2Style}>{this.state.curTime}</Text>
                </Text>
            </View>
            <View>
                <Text style={styles.paragraph1Style}>Until Your Bus Arrives{"\n"}
                <Text style={styles.paragraph2Style}>{this.state.tillDepart} minutes</Text>
                </Text>
            </View>
        </View>
        <View style={{flexDirection:'column', flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Image 
                source={require('./img/bus-tracker-placeholder.png')} 
                style={{width: '100%', height: '100%', alignSelf: 'center'}}
            />
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
     
     headerStyle:{
        textAlign: 'center',
        padding:20,
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
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
        fontSize: 20,
        color: '#303C45'
    },
    
    paragraph2Style:{
        flex: 1,
        borderRadius: 0,
        padding:20,
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