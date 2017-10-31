import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import ArrivalPage from './comp/ArrivalPage';
import ResultPage from './comp/ResultPage';

export default class App extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            display: true
        }
        
        this.changeDisplay = this.changeDisplay.bind(this);
    }
    
    changeDisplay(show){
        this.setState({
            display:show 
        })
    }
   
    
  render() {
      
      var myDisplay = null;
        if(this.state.display == true){
            myDisplay = <ResultPage 
            changeDisplay={this.changeDisplay}/>;
        }else{
            myDisplay = <ArrivalPage
            changeDisplay={this.changeDisplay}/>;
        }
       
    return (
      <View style={rstyles.container}>     
         
        
        {myDisplay}
        
        
        
      </View>
    );
  }
}

const rstyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position:"relative"
  },
}); 
