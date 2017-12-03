import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import KafoHeader from './kafo-header';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class ArrivalModal extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            tillDepart: this.props.minsTillDepart, 
            seconds: Math.floor(this.props.minsTillDepart * 60),
            time: {}
        };
        
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.endCountdown = this.endCountdown.bind(this);
        
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
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar});
    this.startTimer();
    this.props.increaseMaxState(4);
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
      this.props.changeModal(4);
    }
  }
    
endCountdown(){
    clearInterval(this.timer);
    this.props.changeModal(4);
    //this.props.increaseMaxState(4);
}

componentWillUnmount(){
     clearInterval(this.timer);
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
                <AnimatedCircularProgress
                  size={120}
                  width={15}
                  fill={this.state.seconds/(this.props.minsTillDepart*60)}
                  tintColor='#42565E'
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor="EEEEEE"

                  />

                <Text style={styles.paragraph2Style}>Bus arrives in {this.props.minsTillDepart} minutes</Text>

            </View>
        
        {
//            <View style={{flex: 1, backgroundColor: '#F7F7F7'}}>
//                <Text style={styles.paragraph1Style}>Until Your Bus Arrives{"\n"}</Text>
//                <Text style={styles.paragraph2Style}>{this.state.time.m}:{this.state.time.s}</Text>
//                <Image 
//                    source={require('./img/live-update-03.png')}
//                    style={{width:15, height: 15}}
//                />
//            </View>
        }
        </View>
        {
//        <View style={{flexDirection:'column', flex:1, alignItems: 'center', justifyContent: 'center'}}>
//         <TouchableOpacity onPress={() => {this.endCountdown()}} style={styles.rateStyle}>
//                <Text style={{textAlign: 'center', color: '#f4efe3',fontSize: 12, fontWeight: 'bold'}}>Skip Timer</Text>
//        </TouchableOpacity> 
//        </View>
        }
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