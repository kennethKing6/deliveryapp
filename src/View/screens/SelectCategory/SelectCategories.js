import React, {Component, useState} from 'react';
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
    Image
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Profiles from '../../../Model/Constants/CategoriesAppData';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Root, Popup } from 'popup-ui';
import {Account} from '../../../Model/Account';
import firebase from "@react-native-firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get("window");



export default function SelectCategories() {
  
  const [indexChecked,setIndexChecked] = useState('0')
	
	const numOfColumns = 3;

const formatData = (Profiles) => {
  const numberOfFullRows = Math.floor(Profiles.length/3);

  let numOfElementsInLastRow = Profiles.length-(numberOfFullRows*3);

  while(numOfElementsInLastRow!== 3 && numOfElementsInLastRow!==0){
    Profiles.push({key: 'blank-${numOfElementsInLastRow}', empty: true});
    numOfElementsInLastRow = numOfElementsInLastRow+1;
  }

  return Profiles;
}

const userSelectedCategories =[];

const handleUserSelection = (selectedValue) => {

  if (selectedValue.selected === false){
    selectedValue.selected =true;
    userSelectedCategories.push({categoryName:selectedValue.name,categoryNum:selectedValue.category});
  }
  else {
    selectedValue.selected = false;
    handleRemoveItem(selectedValue);

  }

}

const handleTickSelection = (item) => {

  if (item === true){
    return 100
  }
  else {
    return 0
  }
}

const handleRemoveItem = (item) =>{

  for ( var i = userSelectedCategories.length-1; i >= 0; --i){
    if (userSelectedCategories[i].categoryName == item.name){
      userSelectedCategories.splice(i,1);
    }
  }
  

}

   
    return (
      <View style={styles.page}>
                      <StatusBar animated barStyle="dark-content" />

                <View style = {styles.container}>
                

                
                    <SafeAreaView>
                        <View style = {{marginTop:20,marginBottom:10}}>
                            <Text style = {{fontSize:30, fontWeight:'bold'}}>Your interests</Text>
                            <Text style = {{fontSize:18, fontWeight:'200'}}>Choose 3 or more categories</Text>
                        </View>

                    </SafeAreaView>

                    <ScrollView>

                        <FlatList
                          extraData={indexChecked}
                          columnWrapperStyle = {{flex:1, justifyContent:'space-between'}}
                          data={formatData(Profiles, 3)}
                          keyExtractor={(item, index) => item.key}
                          renderItem={({item}) => (
                            
                            <TouchableOpacity 
                            onPress={() => {
                              handleUserSelection(item);
                              console.log(item.selected)
                              setIndexChecked(item.key);
                              console.log(userSelectedCategories)
                              }}
                            style = {{marginBottom:8.5}}>

                                <ImageBackground
                                style = {styles.card}
                                source={item.src} >
                                <View style = {{margin: 5,flex:1,justifyContent:'space-between'}}>

                                
                                  <Feather name ='check-circle' 
                                  style = {{
                                    fontSize:20,
                                    backgroundColor:'white',
                                    borderRadius:11,
                                    overflow:'hidden',
                                    margin:2,
                                    padding:2,
                                    color:'#53d769',
                                    alignSelf:'flex-end',
                                    opacity:handleTickSelection(item.selected)
                                    }}/>

                                
                                <Text style = {[styles.cardText]}>{item.name}</Text>
                                </View>
                                </ImageBackground>

                            </TouchableOpacity>
                          )}
                          numColumns = {3}
                        />
                      

                      <TouchableOpacity 
                      onPress={() => {
                            if(userSelectedCategories.length > 3){
                              AsyncStorage.getItem('@user_properties').then((data)=>{
                                var result =  data != null ? JSON.parse(data) : null;
                                if(result != null){
                                  result['category'] = userSelectedCategories
                                }else{
                                  result = {};
                                  result['category'] = userSelectedCategories
                                }
                                return result
                                }).then((savingObj)=>{
                                   return AsyncStorage.setItem('@user_properties', JSON.stringify(savingObj)).then(()=>{
                                    firebase.auth()
                                                    .createUserWithEmailAndPassword(savingObj.email, savingObj.password)
                                                    .then()
                                                    .catch(error => {
                                                        if (error.code === 'auth/email-already-in-use') {
                                                        alert('That email address is already in use!');
                                                        }else if (error.code === 'auth/invalid-email') {
                                                        alert('That email address is invalid!');
                                                        }else{
                                                            alert(error);
                                                            console.error(error);

                                                        }

                                                    });
                                   }).catch(()=>{
                                  alert("Failed to save your location, please try again later!")
                                })
                                }).catch()
                            }else{
                              alert("Please select at least 3 categories")
                            }                 
                        }}
                      style = {{width:'100%',height:60,borderRadius:30, backgroundColor:'#2ecc71',justifyContent:'center'}}>
                        <Text style = {{alignSelf:'center', fontSize:25, fontWeight:'500' , color:'white'}}>Continue</Text>
                      </TouchableOpacity>

                    </ScrollView>


                </View>

      </View>
    );
  
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor:'white'
  },
  container: {
    flex:1,
      width: '90%',
      alignSelf:'center'
  },
  card: {
    width:(width/3)*0.85,
    height:(width/3)*0.85, 
    borderRadius:10,
    overflow :'hidden'
  },
  cardText: {
    color: 'white', 
    fontSize:15,
    fontWeight: "bold",
    alignSelf:'flex-start',
  }
  
});