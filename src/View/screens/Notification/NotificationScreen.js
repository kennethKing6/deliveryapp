import React from 'react';
import { Text, View,TouchableOpacity, ImageBackground,Dimensions,Image } from 'react-native';
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

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:'white' }}>
     <View>
     <Image
        style = {{width:150,height:150,alignSelf:'center'}}
        source = {require('../../../assets/images/megaphone.png')}
      />
     <Text style = {{fontSize:30,fontWeight:'900'}}>Turn on notifications</Text>
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
            style = {{width:'90%',height:60,borderRadius:30, backgroundColor:'#00a3ff',justifyContent:'center',alignSelf:'center',marginTop:20,
            shadowColor: "#222222",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 7,
                                    }}>
            <Text style = {{alignSelf:'center', fontSize:25, fontWeight:'500' , color:'white'}}>Continue</Text>
        </TouchableOpacity>    
       
    </View>
  );
}

export default NotificationScreen;