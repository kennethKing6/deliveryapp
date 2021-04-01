import React, { Component,useState } from "react";
import { StyleSheet, View, StatusBar, Text,Image,Dimensions, ImageBackground, TouchableOpacity,TouchableHighlight,SafeAreaView, ScrollView,Modal } from "react-native";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import Feather from "react-native-vector-icons/Feather";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {styles} from './styles';
import {SharedElement} from 'react-navigation-shared-element';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2hhaGJla21pcnUiLCJhIjoiY2tjNnNyNGw0MDNndDMwbWZ3eGNwaHFqbCJ9.bJ2sqsCvcrOUmr_YeWFtJg',
);

export default function AddListing({props, navigation, route, navigation: { goBack } }) {
    const [modalVisible, setModalVisible] = useState(false);
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

                           
                               
                            <View style = {{marginBottom:10,marginTop:5}}>
                            <Text style={{fontSize:16,fontWeight:'300'}}>The iPhone 12 and iPhone 12 mini are Apple's mainstream flagship iPhones for 2020. The phones come in 6.1-inch and 5.4-inch sizes with identical features, including support for faster 5G cellular networks, OLED displays, improved cameras, and Apple's latest A14 chip, all in a completely refreshed design.</Text>
                            </View>

                            <View style={{marginTop:5,marginBottom:5}}>
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

                            

                            

                            </View>

                                        
                            
                            

                    </ScrollView>

                        <View style = {{alignSelf:'center',width:'100%', height: 50,position:'absolute',bottom: Dimensions.get("window").width / 15}}>
                        
                        <View style = {{flex:1,flexDirection:'row', alignSelf:'center'}}>
                            

                            <TouchableOpacity
                            onPress = {()=> setModalVisible(true)}
                            style = {{
                                backgroundColor:'#303030',
                                 borderRadius: 10, 
                                 width:'90%', 
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

                            <Text style={{color:'white',fontWeight:'400',alignSelf:'center',fontSize:20}}> Add to bag . ${item.price} </Text>
                            </View>
                            </TouchableOpacity>

                        </View>

                        </View>
                        
                        
                        

                    <View style={styles.centeredView}>
                        <Modal
                            backdropOpacity={0.1}
                            animationType= "fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            }}
                        >
                            
                            <BlurView
                            style={styles.absolute}
                            blurType="light"
                            blurAmount={5}
                            reducedTransparencyFallbackColor="white"
                            />

                            <View style={styles.centeredView2}>
                            
                            
                            <View style={styles.modalView}>
                            

                                    <View style = {{width:'100%',marginBottom:10, flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>

                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: "#00000033" }}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                            }}
                                        >
                                            
                                            <Feather name = 'x' style={styles.textStyle}></Feather>
                                        </TouchableHighlight>

                                        <Text style = {{fontSize:20,fontWeight:'800'}}>Your shopping cart</Text>
                                    </View>

                                   
                                    <View style = {{alignSelf:'center',width:'100%',flexDirection:'row', justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                                        <Image
                                        resizeMode = "cover"
                                        source = {item.src}
                                        style = {{width:100,height:100,borderRadius:10}}
                                        />
                                        <Text style = {{textAlign:'center', fontSize:20,fontWeight:'400'}}>{item.name}</Text>
                                    <Text style = {{textAlign:'center',fontSize:20,fontWeight:'400'}}>${item.price}</Text>
                                    </View>
                                    
                                    <View style = {{height:50, width:'100%'}}> 

                                    <View style = {{flex:1,flexDirection:'row', alignSelf:'center'}}>
                                        

                                        <TouchableOpacity
                                        style = {{
                                            backgroundColor:'#303030',
                                            borderRadius: 10, 
                                            width:'100%', 
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

                                        <Text style={{color:'white',fontWeight:'400',alignSelf:'center',fontSize:20}}> Checkout </Text>
                                        </View>
                                        </TouchableOpacity>

                                    </View>

                                    </View>
                                    </View>
                                
                                </View>
                                        
                            
                        </Modal>

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

