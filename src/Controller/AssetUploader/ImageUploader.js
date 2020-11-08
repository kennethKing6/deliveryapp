import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firebase from "@react-native-firebase/app";



export  class ImageUploader{
    constructor(userId){
        this.userId = userId;
    }
    async getCameraPermission(){

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

       uploadFile(imagePickerResponse,remoteFolderName="My products",
        imageName = this.getImageName(imagePickerResponse)) {
        const firebaseStorage = firebase.storage();
        const result = new Promise((resolve,reject)=>{

            if (imagePickerResponse !== null){
              const imagePath = this.getImagePath(imagePickerResponse);
             resolve(firebaseStorage.ref(this.userId)
             .child(remoteFolderName)
             .child(imageName)
             .putFile(imagePath));
            }else{
              reject(null)
            } 
          
      
        })
       
        return result;
      
      };

      //Returns the image path using image picker library
 getImagePath(ImagePickerResponse){
    return Platform.OS=== "android" ?ImagePickerResponse.path: ImagePickerResponse.uri;
  }
  
  //Gets the correct image name using the image picker
   getImageName(response){
    var imageName = null;
    if(Platform.OS === "android"){
      imageName = response.fileName;
    }else{
      var tempPath = response.uri;
      var image = tempPath.split("/");
      imageName = image[image.length - 1];
    }
    return imageName;
  }
  
}