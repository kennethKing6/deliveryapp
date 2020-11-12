import React, {Component} from 'react';
import {
    StyleSheet, 
    View,
    ScrollView,
    StatusBar,
    useState,
    Button, 
    ImageBackground,
    SafeAreaView,
    Text,
    Dimensions,
    FlatList,
    List,
    Image,
    TouchableOpacity
} from 'react-native';
import ChatScreen from './ChatScreen';




export default class MessageListScreen extends Component {
    
   
    render() { 
        
        return (

            <TouchableOpacity onPress = {() => {navigation.navigate("ChatScreen")}}>
                <Text style = {{fontSize:30}}>Kenneth</Text>
            </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex:1,
      width: '100%',
      alignSelf:'center'
  },
 
});