import React, {Component} from 'react';
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

const formatData = (Profiles,numOfColumns) => {
  const numberOfFullRows = Math.floor(Profiles.length/numOfColumns);

  let numOfElementsInLastRow = Profiles.length-(numberOfFullRows*numOfColumns);

  while(numOfElementsInLastRow!==numOfColumns && numOfElementsInLastRow!==0){
    Profiles.push({key: 'blank-${numOfElementsInLastRow}', empty: true});
    numOfElementsInLastRow = numOfElementsInLastRow+1;
  }

  return Profiles;
}

var userSelectedCategories =[];

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

export default class SelectCategories extends Component {
  
  constructor(props) {
		super(props);
		this.state = {
      indexChecked: '0',
      
		};
	}

  render() { 
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
                          extraData={this.state}
                          columnWrapperStyle = {{flex:1, justifyContent:'space-between'}}
                          data={formatData(Profiles, numOfColumns)}
                          keyExtractor={(item, index) => item.key}
                          renderItem={({item}) => (
                            
                            <TouchableOpacity 
                            onPress={() => {
                              handleUserSelection(item);
                              console.log(item.selected)
                              this.setState({ indexChecked: item.key});
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
                          numColumns = {numOfColumns}
                        />
                      

                      <TouchableOpacity 
                      onPress={() => {
                        var account = new Account(firebase.auth().currentUser.uid);
                        account.updateDbUserCategory(userSelectedCategories).then(()=>{
       
                          return AsyncStorage.setItem('@IntroductionScreen', "true")
                        }).then(()=>{
                          this.props.navigation.navigate('SignedInScreens')
                        }).catch(()=>{
                          alert("Select at least 3 categories")
                        })
                        }}
                      style = {{width:'100%',height:60,borderRadius:30, backgroundColor:'#2ecc71',justifyContent:'center'}}>
                        <Text style = {{alignSelf:'center', fontSize:25, fontWeight:'500' , color:'white'}}>Continue</Text>
                      </TouchableOpacity>

                    </ScrollView>


                </View>

      </View>
    );
  }
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
    width:(width/numOfColumns)*0.85,
    height:(width/numOfColumns)*0.85, 
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