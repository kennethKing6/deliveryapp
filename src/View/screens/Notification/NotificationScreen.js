import React from 'react';
import { Text, View,TouchableOpacity, ImageBackground,Dimensions } from 'react-native';
import { Card } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height} = Dimensions.get("window");

const NotificationScreen = (props) => {


     

     async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      }
  return (
    <ImageBackground style={{flex:1}}source={require("../../../assets/images/deliveryLocation.jpg")}>

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <View style={{height:"85%"}}>
     <Card       style={{width: (90/100) * width,height:"30%",marginTop:(height * (10/100))}}>
        <Text style={{fontWeight:"bold"}}>We require you to accept the notification</Text>
      </Card>
    </View>
     
      <TouchableOpacity 
            onPress={()=> {
                requestUserPermission({
          alert:true,
          announcement:true,
          badge:true,
          sound:true,
          provisional: true,
        }).then(()=>{
          console.log("User accepted to receive notifications")
          props.navigation.navigate("SelectCategories")
        }).catch(()=>{
          console.log("User refused to receive notifications")
          props.navigation.navigate("SelectCategories")
        })
  
  }}
            style = {{width:'90%',height:60,borderRadius:30, backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'center',marginTop:20}}>
            <Text style = {{alignSelf:'center', fontSize:25, fontWeight:'500' , color:'white'}}>Continue</Text>
        </TouchableOpacity>    
       
    </View>
    </ImageBackground>
  );
}

export default NotificationScreen;