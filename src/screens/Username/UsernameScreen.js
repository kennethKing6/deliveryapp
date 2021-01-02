import React,{useState,useEffect} from 'react';
import { Text, View,TouchableOpacity,ImageBackground,Dimensions } from 'react-native';
import { Input } from '@ui-kitten/components';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../components/CustomTextInput';
const {width,height} = Dimensions.get("window");

const UsernameScreen = (props) => {
    const [username,setUsername] = useState(null);

   
     const usernames = firebase.database().ref("usernames");
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

    <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center",backgroundColor:'white' }}>
      <View style = {{width:'90%'}}>

      <Text style = {{fontSize:40, color:'black',fontWeight:'900'}}>Finishing up with{"\n"}your account</Text>
      <CustomTextInput
      style = {{fontWeight:'900',fontSize:30,borderRadius:100,color:'#00a3ff'}}
      placeholder='@ username'
      placeholderTextColor = {'lightgrey'}
      value={username}
      onChangeText={nextValue => setUsername(nextValue)}
      
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
            style = {{width:'90%',height:60,borderRadius:30, backgroundColor:'#00a3ff',justifyContent:'center',alignSelf:'center',marginTop:20,
            shadowColor: "#222222",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 7,
                                    }}>
            <Text style = {{alignSelf:'center', fontSize:25, fontWeight:'500' , color:'white'}}>Continue</Text>
        </TouchableOpacity>        
    </View>
  );
}

export default UsernameScreen;