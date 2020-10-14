import React,{useState} from 'react';
import { StyleSheet, Dimensions, Image, Platform,TouchableOpacity,View,Text,TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//  import DropDown from 'react-native-modal-dropdown';
import Category from '../images';
// import AwesomeButton from "react-native-really-awesome-button";
import styles from './styles';
import GetLocation from 'react-native-get-location';
import firebase from "@react-native-firebase/app";
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import analytics from '@react-native-firebase/analytics';
import database from '@react-native-firebase/database';
import {Product } from '../model/Product'
import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';


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

//get the dimension
const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

var photoImageRef = null;

//Get the categories user can select
var categories=[];
Category.forEach(element => {
  categories.push(element.name);
});

function  ProductDetails(){

  const[category,setSelectedCategory] = useState("");
  const[productName,setProductName] = useState("");

  const[productDesc,setProductDescription] = useState("");
  const[productPrice,setProductPrice] = useState(0);
  const [productLocation,setProductLocation] = useState([]);

  //Image Picker response
  const [imagePickerResponse, setImagePickerResponse] = useState(null);



//Get user Id
const userId = firebase.auth().currentUser.uid;

if(userId == undefined || userId == null){
  props.navigation.navigate("SignIn");
}

  function uploadFileMetadata(metadata){
   
    
    var product = new Product(userId);
    product.initProductRef().then(()=>{
    return product.uploadProductFileMeta(metadata);
    }).then(()=>{
      //Find the selected product code

      var CategoryObject = Category.find(element=>{
        element.name == category;
      })
      return product.initProductProperties(CategoryObject.category,productName,productDesc,productLocation,productPrice)
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
function uploadFile(imagePickerResponse) {
  const firebaseStorage = storage();
  const result = new Promise((resolve,reject)=>{

    
      if (imagePickerResponse !== null){
        const imageName = getImageName(imagePickerResponse);
        console.log(imageName)

        var imagePath =  getImagePath(imagePickerResponse);
     
       resolve(firebaseStorage.ref(userId)
       .child("My products")
       .child(imageName)
       .putFile(imagePath));
      }else{
        reject("Cant't upload")
      } 
    

  })
 
  return result;

};

//Returns the image path using image picker library
function getImagePath(ImagePickerResponse){
  return Platform.OS=== "android" ?ImagePickerResponse.path: ImagePickerResponse.uri;
}

//Gets the correct image name using the image picker
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

//Get user location
  async function getUserLocation(){
    const location = await GetLocation.getCurrentPosition({
                                                      enableHighAccuracy: true,
                                                      timeout: 15000,
                                                  });
    setProductLocation([location.latitude,location.longitude])

   
  }
  getUserLocation().then().catch();

  return (
   
      <View style={screenStyle.container}>
      
        <View style={screenStyle.imageContainer}>
          <Image style={screenStyle.imageContainer} ref={ref=>{
            photoImageRef = ref;
          }} source={require('../../assets/images/cards/card1.jpg')} resizeMode='contain'
            onPress={async ()=>{

              const cameraPermission = await getCameraPermission();
                if(RESULTS.GRANTED == cameraPermission){
                  ImagePicker.showImagePicker({
                        noData: true,
                        quality:0.1,
                      }, response => {
                        if(response.didCancel || response.error){
                          alert("Failed to pick an image")
                        }else{
                          var path = getImagePath(response);
                          photoImageRef.source = path;
                          setImagePickerResponse(response);
                        }
                      })
                }else{
                  alert("Error: Loading image failed, try again later");
                }
             
                  
            }}
          />
        </View>
        <View style={screenStyle.productContent}>
           
                {/* <TouchableOpacity>
                <DropDown options={categories} onSelect={(idx,value)=>{setSelectedCategory(value)}}></DropDown>
                </TouchableOpacity> */}

                <TextInput
                    multiline={false}
                    onChangeText={(text) => setProductName({text})}
                    value={productName}/>

                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => setProductDescription({text})}
                    value={productDesc}/>


              <TouchableOpacity style={styles.itemContainer}>
                <View style={styles.mainContainer}>
                  <View style={styles.rowContainer}>
                    {/* <Image style={styles.itemIcon} source={{ uri: item.icon }} /> */}
                    <View style={styles.itemTxtContainer}>
                      <Text style={styles.itemTitle}>Price</Text>
                      <TextInput
                          multiline={false}
                          onChangeText={(text) =>{
                            try{
                              const price = parseInt(text);
                              setProductPrice(price);

                            }catch(e){
                              alert("Enter a number price");
                            }
                          }}
                          value={productName}/>
                    </View>
                  </View>
                  <Image style={styles.rightArrow} source={require('../../assets/icons/rightArrow.png')} />
                </View>
              </TouchableOpacity>

              
        </View>
        <TouchableOpacity>
        <Text style={screenStyle.uploadButton}
        onPress={()=>{
               
          if(imagePickerResponse !== null){
            uploadFile(imagePickerResponse).then((uploadTask)=>{
            uploadFileMetadata(uploadTask.metadata);
          
            
                  alert("Success");
              }).catch((err)=>{
                  alert(err)
                  console.log("we are here\n");
                  console.log(err)
                  throw err;
                  
                });
          }else{
            alert("Please select a product to upload")
          }
        }}
        >Upload</Text>
        </TouchableOpacity>
      </View>
  );
}


const screenStyle = StyleSheet.create({
    container:{
      flex:1
    },
    imageContainer:{
      flex:2,
    },
    image:{
      width:20
    },
    productContent:{
      flex:3
    },
    uploadButton:{
      backgroundColor:"#F8002E",
      textColor:"#FAFAFA",
      alignSelf:"center"
    }
  });
  
export default ProductDetails;
