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

import Profiles from './images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Root, Popup } from 'popup-ui';
import {Account} from './model/Account';
import firebase from "@react-native-firebase/app";


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
                              this.setState({ indexChecked: item.key});
                              userSelectedCategories.push({categroyName:item.name,categoryNum:item.category});
                              console.log(userSelectedCategories)
                              }}
                            style = {{marginBottom:8.5}}>

                                <ImageBackground
                                style = {styles.card}
                                source={item.src} >
                                <View style = {{margin: 5,flex:1,justifyContent:"flex-end"}}>
                                <Text style = {styles.cardText}>{item.name}</Text>
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
                          this.props.navigation.navigate('Introduction')

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