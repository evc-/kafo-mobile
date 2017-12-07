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
    //this.sortByExpectedCountdown = this.sortByExpectedCountdown.bind(this);
    this.chosenBus = null;
    this.lastLeaveTime = null; 
    }
    
componentDidMount() {
    this.startTimer();
    this.props.increaseMaxState(4);
    var minsTillDepartProp = this.props.minsTillDepart;
    var secondsRemaining = (this.props.minsTillDepart * 60);
    this.setState({
        minsTillDepart:minsTillDepartProp,
        secondsRemaining:secondsRemaining
    });
    this.chosenBus = this.props.busIndex;
    console.log("min to depart:"+this.props.minsTillDepart);
    console.log("index number using busIndex: "+this.props.busIndex);
    this.intervalSeconds = setInterval( ()=> this.countDown(), 1000);
    this.intervalMinutes = setInterval( ()=> this.tsPing(), 10000);
  }
    
startTimer() {
    if (this.state.secondsRemaining == 0) {
        var initalSeconds= this.props.minsTillDepart *60
        this.setState({secondsRemaining: initalSeconds})
       // console.log("bus stop number" +this.props.selectedBusState.RouteNo);
       // console.log("arrival modal selected bus stop"+ this.props.busStopNum);
    }
  }
    
//sortByExpectedCountdown(bus1, bus2){
//    return bus1.ExpectedCountdown - bus2.ExpectedCountdown;
//    console.log("whhhh");
//}
    

tsPing(){
        fetch("https://kafo-call.herokuapp.com/translink/livetracker/"+this.props.busStopNum+"/" + this.props.selectedBusState.RouteNo, {method:'GET', headers:{
          "Content-Type": "application/json"
          }})
    .then(response => response.json())
    .then((resp) => {
            console.log(resp);
            console.log("sort");
            resp[0].Schedules.sort((bus1, bus2)=> {return (bus1.ExpectedCountdown - bus2.ExpectedCountdown)});
            //console.log(resp);
            this.setState({
                pingResp:resp
            });
                if(this.lastLeaveTime !== null && this.lastLeaveTime != resp[0].Schedules[this.chosenBus].ExpectedLeaveTime){
                    this.chosenBus--;
                    console.log("index decreased");
                }

                this.lastLeaveTime = resp[0].Schedules[this.chosenBus].ExpectedLeaveTime;
                this.setState({
                    minsTillDepart:resp[0].Schedules[this.chosenBus].ExpectedCountdown
                });

                if(this.state.minsTillDepart === 0){
                    this.endCountDown();
                }
        }
    )
    .catch((error) => {
        console.log(error);
    });
}

setSeconds(){
    if (this.state.secondsRemaining == 0) {
        var initalSeconds= this.props.minsTillDepart *60
        this.setState({secondsRemaining: initalSeconds});
    }
        this.countDown();
}
    
countDown(){
    var lessSeconds = this.state.secondsRemaining -1;
        this.setState({
            secondsRemaining: lessSeconds,
            interval: this.intervalSeconds
       })
        //console.log(Math.round(this.state.secondsRemaining/(this.props.minsTillDepart *60)*100));
        //console.log(this.state.secondsRemaining);
}
     
endCountdown(){
    this.props.changeModal(4);
}

componentWillUnmount(){
    clearInterval(this.intervalMinutes);
    clearInterval(this.intervalSeconds);
    console.log("component unmounted!");
}
    
    
render() {

    return (
    <View style={{flex:1, flexDirection: 'column'}}>
        <View>
            <KafoHeader innerText={"Heading to " + this.props.selectedShop.name}/>
        </View>
        <View style={{flexDirection:'row', flex: 1, justifyContent:'center'}}>
            <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
                <Text style={{flex: 1, width: '85%', fontSize: 20, color: '#303C45', textAlign: 'center', fontWeight: 'bold', paddingTop: 5}}>Trip Breakdown</Text>
                <Text style={styles.paragraph2Style}>Walk to Shop: {this.props.selectedShop.toShop} minutes</Text>
                <Text style={styles.paragraph2Style}>Time for Coffee: {this.props.selectedShop.orderTime} minutes</Text>
                <Text style={styles.paragraph2Style}>Walk to Stop: {this.props.selectedShop.toStop} minutes</Text>
            </View>
        
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                 <Text style={{flex: 1, width: '85%', fontSize: 16, color: '#303C45', textAlign: 'center', fontWeight: 'bold', paddingTop: 5}}>Bus arrives in {this.state.minsTillDepart} minutes</Text>
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
        fontSize: 16,
        color: '#6fa7a8',
        paddingLeft: 15
      },
    paragraph3Style:{
        flex: 1,
        fontSize: 50,
        fontWeight: 'bold',
        top: '44%',
        left: '35%',
        position: 'absolute',
        color: '#6fa7a8'
    }
    
    
});