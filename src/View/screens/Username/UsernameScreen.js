import React,{useState,useEffect} from 'react';
import { Text, View,TouchableOpacity,ImageBackground,Dimensions } from 'react-native';
import { Input } from '@ui-kitten/components';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height} = Dimensions.get("window");

const UsernameScreen = (props) => {
    const [username,setUsername] = useState(null);

   
     const usernames = firebase.database().ref("usernames");


     //Hooks
    //  useEffect(() => {

    //     const unsubscribe = props.navigation.addListener('focus', () => {
    //       if(datasnapshot === null)
    //           getUserProperties();
         
    //         //
    //         if(messages.length === 0){
    //           GetMessages();
    
    //         }
    
    //   });
    
      
    //     return unsubscribe;
    
    //   }, [messages])

      //Methods
      function getUsernames(){
        return new Promise((resolve,reject)=>{
            return usernames.child(username).once("value").then((datasnapshot)=>{
                if(datasnapshot.val() == null){
                    resolve(true)
                }else{
                    reject(datasnapshot);

                }
            }).catch((err)=>{
                console.log("unexpected",err)
            })
        })
      }
  return (
    <ImageBackground style={{flex:1}}source={require("../../../assets/images/deliveryLocation.jpg")}>

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{height:"85%"}}>

      <Text style = {{fontSize:30, color:'white',fontWeight:'900', marginTop:100}}>Please enter a username</Text>
      <Input
      placeholder='username'
      value={username}
      onChangeText={nextValue => setUsername(nextValue)}
      style={{width: (90/100) * width,height:50}}
    />
    </View> 
     
      <TouchableOpacity 
            onPress={()=>{
                if(username === null){
                    alert("Username is required")
                }else{
                   getUsernames().then(()=>{
                    return usernames.child(username).set(username);

                   }).then(()=>{
                    //     const pair = {};
                    //    pair[username] = username;
                    //    console.log("pair",pair)
                       return AsyncStorage.getItem('@user_properties').then((data)=>{
                     var result =  data != null ? JSON.parse(data) : null;
                     if(result != null){
                      result['username'] = username
                     }else{
                      result = {};
                      result['username'] = username
                     }
                     return result
                    }).then((savingObj)=>{
                      return AsyncStorage.setItem('@user_properties', JSON.stringify(savingObj))
                    }).then(()=>{
                        props.navigation.navigate("NotificationScreen")
                    }).catch(()=>{
                      alert("Failed to save your username, please try again later!")
                    })
                   }).catch((err)=>{
                        alert("Username already exists")
                        console.log("err",err)
                    }).catch((err)=>{
                        alert("Username already exists")
                        console.log("err",err)
                    })
             
                }
                }}
            style = {{width:'90%',height:60,borderRadius:30, backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'center',marginTop:20}}>
            <Text style = {{alignSelf:'center', fontSize:25, fontWeight:'500' , color:'white'}}>Continue</Text>
        </TouchableOpacity>        
    </View>
    </ImageBackground>
  );
}

export default UsernameScreen;