import React,{useState} from "react";





import { NavigationContainer } from "@react-navigation/native";

import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';
import {AppSignedInNavigator} from './AppSignedInNavigator';
import {AppSignedOutNavigations} from './AppSignedOutNavigations';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB5nb54BH2M3yKurqTRvR3C-kN0x5CEoO0",
    authDomain: "deliveryapp-bd7d8.firebaseapp.com",
    databaseURL: "https://deliveryapp-bd7d8.firebaseio.com",
    projectId: "deliveryapp-bd7d8",
    storageBucket: "deliveryapp-bd7d8.appspot.com",
    messagingSenderId: "257715845585",
    appId: "1:257715845585:web:d30eb92a5b8fa30a9f48f0",
    measurementId: "G-JNM1GWZ4B1"
  };
  if (!firebase.apps.length) {
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
  }


function GetScreens(){
    const [isSignedIn,setIsSignedIn] = useState(false);
    
  
         auth().onAuthStateChanged((user)=>{
            console.log("user",user)
            if(user === null){
              setIsSignedIn(false);
            }else{
                setIsSignedIn(true);

            }
          })

    
    
    
    
    
     return( isSignedIn? <AppSignedInNavigator/>:  <AppSignedOutNavigations/>)
    }

export const AppNavigationContainer = () => {
  
        
            return(
                <NavigationContainer>
                    <GetScreens/>
                </NavigationContainer>  
              
            )
      
        }
    