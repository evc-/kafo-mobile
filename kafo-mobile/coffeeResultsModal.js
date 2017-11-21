import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default class CoffeeResultsModal extends React.Component {
    constructor(props){
        super(props);
        this.state={
            coffeeShops:[]
        }
       
        this.startTimer = this.startTimer.bind(this);
    }
    componentWillMount(){
            this.setState({
               coffeeShops:[
                   {
                       name:'Tim Hortons',
                       status:'Good',
                       journeyTime:'5 min',
                       buffer:'3 min',
                       coords:{
                           lat:'49.250338',
                           long:'-123.001602'
                       }
                   },
                   {
                       name:'The Rix',
                       status:'Good',
                       coords:{
                           lat:'49.251237',
                           long:'-123.000622'
                       }
                   },
                {
                       name:'Tim Hortons Express',
                       status:'Too far',
                       coords:{
                           lat:'49.254136',
                           long:'-123.000956'
                       }
                   },
               ] 
            });
    }
    startTimer(){
        this.props.changeModal(3);
    }

render() {
    var shopInfo = this.state.coffeeShops.map(function callback(obj, index) {
        return(
            <View key={index}>
                <Text>{obj.name}</Text>
                <View 
                    style={styles.goBtnStyle}
                >
                    <TouchableOpacity
                    onPress={() => this.startTimer()}
                    >
                        <Text style={styles.goBtnText}
                        >Go</Text>
                    </TouchableOpacity>  
                </View>
            </View>
                    );
                }, this);
    
    return (
       
        <View style={{flex: 1}} >
                  <Text style={styles.question1Style}>Here are the shops!</Text>
        <ScrollView>
              {shopInfo}
        </ScrollView>
        </View>
    
    )
  }
}
const styles = StyleSheet.create({
    
    question1Style:{
        flex: 1,
        textAlign: 'center',
        padding:10,
        width: '100%',
        fontSize: 15,
        color: 'white',
        backgroundColor:'#76ABAC',
      },
    paragraph1Style:{
        flex: 1,
        textAlign: 'center',
        width: '100%',
        padding: 15,
        fontSize: 14,
        color: 'black'
    },
    question2Style:{
        flex: 1,
        textAlign: 'center',
        padding:25,
        width: '100%',
        fontSize: 15,
        color: 'white',
        backgroundColor: '#303C45'
      },
    goBtnStyle:{
        backgroundColor: '#303C45',
        borderRadius: 20,
        width:"8%",
    },
    goBtnText:{
        fontSize: 15,
        color: 'white',
    }
});