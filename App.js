import React, { useEffect } from "react";


import {AppNavigationContainer} from "./src/navigations";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import messaging from '@react-native-firebase/messaging'


// Register background handle
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
export default function App ({navigation}) {

  

 
  
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.chat_screen,{correspondance:remoteMessage.data.correspondance});
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          navigation.navigate(remoteMessage.data.chat_screen,{correspondance:remoteMessage.data.correspondance});
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      alert("You have a new message")
    });

    return unsubscribe;
  }, []);


  


  

   
      return (
          
          <ApplicationProvider {...eva} theme={eva.light}>
            <AppNavigationContainer />
          </ApplicationProvider>
          
      );
    
}













