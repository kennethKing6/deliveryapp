import React, { Component } from "react";
import { 
    StyleSheet, 
    View, 
    StatusBar, 
    Text, 
    ImageBackground,
    TextInput,
    TouchableOpacity, 
    SafeAreaView, 
    ScrollView,
 } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import CustomTextInput from "../../components/CustomTextInput";

function AccountSettings(props) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <SafeAreaView >

                    <View style={styles.TopNav}>

                        <TouchableOpacity style={{ justifyContent: "center"}}
                            onPress={() => props.navigation.navigate('ProfileScreen')}>

                            <Text style={{
                                color: "white", fontSize: 20, fontWeight:'900'
                            }}>Cancel</Text>

                        </TouchableOpacity>

                       

                        <View style={{ justifyContent: "center", opacity: 100 }}>
                        
                        <View style = {{backgroundColor:'#e2e8fe',borderRadius:30}}>
                        <Text style={{
                                color: "black", fontSize: 20,fontWeight:'900',padding:10
                            }}>Save</Text>

                        </View>

                        </View>

                    </View>

                </SafeAreaView>



                            <View style = {{flex:1,justifyContent:'center'}}>

                                    <View style={[styles.rect]}>
                                        <View style={styles.profile}>

                                            

                                            <View style={styles.rect2}>
                                                <ImageBackground
                                                    source={require("../../../assets/images/logo.png")}
                                                    resizeMode="cover"
                                                    style={styles.listingImage1}
                                                ></ImageBackground>
                                            </View>
                                            <View style={styles.group}>
                                                <Text style={styles.shahbekMiru}>USERNAME</Text>
                                               <View style = {{flexDirection:'row'}}>
                                                    <Text style={{fontSize:40,color:'#00336b'}}>@</Text>
                                                    <TextInput
                                                    style = {{fontWeight:'900',fontSize:40,left:5}} 
                                                    placeholder = "username"
                                                    placeholderTextColor = "#00336b"
                                                    color="#0093fb"
                                                    
                                                    />
                                               </View>
                                               <Text style={styles.shahbekMiru}>STORE NAME</Text>
                                                    <TextInput
                                                    style = {{fontWeight:'900',fontSize:40}} 
                                                    placeholder = "username"
                                                    placeholderTextColor = "#00336b"
                                                    color="#0093fb"
                                                    
                                                    />
                                            </View>
                                            <View style={styles.group2}>
                                            <Text style={styles.shahbekMiru}>DESCRIPTION</Text>
                                                    <TextInput
                                                    style = {{fontWeight:'600',fontSize:18}} 
                                                    placeholder = "Store Description"
                                                    multiline = {true}
                                                    placeholderTextColor = "#00336b"
                                                    color="#0093fb"
                                                    
                                                    />
                                            </View>
                                            
                                            
                                        </View>
                                    </View>

                            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    TopNav: {
        top: 20,
        position:'absolute',
        width: '85%',
        height: 'auto',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        alignSelf: "center", 
        justifyContent: 'space-between'
    },
    rect: {
        marginTop:10,
        height: 'auto',
        width: '90%',
        alignSelf: "center",
        backgroundColor: '#021c46',
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
        width: "90%",
        height: 'auto',
        alignItems: "flex-start",
        justifyContent: "space-around"
    },
    group2: {
        marginTop: 20,
        width: "90%",
        height: 'auto',
        justifyContent: "space-around"
    },
    shahbekMiru: {
        color: "#0093fb",
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
    
    


});

export default AccountSettings;
