import React, { Component } from "react";
import { 
    StyleSheet, 
    View, 
    StatusBar, 
    Text, 
    Image,
    TouchableOpacity, 
    SafeAreaView, 
    ScrollView,
    Dimensions,
    ImageBackground,
 } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomTextInput from "../../components/CustomTextInput";

const {width,height} = Dimensions.get("window");


function AccountSettings(props) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />


            <SafeAreaView >

                <View style={styles.TopNav}>

                    <TouchableOpacity style={{ justifyContent: "center" }}
                        onPress={() => props.navigation.navigate('AccountSettings')}>

                        <MaterialCommunityIconsIcon
                            name="arrow-left"
                            style={styles.icon1}
                        ></MaterialCommunityIconsIcon>

                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center', marginTop: 5 }}>

                        <Text style={{
                            color: "black", fontSize: 18
                        }}>Personal Information</Text>

                    </View>

                    <View style={{ justifyContent: "center" }}>

                        <Text style={{
                            color: "#f03434", fontSize: 18
                        }}>save</Text>

                    </View>

                </View>

            </SafeAreaView>


            
            <ScrollView
                    horizontal={true}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    >

                        <View style = {{width, height:width*0.8,justifyContent:'center'}}>
                        <View 
                        style = {{
                            width:width*0.9, 
                            height:230,
                            alignSelf:'center',
                            borderRadius:20,
                            shadowColor: "rgba(0,0,0,1)",
                            shadowOffset: {
                                width: 0,
                                height: 8
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            }}>
                                <ImageBackground
                                    resizeMode = {'cover'}
                                    style = {{width:'100%',height:'100%',borderRadius:20,overflow:'hidden'}}
                                    source = {require('../assets/images/cards/card2.jpg')}
                                >
                                <View style = {{margin:20, flex:1, justifyContent:'space-between'}}>
                                    
                                    
                                    <Text style = {{fontSize:30, color:'white',fontWeight:'500'}}>Shahbek Miru</Text>
                                    
                                    <View style = {{justifyContent:'space-between'}}>
                                        <Text style = {{fontSize:18, color:'white',fontWeight:'500'}}>Dispatch platinum</Text>
                                        <Text style = {{fontSize:25, color:'white',fontWeight:'500',marginTop:5}}>4756 0510 3534 9018</Text>
                                        <Text style = {{fontSize:25, color:'white',fontWeight:'500',marginTop:5}}>$5,305.34</Text>

                                    </View>

                                   


                                </View>
                                    
                                </ImageBackground>
                                
                        </View>
                        </View>


                        <View style = {{width, height:width*0.8,justifyContent:'center'}}>
                        <View 
                        style = {{
                            width:width*0.9, 
                            height:230,
                            alignSelf:'center',
                            borderRadius:20,
                            shadowColor: "rgba(0,0,0,1)",
                            shadowOffset: {
                                width: 0,
                                height: 8
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            }}>
                                <ImageBackground
                                    resizeMode = {'cover'}
                                    style = {{width:'100%',height:'100%',borderRadius:20,overflow:'hidden'}}
                                    source = {require('../assets/images/cards/card3.jpg')}
                                >
                                <View style = {{margin:20, flex:1, justifyContent:'space-between'}}>
                                    
                                    
                                    <Text style = {{fontSize:30, color:'white',fontWeight:'500'}}>Shahbek Miru</Text>
                                    
                                    <View style = {{justifyContent:'space-between'}}>
                                        <Text style = {{fontSize:18, color:'white',fontWeight:'500'}}>Dispatch platinum</Text>
                                        <Text style = {{fontSize:25, color:'white',fontWeight:'500',marginTop:5}}>4756 0510 3534 9018</Text>
                                        <Text style = {{fontSize:25, color:'white',fontWeight:'500',marginTop:5}}>$5,305.34</Text>

                                    </View>

                                   


                                </View>
                                    
                                </ImageBackground>
                                
                        </View>
                        </View>


                        

             </ScrollView>

               

               
            


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },

    TopNav: {
        backgroundColor: 'white',
        width: '90%',
        height: 'auto',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: "center",
        justifyContent: 'space-between'
    },
    icon1: {
        color: "#f03434",
        fontSize: 30,

    },

    
    


});

export default AccountSettings;
