import {IN_STOCK} from './Constants/ProductConstant';
import firebase from "@react-native-firebase/app";

export class Account{
    constructor(userId){
        this.userOwnerRef = userId;
        this.ref =  "users/" + this.userOwnerRef + "/user" ;

        
    }
    initUserCredentials(firstname,lastname,username,location){
        var path =  "users/" + this.userOwnerRef + "/user/credentials" ;
        this.uid = uid;
    }
    setUserCredentials(userCredentialObj){
        var path =  "users/" + this.userOwnerRef + "/user/credentials" ;

    }
    getUserId(){
        if(this.uid === null)
            return this.uid;
    }
}