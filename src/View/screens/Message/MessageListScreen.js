import React, { useState, useCallback, useEffect } from 'react';
import {
    StyleSheet, 
    View,
    ScrollView,
    StatusBar,
    Button, 
    ImageBackground,
    SafeAreaView,
    Text,
    Dimensions,
    FlatList,
    List,
    Image,
    TouchableOpacity
} from 'react-native';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';



import UserMessageProfile from './UserMessageProfile';



export default function MessageListScreen(props) {

  
  function getUserProperties(){
    return userPropertiesRef.once("value").then((datasnapshot)=>{
      setDatasnapshot(datasnapshot)
    }).then((failure)=>{
  
    }).catch()
  
  }

  
   
  
        
        return (


          <View style = {styles.container}>
          <SafeAreaView>
            <View style = {{width:'90%',alignSelf:'center'}}>
                <Text style = {{fontSize:40,fontWeight:'900',marginTop:30,marginBottom:20}}>Your messages</Text>
            </View>

          </SafeAreaView>
           
           

           <FlatList
             data = {UserMessageProfile}
             numColumns = {2}
             keyExtractor={(item, index) => item.id}
             renderItem={({item, index}) => {
             
                           
              return(
                <View style = {{alignItems:'center',alignItems:'center',flexDirection:'column', width:'50%'}}>

              
                  <TouchableOpacity onPress = {() => {props.navigation.navigate("ChatScreen",{correspondence:item.correspondence})}}>
                  <ImageBackground 
                  source = {item.src}
                  resizeMode = {'cover'}
                  style = {{width:130,height:130,borderRadius:130,overflow:'hidden'}}/>
                  </TouchableOpacity>

                  <View style = {{bottom:20,alignItems:'center',alignSelf:'center'}}>
                    <Text style = {{fontSize:22,padding:6,borderRadius:17,overflow:'hidden',backgroundColor:'white',fontWeight:'700'}}>{item.name}</Text>

                  </View>

                  </View>
               );
             }
             }
           />

          

          </View>
    );
  
}

const styles = StyleSheet.create({
  
  container: {
    flex:1,
      width: '100%',
      alignSelf:'center'
  },
 
});