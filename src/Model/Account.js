import {IN_STOCK} from './Constants/ProductConstant';
import firebase from "@react-native-firebase/app";

export class Account{
    productCountSold;
    userCountReviews;
    userCategories;

    
    
    constructor(userId){
        this.userId = userId;
        this.ref =  "users/" + userId + "/userinfo" ;

        
    }
    

    getUserCategories(){

    }
    setUserCategories(){}

    updateDbUserCategory(data){
        this.category = data;
        return new Promise((resolve,reject)=>{

            if (data.length >= 3){
                var path = this.ref + "/categories";
                resolve(firebase.database().ref(path).set(data))
            }else{
                reject("Choose at least 3 categories")
            }
        })
      
    }

    setDbUserCredentials(data){

       
        return new Promise((resolve,reject)=>{

            if (data.hasOwnProperty("username")
            &&data.hasOwnProperty("bio")){
                var path = this.ref + "/properties/userCredentials";
                resolve(firebase.database().ref(path).set(data))
            }else{
                reject("Enter the valid User Credentials")
            }
        })
      
    }

    getUserCategories(){
        return this.category;
    }

}