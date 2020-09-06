import React, { Component, useState,useEffect } from "react";
import { StyleSheet, View, StatusBar, Text, ImageBackground, TouchableOpacity,SafeAreaView,Dimensions,Image,ScrollView } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/Feather";
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";
import analytics from '@react-native-firebase/analytics';
import storage from '@react-native-firebase/storage';
import { WebView } from 'react-native-webview';








const {width} = Dimensions.get("window");



const Product = (props)=>{
    const [imageUrls,setImageUrls] = React.useState(new Array());
    const [newData,setnewData] = React.useState(false);


    const userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("" + userId).child("Product Info/");        

    

    React.useEffect(() => {
        let isSubscribed = (imageUrls.length === 0 && newData === false);

        if(isSubscribed){
            getDatasnapshot();
        }

        ShowImage().then( urls => {
        
              setImageUrls(urls.reverse());
  
            
          }).catch((err)=>{
            console.log(err)
            throw err;
        })
            
          return () => isSubscribed = (imageUrls.length === 0)
        
      }, [newData]);
    

     function getDatasnapshot(){
        ref.on("value",(dataSnapshot)=>{

            if(dataSnapshot !== null)
                setnewData(dataSnapshot)                         
            else
               setnewData(false)  
       });
       
    }

function getDownloadUrls(datasaphot){
    var urls = new Array();
    var num = 1;
   return new Promise((resolve,reject)=>{
    datasaphot.forEach(product => {
        firebase.storage().ref(product.val().fullPath).getDownloadURL().then((url)=>{
           urls.push(url);
        }).catch((err)=>{
            console.log(err)
            reject(err)
            throw err;
        }).finally(()=>{
            if(datasaphot.numChildren() === num){
               resolve(urls);
            }else{
                ++num;
            }

        })
   })
        
       
   });
}
async function ShowImage(){    
    const urls = await getDownloadUrls(newData);
    return urls;
}
   

function layoutIdentifier(){

    if(imageUrls.length === 0){
        return (<View style={{flex:props.flex,justifyContent: 'center',  alignItems: 'center'}}>
                <Text style={{fontSize:20,color:"#f03434", fontWeight: 'bold',}}>Hurry up! Upload your products to sell</Text>

        </View>)
     }else{
        return(
            <ScrollView style={{flex:5}}>    

                <View style = {styles.Listed}>
                    {imageUrls.map((url,index)=>{
                        return(
            
                            <View key={index} style={[{width:(width/3)},{height:(width/3)}]}>
                                    <Image style={{flex:1,width:undefined,height:undefined,resizeMode:"cover"}} 
                                    source={{uri:url}}
                                    onError={(err)=>{
                                        //Error loading the image
                                    console.log(err)
                                    }}/>
                            </View>
                    )})}
                </View>
            </ScrollView>
        )
     }
}


        return (
            
                    layoutIdentifier()
                    
        )
    
} 

 function Profile(props) {


// ShowImage().then(()=>{}).catch((err)=>{
// throw err;
// })

    return (
        

        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
                

        <SafeAreaView >

            <View style={styles.TopNav}>

                <View style={{ justifyContent: "center", opacity: 0 }}>

                    <MaterialCommunityIconsIcon
                        name="arrow-left"
                        style={styles.icon1}
                    ></MaterialCommunityIconsIcon>

                </View>

                <View style={{ justifyContent: 'center', marginTop: 5 }}>

                        <Text style={{
                            color: "#f03434", fontSize:18 }}>shahbeklukas</Text>

                </View>

                <TouchableOpacity style={{ justifyContent: "center" }}  
                        onPress={ () => props.navigation.navigate('AccountSettings')}>

                    <MaterialCommunityIconsIcon
                        name="dots-vertical"
                        style={styles.icon1}
                    ></MaterialCommunityIconsIcon>

                </TouchableOpacity>

            </View>

         </SafeAreaView>

            
        <View style={[styles.rect]}>
                                    <View style={styles.profile}>

                                        

                                        <View style={styles.rect2}>
                                            <ImageBackground
                                                source={require("../assets/images/face1.jpg")}
                                                resizeMode="cover"
                                                style={styles.listingImage1}
                                            ></ImageBackground>
                                        </View>
                                        <View style={styles.group}>
                                            <Text style={styles.shahbekMiru}>Shahbek Miru</Text>
                                            <Text style={styles.kamloopsCanada}>Kamloops, Canada</Text>
                                        </View>
                                        <View style={styles.group2}>
                                            <Text style={styles.kamloopsCanada}>The Category section shows up under your business name and is generated by the category chosen on a linked Facebook page. Indicating your business type will give visitors a better, immediate idea of the products you offer. </Text>
                                        </View>
                                        
                                        <View style={styles.banner}>
                                            <View style={styles.rating1}>
                                                <Text style={styles.loremIpsum}>4.5</Text>
                                                <Text style={styles.rating}>RATING</Text>
                                            </View>
                                            <View style={styles.rating1}>
                                                <Text style={styles.loremIpsum}>17</Text>
                                                <Text style={styles.rating}>REVIEWS</Text>
                                            </View>
                                            <View style={styles.rating1}>
                                                <Text style={styles.loremIpsum}>35</Text>
                                                <Text style={styles.rating}>SOLD</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                    

            <Product flex={0}/>
        

                               
                                

                               


                    


                    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection:"column"
    },
   
    TopNav: {
        backgroundColor: 'white',
        width: '95%',
        height: 'auto',
        flexDirection: 'row',
        paddingTop:10,
        paddingBottom: 10,
        alignSelf: "center",
        justifyContent: 'space-between'
    },
    icon1: {
        color: "#f03434",
        fontSize: 30,
        
    },
    
    rect: {
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
        fontSize: 20
    },
    kamloopsCanada: {
        color: "black",
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
        fontSize: 25
    },
    rating: {
        color: "#f03434",
        fontSize: 15
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
