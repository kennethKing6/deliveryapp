import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text,Image, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";


function AddListing(props) {

    

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />


          
            

            <ScrollView>

                        <View style = {styles.AddPhotos}>
                        

                                <Image 
                                resizeMode = "cover"
                                source = {require('../assets/images/car2.jpg')}
                                style = {styles.inner}

                                />
                            

                        </View>

                        <Text>Title</Text>
                        <Text>Price</Text>
                        <Text>Condition</Text>
                        <Text>Choose Category</Text>
                        <Text>Location</Text>
                        <Text>Description</Text>




                
            </ScrollView>


            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },

   
    
    AddPhotos: {
        height: 300,
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'grey',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center'
    },

    
    inner: {
        width: '100%',
        height: '100%',
        
        
    }
    

    
   

});

export default AddListing;
