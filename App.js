import React, {useState} from "react";


import NavigationContainer from "./NavigationContainer";
import * as firebase from "@react-native-firebase/app";



import {
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import * as Font from 'expo-font';

export default class App extends React.Component {
  state = {
    assetsLoaded: false,
  };

  async componentDidMount () {
  
    this.setState ({assetsLoaded: true});

   


  
  }

  render () {
    const {assetsLoaded} = this.state;

    if (assetsLoaded) {
      return (
          (<NavigationContainer />)
      );
    } else {
      return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
}













