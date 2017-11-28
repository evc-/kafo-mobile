import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity } from 'react-native';

export default class KafoButton extends React.Component {
    
    constructor(props) {
    super(props);    
        
            this.selectRoute = this.selectRoute.bind(this);
  } 

    selectRoute(){   
            this.props.selectedBus(this.props.busIndex);
            this.props.getCoffeeShops();
            this.props.changeModal(2);
        }

  render() {
      
      if (this.props.buttonColor){
           var style = styles.touchableStyle1;
      } else {
          var style = styles.touchableStyle2;
      }
      
    return (

        <TouchableOpacity style={style} onPress={() => this.selectRoute()}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <View style={{backgroundColor: this.props.buttonColor?'#6fa7a8':'#42565E', alignSelf:'flex-start', height: '100%', paddingLeft: 10, paddingRight: 10, justifyContent: 'center'}}>
                        <Image 
                            source={require('./img/front-bus-icon-white.png')} 
                            style={{width: 10, height: 10, alignSelf:'flex-start'}}
                        />
                    </View>
                    <View style={{height: '100%'}}>
                        <Text style={{fontSize: 28, color: '#42565E', textAlign: 'left', fontWeight: 'bold', paddingLeft: 10}}>{this.props.routeNumber}</Text>
                        <Text style={{fontSize: 15, color: '#42565E', textAlign: 'left', fontWeight: 'bold', paddingLeft: 10}}>{this.props.routeName}{"\n"}</Text>
                        <Text style={{fontSize: 15, color: '#42565E', textAlign: 'left', paddingLeft: 10, paddingBottom: 5}}>Departs in {this.props.minsTillDepart} minutes</Text>
                    </View>
                </View>
                <View>
                    <View style={{alignSelf:'flex-end', height: '100%', justifyContent: 'center'}}>
                        <Image 
                            source={require('./img/arrow-01.png')} 
                            style={{width: 40, height: 40, alignSelf: 'flex-end'}}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
    );
  }
}

const styles = StyleSheet.create({
    
     touchableStyle1: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
    },
    
    touchableStyle2: {
        flex: 1,
        width: '100%',
        backgroundColor: '#EEEEEE',
        justifyContent: 'center',

    }
    
});
        


