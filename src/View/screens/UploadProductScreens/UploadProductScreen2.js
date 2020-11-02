import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Image,Platform,NetInfo } from 'react-native';
import MaterialIconButton from "../../components/MaterialIconButton";
import firebase from "@react-native-firebase/app";
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';
import {Product } from '../model/Product'
import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Category from '../model/Constants/ProductConstant'




 
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
if(!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

 

firebase.analytics();






 





function UploadProductScreen(props) {

  const [imageURI, setImageURI] = useState(null);

//Get user Id
const userId = firebase.auth().currentUser.uid;

if(userId == undefined || userId == null){
  props.navigation.navigate("SignIn");
}

// function checkConnectivity () {
//   // For Android devices
//   if (Platform.OS === "android") {
//     NetInfo.isConnected.fetch().then(isConnected => {
//       if (isConnected) {
//         Alert.alert("You are online!");
//       } else {
//         Alert.alert("You are offline!");
//       }
//     });
//   } else {
//     // For iOS devices
//     NetInfo.isConnected.addEventListener(
//       "connectionChange",
//       this.handleFirstConnectivityChange
//     );
//   }
// };

// handleFirstConnectivityChange = isConnected => {
//   NetInfo.isConnected.removeEventListener(
//     "connectionChange",
//     this.handleFirstConnectivityChange
//   );

//   if (isConnected === false) {
//     Alert.alert("You are offline!");
//   } else {
//     Alert.alert("You are online!");
//   }
// };




  function uploadFileMetadata(metadata){
   
    
      var product = new Product(userId);
      product.initProductRef().then(()=>{
      return product.uploadProductFileMeta(metadata);
      }).then(()=>{
        return product.initProductProperties(Category.CARS,"BMW 123","This product is fresh from the store",{long:12.3,lat:-1.7839},10)
      }).then(()=>{
        return product.initProductRatings();
      }).then(()=>{
        product.addProductTag("machine");
        product.addProductTag("fast");
        product.addProductTag("tesla");

        return product.uploadProductQueryTag()
      }).catch(()=>{
        alert("Failed to upload file metadata");
      })
     
      

  }

 

  async function getCameraPermission(){
  
    return request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.CAMERA,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        ios: PERMISSIONS.IOS.CAMERA,
      }),
    );
  }
  function uploadFile() {

    
 
    const firebaseStorage = storage();
    const result = new Promise((resolve,reject)=>{
  
      ImagePicker.showImagePicker({
        noData: true,
        quality:0.3,
      }, response => {
        
        if (response.didCancel) {
          alert('Post canceled');
          reject("User Cancelled");
        } else if (response.error) {
          alert('An error occurred: ',   response.error);
          reject("Error occured with camera " + response.error);
        } else {
            const imageName = getImageName(response);
            console.log(imageName)

            var imagePath =  Platform.OS=== "android" ?response.path: response.uri;
         
           resolve(firebaseStorage.ref(userId)
           .child("My products")
           .child(imageName)
           .putFile(imagePath));
  
        }}
      );
  
    })
   
    return result;
  
  };


  function getImageName(response){
    var imageName = null;
    if(Platform.OS === "android"){
      imageName = response.fileName;


    }else{
      var tempPath = response.uri;
      var image = tempPath.split("/");
      imageName = image[image.length - 1];


    }
    console.log("the value " + imageName)
    return imageName;
  }

  return (
    <View style={styles.container}>
      <View style={styles.group}>

        <View style={styles.imageRow}>
          <Image
            source={require("../../../assets/images/makeup.jpg")}
            resizeMode="cover"
            style={styles.image}
          ></Image>
          <Image
            source={require("../../../assets/images/phone.jpg")}
            resizeMode="cover"
            style={styles.image}
          ></Image>
        </View>

      

        <View style={styles.imageRow}>
          <Image
            source={require("../../../assets/images/shoes.jpg")}
            resizeMode="cover"
            style={styles.image}
          ></Image>
          <Image
            source={require("../../../assets/images/t-shirt.jpg")}
            resizeMode="cover"
            style={styles.image}
          ></Image>
        </View>
        

        <View style={styles.imageRow}>
          <Image
            source={require("../../../assets/images/t-shirt.jpg")}
            resizeMode="cover"
            style={styles.image}
          ></Image>
          <Image
            source={require("../../../assets/images/t-shirt.jpg")}
            resizeMode="cover"
            style={styles.image}
          ></Image>
        </View>

        

      
        

        <View style={styles.rect}>
            <Text style={styles.loremIpsum}>Create your own store</Text>
         </View>

        
      </View>
      
      
      
      



      <MaterialIconButton
         onPress={() =>{

          getCameraPermission().then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          uploadFile().then((uploadTask)=>{
            uploadFileMetadata(uploadTask.metadata);
          
            
                  alert("Success");
              }).catch((err)=>{
                  alert(err)
                  console.log("we are here\n");
                  console.log(err)
                  throw err;
                  
                });
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch((err) => {
      console.log("The camera permission: " + err);
     throw err;
    })

        
               
         }
         }
        style={styles.materialButtonShare}
        iconName={"camera"}
      ></MaterialIconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  group: {
    paddingTop:"7%",
    height:"100%"
  
  },
  imageRow: {
    flex:1,
    flexDirection: "row",
  },
  rect: {
    position:"absolute",
    top:"50%",
    width: "80%",
    height: 90,
    backgroundColor: "rgba(33,33,33,1)",
    alignSelf: "center"
  },
  loremIpsum: {
    color: "rgba(255,246,246,1)",
    height: 31,
    width: "70%",
    fontSize: 22,
    alignSelf:"center",
    marginTop:"9%"
    
  },
  materialButtonShare: {
    height: 56,
    width: 56,
   position:"absolute",
   top:"90%",
   alignSelf:"center"
  },
  image:{
    width:"50%",
    height:"150%"
  }
});

export default UploadProductScreen;