import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';

export default class ArrivalModal extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            curTime:null,
            tillDepart: this.props.minsTillDepart, 
            seconds: Math.floor(this.props.minsTillDepart * 60),
            time: {}
        };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    }
    
secondsToTime(secs){

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "m": minutes,
      "s": seconds
    };
    return obj;
  }
    
componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString('en-US', {hour: 'numeric', minute:'numeric', hour12:true, second: 'numeric'})
      })
    },1000);
    
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }
    
 startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
    
countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }

render() {
    
    return (
    <View style={{flex:1, flexDirection: 'column'}}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerStyle}>Heading to {this.props.selectedShop.name}</Text>
        </View>
        <View style={{flexDirection:'row', flex: 1, justifyContent:'space-around'}}>
            <View style={{flex: 1}}>
                <Text style={styles.paragraph1Style}>Current Time{"\n"}
                <Text style={styles.paragraph2Style}>{this.state.curTime}</Text>
                </Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.paragraph1Style}>Until Your Bus Arrives{"\n"}
                <Text style={styles.paragraph2Style}>{this.state.time.m}:{this.state.time.s}</Text>
                </Text>
            </View>
        </View>
        <View style={{flexDirection:'column', flex:1, alignItems: 'center', justifyContent: 'center'}}>
        {
            <Image 
              source={require('./img/bus-tracker-placeholder.png')} 
                style={{alignSelf: 'center', flex: 1, width: '50%', height: '50%'}}
            />
        }
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
     
     headerStyle:{
        textAlign: 'center',
        padding:20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f4efe3',
        backgroundColor:'#6fa7a8',
        //overflow: 'hidden',
        //borderTopLeftRadius: 15, 
        //borderTopRightRadius: 15,
      },
    
    paragraph1Style:{
        textAlign: 'left',
        padding:5,
        fontSize: 20,
        color: '#303C45'
    },
    
    paragraph2Style:{
        padding:5,
        fontSize: 15,
        color: '#303C45',
      },
    
     headerContainer:{
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        overflow: 'hidden'
    }
});