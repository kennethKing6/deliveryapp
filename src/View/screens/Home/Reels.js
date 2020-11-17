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

