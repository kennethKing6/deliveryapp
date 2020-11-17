import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text,Image,Dimensions, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {SharedElement} from 'react-navigation-shared-element';


export default function Reels({props, navigation, route, navigation: { goBack } }) {

    const { item } = route.params;

    return (
        <View style={{flex:1}}>

                            
                                        
                                <SharedElement id= {`item.${item.key}.photo`} style = {[StyleSheet.absoluteFillObject]} >
                                
                                        <Image 
                                        resizeMode = {'cover'}
                                        style = {{flex:1,alignSelf:'center'}}
                                        source = {item.src}

                                        />
                                
                                </SharedElement>

                                <View style = {{flex:1}}>
                                        
                                        <View style = {{flex:1,alignItems:'flex-end',justifyContent:'center',margin:10}}>

                                        <View style = {{alignItems:'center'}}>

                                            <ImageBackground source = {item.sellerimg} style = {{width:50,height:50,borderRadius:50,borderWidth:1.5,borderColor:'white',overflow:'hidden',marginBottom:10}}/>
                                            <Feather name = {'eye'} style = {{fontSize:25,color:'white',marginBottom:10}}/>
                                            <Feather name = {'heart'} style = {{fontSize:25,color:'white',marginBottom:10}}/>
                                            <Feather name = {'message-circle'} style = {{fontSize:25,color:'white',marginBottom:10}}/>
                                            <Feather name = {'send'} style = {{fontSize:25,color:'white',marginBottom:10}}/>

                                            
                                        </View>
                                        </View>
                                
                                    

                                        
                                        <TouchableOpacity 
                                    style={{top:50,left:20,width:30,justifyContent: "center", borderRadius: 20, backgroundColor: 'white',position:'absolute'}} 
                                    onPress = {()=> goBack()}>
                                        
                                        <Feather style={{color: "black",fontSize:30}} name = 'x'/>
                                    </TouchableOpacity>

                                </View>
                             
                        {/* <TouchableOpacity 
                            style={{ margin:10,marginTop:20,width:30,justifyContent: "center", borderRadius: 20, backgroundColor: 'white'}} 
                            onPress = {()=> goBack()}>
                                
                                <Feather style={{color: "black",fontSize:30}} name = 'x'/>

                        </TouchableOpacity> */}
                        
                        
                            
        </View>

                       
                        
                        
                        


                


       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


Reels.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [
        {
            id: `item.${item.key}.photo`
        },
        {
            id: `item.${item.key}.src`
        },
    
    ];
  };

