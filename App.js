import React, {useState} from "react";


import NavigationContainer from "./NavigationContainer";
import * as firebase from "@react-native-firebase/app";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';



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
          (
          <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationContainer />
          </ApplicationProvider>
          )
      );
    } else {
      return (
        <ApplicationProvider {...eva} theme={eva.light}>
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
        </ApplicationProvider>
      );
    }
  }
}













