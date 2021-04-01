import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import { Camera } from 'expo-camera';
import MaterialIconButton from "../../components/MaterialIconButton";
import * as firebase from "firebase/app";
import "firebase/storage";
import styles from './styles';
// import RNFS from "react-native-fs";
// import { base64StringToBlob } from 'blob-util';
// import RNFetchBlob from 'react-native-fetch-blob'
// import  { ImagePicker } from 'expo';


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




const reference = firebase.storage().ref("images/test.jpg");



 export default function CameraScreen() {


  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  //Variables
  var imageUri = null;
  var imageComponent = null;
  var camera = null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} 
       ref={ref => {
            camera = ref;
          }}
      >
          <View style={styles.menuIcons}>
            <View style={styles.menuItems}>
              <MaterialIconButton iconName={"camera-retake"} onPress={() => {setType(type === Camera.Constants.Type.back? Camera.Constants.Type.front : Camera.Constants.Type.back);}}/>
            </View>
            <View style={styles.menuItems}>
              <MaterialIconButton iconName={"camera"} onPress={async () =>{
                  if(camera){
                      let  photo = await camera.takePictureAsync({
                        quality:0,
                        exif:true
                      });

                      
                      fetch(photo.uri)
                        .then(function(resp){
                              return resp.blob();
                            }).then(function(blob){

                             return reference.put(blob)
                                 
                               
                              
                            }).then((task)=>{
                              task.on("state_changed", {
                          next(taskSnapshot) {
                            console.log(taskSnapshot.state);
                          },
                          error(error) {
                            console.error(error.message);
                          },
                          complete() {
                            console.log('Task complete');
                          }})

                            }).catch((err) =>{
                              console.log(err.message)
                            })
                     
                                          




                    
                  }
              
              }
              }/>
            </View>
            <View style={styles.menuItems}>
                <MaterialIconButton iconName={"upload"}/>
            </View>

            </View>
       </Camera>
     <Image style={"flex:0"} ref={(ref)=>imageComponent = ref}/>
    </View>
  );
}


