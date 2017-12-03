import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import KafoHeader from './kafo-header';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class ArrivalModal extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            secondsRemaining: 0
        }
        
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.endCountdown = this.endCountdown.bind(this);
        
    }
    

componentDidMount() {
    this.startTimer();
    this.props.increaseMaxState(4);
  }
    
startTimer() {
    if (this.state.secondsRemaining == 0) {
        var initalSeconds= this.props.minsTillDepart *60
        this.setState({secondsRemaining: initalSeconds})
        console.log(this.state.secondsRemaining);
        this.countDown();
    }
  }
    
countDown(){
    var interval = setInterval(()=>{ 
        var lessSeconds = this.state.secondsRemaining -1;
        this.setState({
            secondsRemaining: lessSeconds,
            interval: interval
       })
        console.log(Math.round(this.state.secondsRemaining/(this.props.minsTillDepart *60)*100));
        console.log(this.state.secondsRemaining);
    }, 1000);

}
     
endCountdown(){
    clearInterval(this.timer);
    this.props.changeModal(4);
}

componentWillUnmount(){
     clearInterval(this.state.interval);
}
    
    
render() {
    return (
    <View style={{flex:1, flexDirection: 'column'}}>
        <View>
            <KafoHeader innerText={"Heading to " + this.props.selectedShop.name}/>
        </View>
        <View style={{flexDirection:'row', flex: 1, justifyContent:'space-around'}}>
            <View style={{flex: 1}}>
                <Text style={styles.paragraph1Style}>Trip Breakdown{"\n"}</Text>
                <Text style={styles.paragraph2Style}>Walk to Shop: {this.props.selectedShop.toShop} minutes</Text>
                <Text style={styles.paragraph2Style}>Time for Coffee: {this.props.selectedShop.orderTime} minutes</Text>
                <Text style={styles.paragraph2Style}>Walk to Stop: {this.props.selectedShop.toStop} minutes</Text>
            </View>
        
             <View style={{flex: 1}}>
                <Text style={styles.paragraph1Style}>Minutes Until Bus Arrives{"\n"}</Text>
                <AnimatedCircularProgress
                  size={120}
                  width={15}
                  fill={Math.round((this.props.minsTillDepart *60 - this.state.secondsRemaining)/(this.props.minsTillDepart *60)*100)}
                  tintColor='#42565E'
                  backgroundColor="EEEEEE">
                 </AnimatedCircularProgress>
                <Text style={styles.paragraph2Style}>Bus arrives in {this.props.minsTillDepart} minutes</Text>
            </View>
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
    
    paragraph1Style:{
        textAlign: 'left',
        paddingLeft:25,
        fontSize: 16,
        color: '#303C45'
    },
    
    paragraph2Style:{
        paddingLeft:25,
        fontSize: 12,
        color: '#303C45',
      },
    
     rateStyle:{
        padding:10,
        margin: 15,
        borderRadius: 8,
        backgroundColor:'#6fa7a8',
    }
    
});