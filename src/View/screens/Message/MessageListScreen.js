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
import messaging from '@react-native-firebase/messaging'
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database'



export default function MessageListScreen(props) {
  const userId = firebase.auth().currentUser.uid;
  const ref = firebase.database().ref("users/" + userId); 
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
   
  requestUserPermission().then(()=>{
    return messaging().getToken();
  }).then((token)=>{
  console.log("FCMToken",token)
  return ref.child("user_properties").update({FCMToken: token})
  }).then().catch((err)=>{
  console.log('error',err)
  });
        
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