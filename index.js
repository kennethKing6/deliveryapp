import { registerRootComponent } from 'expo';
import  firebase from "@react-native-firebase/app";
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';



import App from './App';

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


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent(appName,() => App);
