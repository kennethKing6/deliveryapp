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




export default function MessageListScreen(props) {
    
   
    
        
        return (

           <View>
              <TouchableOpacity onPress = {() => {props.navigation.navigate("ChatScreen",{correspondence:"sOf5W0LrhXdvNGJbo9raJS8F3if1"})}}>
                <Text style = {{fontSize:30}}>Kenneth</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => {props.navigation.navigate("ChatScreen",{correspondence:"QpcV2XFV8ZR3v1dOrS71aeGTxtv2"})}}>
                <Text style = {{fontSize:30}}>Shahbek</Text>
            </TouchableOpacity>
           </View>
    );
  
}

const styles = StyleSheet.create({
  
  container: {
    flex:1,
      width: '100%',
      alignSelf:'center'
  },
 
});