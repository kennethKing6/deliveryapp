import React, { Component, useState,useEffect } from "react";
import { StyleSheet, View, StatusBar, Text, ImageBackground, TouchableOpacity,SafeAreaView,Dimensions,Image,ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';

import analytics from '@react-native-firebase/analytics';
import storage from '@react-native-firebase/storage';
import productState from "../../../Model/Constants/ProductStateConstant";



const {width} = Dimensions.get("window");



const Product = (props)=>{
    const [productList,setProductList] = useState([]);

  
    const userId = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref("users/" + userId);
    
    const productRef = ref.child("products");
    
    
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
          
            productRef.once("value",(snapshot)=>{
                    getProducts(snapshot)
            })

           
        });
    
        return unsubscribe;
      }, [props.navigation]);

     

 function getProducts(datasnapshot){
    var products = [];
    datasnapshot.forEach(element => {
        products.push(element.val());
    });
   setProductList(products.reverse());
}

function layoutIdentifier(){

    if(productList.length === 0){
        return (<View style={{flex:props.flex,justifyContent: 'center',alignSelf:'center', width:'80%',alignItems:'center' }}>
                <Text style={{fontSize:20,color:'grey', fontWeight: '500',textAlign:'center'}}>You have no products to sell yet, please list an item 😁</Text>

        </View>)
     }else{
        return(
              

                <View style = {styles.Listed}>
                    {productList.map((data,index)=>{
                        try{
                            return(
                            
                            <View key={index} style={[{width:(width/3)},{height:(width/3)},{padding:0.5}]}>
                            
                                    
                                    <ImageBackground style={{flex:1,width:undefined,height:undefined,resizeMode:"cover",borderRadius:3,flex:1,overflow:'hidden'}} 
                                    source={{uri:data.properties.url}}
                                    onError={(err)=>{
                                        //Error loading the image
                                    console.log(err)
                                    }}>
                                        <View style = {{margin: 5,flex:1,justifyContent:"flex-end"}}>

                                            <Text style = {{color: 'black', fontWeight: "bold",padding:2,alignSelf:'flex-start',backgroundColor: 'white',borderRadius: 3,overflow: 'hidden'}}>${data.properties.productPrice}</Text>
                                        </View>

                                        
                                    </ImageBackground>
                            </View>

                )
                        }catch(error){

                        }
                        
                       })}
                </View>
        )
     }
}


        return (
            
                    layoutIdentifier()
                    
        )
    
} 

 function Profile(props) {
    const [userProperties,setUserProperties] = useState(null);

    const userId = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref("users/" + userId);
    const userPropertiesRef = ref.child("user_properties");

    //user data constants
    const PROFILE_PICTURE = 0;
    const USERNAME = 1;
    const ADDRESS = 2;
    const USERBIO = 3;
    const RATING = 4;
    const REVIEWS = 5;
    const SOLD = 6;

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            userPropertiesRef.once("value",(datasnapshot)=>{
                    setUserProperties(datasnapshot.val());
            })
          

           
        });
    
        return unsubscribe;
      }, [props.navigation]);


    function getUserData(requestedUserData){
        var data = null;
        try{
            switch(requestedUserData){
                case PROFILE_PICTURE:
                   var remoteImage = null;
                   try{
                       remoteImage = userProperties.userProfilePicture;
                      
                    }catch(err){remoteImage=null}


                    remoteImage != null ? data = {uri : remoteImage}   : data = null ;

                    break;

                case USERNAME:
                    data = userProperties.username;
                    break;
                case ADDRESS:
                    data = userProperties.address;
                    break;
                case USERBIO:
                    data = userProperties.userBio;
                        break;
            }
        }catch(err){
            return ""; 
        }
        return data;
    }


    function getUserStats(requestedStats){
        var data;
        try{
            switch(requestedStats){
                case RATING:
                        data = userProperties.rating;
                            break;
                    case REVIEWS:
                        data = userProperties.reviews;
                            break;
                    case SOLD:
                        data = userProperties.sold;
                            break;
            }
        }catch(err){
            return 0;
        }
       
        return data ? data: 0; 
    }
// ShowImage().then(()=>{}).catch((err)=>{
// throw err;
// })

    return (
        

        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
                

        <SafeAreaView >

            <View style={styles.TopNav}>

                <View style={{ justifyContent: "center", opacity: 0 }}>

                    <Feather
                        name="arrow-left"
                        style={styles.icon1}
                    />

                </View>

                <View style={{ justifyContent: 'center', marginTop: 5 }}>

                        <Text style={{
                            color: "black", fontSize:18 }}>{getUserData(USERNAME)}</Text>

                </View>

                <TouchableOpacity style={{ justifyContent: "center" }}  
                        onPress={ () => props.navigation.navigate('AccountSettings')}>

                    <Feather
                        name="settings"
                        style={styles.icon1}
                    />

                </TouchableOpacity>

            </View>

         </SafeAreaView>

          <ScrollView style = {{flex:2}}>

        
        <View style={[styles.rect]}>
                                    <View style={styles.profile}>

                                        

                                        <View style={styles.rect2}>
                                            <ImageBackground
                                                source={getUserData(PROFILE_PICTURE) === null? require("../../../assets/icons/profilephoto_placeholder.png") : getUserData(PROFILE_PICTURE) }
                                                resizeMode="cover"
                                                style={styles.listingImage1}
                                            ></ImageBackground>
                                        </View>
                                        <View style={styles.group}>
                                            <Text style={styles.shahbekMiru}>{getUserData(USERNAME)}<Feather name = 'check-circle' style = {{fontSize:20,color:'dodgerblue'}}/></Text>
                                            <Text style={styles.kamloopsCanada}>{getUserData(ADDRESS)}</Text>
                                        </View>
                                        <View style={styles.group2}>
                                            <Text style={styles.kamloopsCanada}>{getUserData(USERBIO)} </Text>
                                        </View>
                                        
                                        <View style={styles.banner}>
                                            <View style={styles.rating1}>
                                                <Text style={styles.loremIpsum}>{getUserStats(RATING)}</Text>
                                                <Text style={styles.rating}>RATING</Text>
                                            </View>
                                            <View style={styles.rating1}>
                                                <Text style={styles.loremIpsum}>{getUserStats(REVIEWS)}</Text>
                                                <Text style={styles.rating}>REVIEWS</Text>
                                            </View>
                                            <View style={styles.rating1}>
                                                <Text style={styles.loremIpsum}>{getUserStats(SOLD)}</Text>
                                                <Text style={styles.rating}>SOLD</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                    

            <View style = {{marginTop:30, width: '100%',alignSelf: 'center'}}>

            <Product flex={0} navigation={props.navigation}/>
            </View>
          </ScrollView>  
        

                               
                                

                               


                    


                    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
   
    TopNav: {
        backgroundColor: 'transparent',
        width: '95%',
        height: 'auto',
        flexDirection: 'row',
        paddingTop:10,
        paddingBottom: 10,
        alignSelf: "center",
        justifyContent: 'space-between',
        overflow: "visible"
    },
    icon1: {
        color: "#2ecc71",
        fontSize: 30,
        
    },
    
    rect: {
        marginTop:10,
        height: 'auto',
        width: '95%',
        alignSelf: "center",
        backgroundColor: '#fff',
        borderRadius: 40,
        shadowColor: "#2e3131",
        shadowOffset: {
            width: 0,
            height: 7
        },
        elevation: 15,
        shadowOpacity: 0.2,
        shadowRadius: 9
    },
    
    profile: {
        width: '90%',
        justifyContent: "space-around",
        height: 'auto',
        alignItems: "center",
        marginBottom: 20,
        alignSelf: "center"
    },
    listingImage1: {
        height: '100%',
        height: '100%',
        borderRadius: 100,
        flex: 1,
        overflow: "hidden",
        
    },
    rect2: {
        width: 120,
        height: 120,
        marginTop: 20,
        backgroundColor: "#E6E6E6",
        borderRadius: 100,
        
    },
    group: {
        marginTop: 20,
        width: "80%",
        height: 'auto',
        alignItems: "center",
        justifyContent: "space-around"
    },
    group2: {
        marginTop: 20,
        width: "90%",
        height: 'auto',
        justifyContent: "space-around"
    },
    shahbekMiru: {
        color: "black",
        fontWeight:'600',
        fontSize: 20
    },
    kamloopsCanada: {
        color: "black",
        fontWeight:'400'
    },
    banner: {
        marginTop: 20,
        width: "100%",
        height: 48,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rating1: {
        flex: 1,
        width: 'auto',
        height: 48,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    loremIpsum: {
        color: "black",
        fontWeight:'500',
        fontSize: 25
    },
    rating: {
        color: "#2ecc71",
        fontSize: 15,
        fontWeight:'900'
    },
    
    Listed: {
        flex: 1,
        flexDirection:'row',
        flexWrap:"wrap",
        width:"100%",
    },
    Listing: {
        
        width: '100%',
        height:"100%",
        flexDirection:'row',
        flexWrap:"wrap"
    }
   
    
});

export default Profile;