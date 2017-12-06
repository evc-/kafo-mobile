import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import KafoHeader from './kafo-header';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class ArrivalModal extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            interval:0,
            secondsRemaining: 0,
            pingResp:[]
        }
        
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.endCountdown = this.endCountdown.bind(this);
    this.tsPing = this.tsPing.bind(this);
        
    }
    

componentDidMount() {
    this.startTimer();
    this.props.increaseMaxState(4);
    const minsTillDepartProp = this.props.minsTillDepart;
    this.setState({
        minsTillDepart:minsTillDepartProp
    });
    console.log("min to depart:"+this.props.minsTillDepart);
    console.log("index number using busIndex: "+this.props.busIndex);
  }
    
startTimer() {
    if (this.state.secondsRemaining == 0) {
        var initalSeconds= this.props.minsTillDepart *60
        this.setState({secondsRemaining: initalSeconds})
       // console.log("bus stop number" +this.props.selectedBusState.RouteNo);
        console.log("arrival modal selected bus stop"+ this.props.busStopNum);
        this.countDown();
        this.liveTrack();
        this.tsPing();
    }
  }
    
tsPing(){
            fetch("https://kafo-call.herokuapp.com/translink/livetracker/"+this.props.busStopNum+"/" + this.props.selectedBusState.RouteNo, {method:'GET', headers:{
          "Content-Type": "application/json"
          }})
    .then(response => response.json())
    .then((resp) => {
            console.log(resp);
            this.setState({
                pingResp:resp
            });
                //TO DO: connect this with the minsTillDepart
            console.log("expected countdown using busIndex is: "+resp[0].Schedules[this.props.busIndex].ExpectedCountdown);
            
            this.setState({
                minsTillDepart:resp[0].Schedules[this.props.busIndex].ExpectedCountdown
            });
    })
    .catch((error) => {
       // console.log(error);
    });
}

liveTrack(){
    var interval = setInterval(()=>{
        console.log("one minute");
        this.tsPing();
    }, 60000);
}
    
countDown(){
    var interval = setInterval(()=>{ 
        var lessSeconds = this.state.secondsRemaining -1;
        this.setState({
            secondsRemaining: lessSeconds,
            interval: interval
       })
        //console.log(Math.round(this.state.secondsRemaining/(this.props.minsTillDepart *60)*100));
        //console.log(this.state.secondsRemaining);
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
        <View style={{flexDirection:'row', flex: 1, justifyContent:'center'}}>
            <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
                <Text style={{flex: 1, width: '85%', fontSize: 18, color: '#303C45', textAlign: 'center', fontWeight: 'bold', paddingTop: 5}}>Trip Breakdown</Text>
                <Text style={styles.paragraph2Style}>Walk to Shop: {this.props.selectedShop.toShop} minutes</Text>
                <Text style={styles.paragraph2Style}>Time for Coffee: {this.props.selectedShop.orderTime} minutes</Text>
                <Text style={styles.paragraph2Style}>Walk to Stop: {this.props.selectedShop.toStop} minutes</Text>
            </View>
        
             <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{flex: 1, width: '85%', fontSize: 18, color: '#303C45', textAlign: 'center', fontWeight: 'bold', paddingTop: 5}}>Bus arrives in {this.state.minsTillDepart} minutes</Text>

                <AnimatedCircularProgress
                    style={{marginBottom: 10}}
                    size={100}
                    width={15}
                    fill= {Math.round((this.props.minsTillDepart *60 - this.state.secondsRemaining)/(this.props.minsTillDepart *60)*100)}
                    tintColor='#6fa7a8'
                    backgroundColor="EEEEEE">
                 </AnimatedCircularProgress>

            </View>
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
    
    paragraph2Style:{
        flex: 1,
        fontSize: 14,
        color: '#6fa7a8',
        paddingLeft: 15
      },
    paragraph3Style:{
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#6fa7a8'
    }
    
    
});