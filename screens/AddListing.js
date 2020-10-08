import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text,Image,Dimensions, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import MapboxGL from "@react-native-mapbox-gl/maps";

import {SharedElement} from 'react-navigation-shared-element';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2hhaGJla21pcnUiLCJhIjoiY2tjNnNyNGw0MDNndDMwbWZ3eGNwaHFqbCJ9.bJ2sqsCvcrOUmr_YeWFtJg',
);

export default function AddListing({props, route, navigation: { goBack } }) {

    const { item } = route.params;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />


          
            


                            
                    <ScrollView>
                    

                            <View style = {[styles.AddPhotos]}>
                            
                            <SharedElement id= {`item.${item.key}.photo`} style = {[StyleSheet.absoluteFillObject]}>
                            <View style = {[StyleSheet.absoluteFillObject, {borderRadius:0}]}>

                                    <Image 
                                    resizeMode = "cover"
                                    source = {item.src}
                                    style = {styles.inner}

                                    />
                            </View>
                                </SharedElement>
                             
                                <TouchableOpacity 
                            style={{ margin:10,marginTop:20,width:30,justifyContent: "center", borderRadius: 20, backgroundColor: 'white'}} 
                            onPress = {()=> goBack()}>
                                
                                <Feather style={{color: "black",fontSize:30}} name = 'x'/>

                        </TouchableOpacity>
                            </View>

                            <View style = {{width:'90%',alignSelf:'center'}}>
                                
                                <View style = {{flex:1,flexDirection:'row',marginBottom:10}}>
                                
                                    <View style = {{width:50,height:50,borderRadius:30,backgroundColor:'lightgrey',overflow:'hidden'}}>
                                    
                                    

                                    <ImageBackground
                                        resizeMode = "cover"
                                        source = {require('../assets/images/face1.jpg')}
                                        style = {styles.inner}

                                        />
                                    

                                    </View>
                                    
                                    <View style={{alignSelf:'center',marginLeft:5}}>
                                        <Text style = {{fontSize:18,fontWeight:'500'}}>shahbeklukas</Text>
                                        
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
                                                           
                                

                                <Text style = {{fontSize:25, fontWeight:'600',color:'#2ecc71'}}>CA$12,500</Text>
                               
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
                                styleURL = "mapbox://styles/shahbekmiru/ckdgwp2sj0myi1io4mt2ga8qo"

                                >
                                    <MapboxGL.Camera
                                    zoomLevel={12}
                                    centerCoordinate={[-120.32,50.67]}
                                    />
                                    <MapboxGL.PointAnnotation coordinate={[-120.32,50.67]}/>
                                    
                                </MapboxGL.MapView>
                                </View>

                            </View>

                            <View style = {{marginBottom:5,marginTop:5}}>
                            <Text style={{fontSize:25,fontWeight:'500',marginBottom:5}}>Product description</Text>
                            <Text style={{fontSize:20,fontWeight:'300'}}>The car is a German multinational company which produces luxury vehicles and motorcycles. The company was founded in 1916 as a manufacturer of aircraft engines, which it produced from 1917 until 1918 and again from 1933 to 1945.</Text>
                            </View>

                            <View style = {{marginBottom:100,marginTop:5,height:'auto'}}>
                            <Text style={{fontSize:30,fontWeight:'300',marginBottom:5}}>Tags</Text>
                            
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.tags}>Cars</Text>
                                        <Text style={styles.tags}>BMW</Text>
                                        <Text style={styles.tags}>Racing</Text>
                                        <Text style={styles.tags}>Rims</Text>

                                    </View>

                            </View>


                            </View>

                                        
                            
                            

                    </ScrollView>

                        <View style = {{alignSelf:'center',width:'100%', height: 50,position:'absolute',bottom: Dimensions.get("window").width / 20,}}>
                        
                        <View style = {{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>


                            <View style = {{
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
                                <Feather name = 'mail' style={{color:'white',alignSelf:'center',fontSize:30}}></Feather>
                            </View>

                            <View style = {{
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

                            <Text style={{color:'white',fontWeight:'300',alignSelf:'center',fontSize:20}}> Buy now</Text>
                            </View>

                            <View style = {{width:'auto', justifyContent:'center'}}>
                            <Text style={{color:'black',fontWeight:'900',alignSelf:'flex-start',fontSize:20}}> Price</Text>
                            <Text style={{color:'black',fontWeight:'300',alignSelf:'flex-start',fontSize:20}}> $12.5k</Text>
                            
                            </View>
                            
                        </View>

                        </View>
                        
                        
                        


                


            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },

    TextOverlay: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
    },
    
    AddPhotos: {
        height: 300,
        width: '100%',
        marginBottom: 10,
        
    },

    
    inner: {
        width: '100%',
        height: '100%',
        
        
    },
    tags: {
        fontSize:20,fontWeight:'200',padding:8,backgroundColor:'dodgerblue',borderRadius:18,overflow:'hidden',marginLeft:5,marginRight:5,color:'white'
    }
    

    
   

});

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

