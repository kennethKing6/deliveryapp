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


const numOfColumns = 3;
const userSelectedCategories = [];

export default function SelectCategories({navigation}) {
    const [selectedCategroryList,setSelectedCategroryList] = useState(new Array(Profiles.length))
    // React.useEffect(() => {
    //   const unsubscribe = navigation.addListener('focus', () => {
    //     const tempCategory = []
    //     selectedCategroryList.forEach(element =>{
    //       tempCategory.push(null);
    //     })
    //     setSelectedCategroryList(tempCategory)

    //   });
    //   // Return the function to unsubscribe from the event so it gets removed on unmount
    //   return unsubscribe;
    // }, [navigation]);

const formatData = () => {
  const numberOfFullRows = Math.floor(Profiles.length/3);

  let numOfElementsInLastRow = Profiles.length-(numberOfFullRows*3);

  while(numOfElementsInLastRow!== 3 && numOfElementsInLastRow!==0){
    Profiles.push({key: 'blank-${numOfElementsInLastRow}', empty: true});
    numOfElementsInLastRow = numOfElementsInLastRow+1;
  }

  return Profiles;
}


const handleUserSelection = (selectedValue,index) => {
  var category = {categoryName:selectedValue.name,categoryNum:selectedValue.category}
  var tempValues = new Array(Profiles.length);
 
  for(var i = 0; i < selectedCategroryList.length; ++i){
    tempValues[i] = selectedCategroryList[i];
  }
  if (selectedValue.selected === false && selectedCategroryList.includes(category) === false){
    selectedValue.selected = true;
    
    tempValues[index] = category;
  }else {
    selectedValue.selected = false;
    tempValues =  handleRemoveItem(tempValues,index);
   

  }
  console.log("tempValues",tempValues)

  setSelectedCategroryList(tempValues)

}

const handleTickSelection = (item) => {
  if (item){
    return 100
  }
  else {
    return 0
  }
}

const handleRemoveItem = (tempArray,index) =>{
  tempArray[index] = undefined;

  return tempArray;
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
                          columnWrapperStyle = {{flex:1, justifyContent:'space-between'}}
                          data={formatData()}
                          keyExtractor={(item, index) => item.key}
                          renderItem={({item,index}) => (
                            
                            <TouchableOpacity 
                            onPress={() => {
                              handleUserSelection(item,index);
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
                                    opacity:handleTickSelection(selectedCategroryList[index])
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
                        var count = 0;
                        for(var i = 0; i < selectedCategroryList.length; i++){
                          if(selectedCategroryList[i] === undefined){
                            ++count;
                          }
                        }
                            if(count <= selectedCategroryList.length - 3){
                              AsyncStorage.getItem('@user_properties').then((data)=>{
                                var result =  data != null ? JSON.parse(data) : null;
                                if(result != null){
                                  result['category'] = selectedCategroryList
                                }else{
                                  result = {};
                                  result['category'] = selectedCategroryList
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
    fontWeight: '900',
    alignSelf:'flex-start',
  }
  
});