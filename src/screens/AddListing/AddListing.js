import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text,Image,Dimensions, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {styles} from './styles';
import {SharedElement} from 'react-navigation-shared-element';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2hhaGJla21pcnUiLCJhIjoiY2tjNnNyNGw0MDNndDMwbWZ3eGNwaHFqbCJ9.bJ2sqsCvcrOUmr_YeWFtJg',
);

export default function AddListing({props, navigation, route, navigation: { goBack } }) {

    const { item } = route.params;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />


          
            


                            
                    <ScrollView>
                    

                            <View style = {[styles.AddPhotos]}>
                            
                            <SharedElement id= {`item.${item.key}.photo`} style = {[StyleSheet.absoluteFillObject]}>
                            

                                    <Image 
                                    resizeMode = "cover"
                                    source = {item.src}
                                    style = {styles.inner}

                                    />
                                </SharedElement>
                        
                        
                        <SafeAreaView>
                        <TouchableOpacity 
                            style={{ margin:10,width:30,justifyContent: "center", borderRadius: 20, backgroundColor: 'white'}} 
                            onPress = {()=> goBack()}>
                                
                                <Feather style={{color: "black",fontSize:30}} name = 'x'/>

                        </TouchableOpacity>

                        </SafeAreaView>

                            </View>

                            <View style = {{width:'90%',alignSelf:'center'}}>
                                
                                <View style = {{flex:1,flexDirection:'row',marginBottom:10}}>
                                
                                    <View style = {{width:50,height:50,borderRadius:30,backgroundColor:'lightgrey',overflow:'hidden'}}>
                                    
                                    

                                    <ImageBackground
                                        resizeMode = "cover"
                                        source = {item.sellerimg}
                                        style = {styles.inner}

                                        />
                                    

                                    </View>
                                    
                                    <View style={{alignSelf:'center',marginLeft:5}}>
                                        <Text style = {{fontSize:18,fontWeight:'500'}}>{item.seller}</Text>
                                        
                                        <View style = {{flexDirection:"row"}}>
                                        <Feather name = 'map-pin'></Feather>
                                        <Text>Kamloops, BC</Text>
                                        </View>
                                    </View>
                                    
                                </View>
                                {/* <SharedElement id= {`item.${item.key}.title`}> */}
                                <Text style = {styles.TextOverlay}>{item.name}</Text>
                                {/* </SharedElement> */}

                            <View style={{marginBottom:10}}>
                                                           
                                

                                <Text style = {{fontSize:25, fontWeight:'600',color:'#2ecc71'}}>CA${item.price}</Text>
                               
                                <View style={{flexDirection:'row',flex:1,alignContent:'center'}}>
                                    <Feather name='star' style={{fontSize:20,color:'#F7CA18'}}></Feather>
                                    <Feather name='star' style={{fontSize:20,color:'#F7CA18'}}></Feather>
                                    <Feather name='star' style={{fontSize:20,color:'#F7CA18'}}></Feather>
                                    <Feather name='star' style={{fontSize:20,color:'#F7CA18'}}></Feather>
                                    <Feather name='star' style={{fontSize:20,color:'lightgrey'}}></Feather>
                                    <Text style={{fontSize:20,color:'lightgrey',alignSelf:'center'}}>4.5 10 Reviews</Text>
                                </View>

                            </View>
                               
                            
                            <View style={{marginTop:5,marginBottom:5}}>
                                <Text style={{fontSize:25,fontWeight:'500',marginBottom:5}}>Item Location</Text>
                                <View style={{
                                    marginTop:5,
                                    height:200,
                                    shadowColor: "rgba(0,0,0,1)",
                                    shadowOffset: {
                                        width: 0,
                                        height: 0
                                    },
                                    elevation: 30,
                                    shadowOpacity: 0.5,
                                    shadowRadius: 4,
                                    }}>
                                <MapboxGL.MapView 
                                style={{flex:1}}
                                logoEnabled={false}
                                scrollEnabled={false}
                                zoomEnabled={false}
                                borderRadius={20}
                                styleURL = "mapbox://styles/shahbekmiru/ckg363tz81g3z19qlp9lwsh3y"

                                >
                                    <MapboxGL.Camera
                                    zoomLevel={12}
                                    centerCoordinate={[-120.32,50.67]}
                                    />
                                    <MapboxGL.PointAnnotation coordinate={[-120.32,50.67]}/>
                                    
                                </MapboxGL.MapView>
                                </View>

                            </View>

                            <View style = {{marginBottom:100,marginTop:5}}>
                            <Text style={{fontSize:25,fontWeight:'500',marginBottom:5}}>Product description</Text>
                            <Text style={{fontSize:20,fontWeight:'300'}}>I am selling this because I recently just upraded my system. Message for more info.</Text>
                            </View>

                            

                            </View>

                                        
                            
                            

                    </ScrollView>

                        <View style = {{alignSelf:'center',width:'100%', height: 50,position:'absolute',bottom: Dimensions.get("window").width / 20,}}>
                        
                        <View style = {{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>

                            
                            <TouchableOpacity
                            onPress = {()=> navigation.navigate('MessageListScreen')}
                            style = {{
                                backgroundColor:'black',
                                 borderRadius: 30, 
                                 width:50,
                                 justifyContent:'center',
                                 shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4,}}>

                            <View>
                                <Feather name = 'mail' style={{color:'white',alignSelf:'center',fontSize:30}}></Feather>
                            </View>
                            </TouchableOpacity>
                            

                            <TouchableOpacity
                            onPress = {()=> navigation.navigate('MapScreen')}
                            style = {{
                                backgroundColor:'#2ecc71',
                                 borderRadius: 30, 
                                 width:150, 
                                 justifyContent:'center',
                                 shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4,
                                 }}>

                            <View>

                            <Text style={{color:'white',fontWeight:'300',alignSelf:'center',fontSize:20}}> Buy now</Text>
                            </View>
                            </TouchableOpacity>

                            <View style = {{width:'auto', justifyContent:'center', backgroundColor:'white', padding:10, borderRadius:10}}>
                            <Text style={{color:'black',fontWeight:'900',alignSelf:'flex-start',fontSize:20}}> Price</Text>
                            <Text style={{color:'black',fontWeight:'300',alignSelf:'flex-start',fontSize:20}}> ${item.price}</Text>
                            
                            </View>
                            
                        </View>

                        </View>
                        
                        
                        


                


            
        </View>
    );
}



AddListing.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [
        {
            id: `item.${item.key}.photo`
        },
        {
            id: `item.${item.key}.title`
        },
        
    
    ];
  };

