import React, { Component,useState,useEffect } from "react";
import { 
    StyleSheet, 
    View, 
    StatusBar, 
    Text, 
    TouchableOpacity, 
    SafeAreaView, 
    ScrollView,
    TextInput 
 } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomTextInput from "../../components/CustomTextInput";
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';

function AccountSettings(props) {
    const [profilePicture,setProfilePic] = useState(null);
    const [username,setUsername] = useState(null);
    const [address,setUserAddress] = useState(null);
    const [userBio,setUserBio] = useState(null);
    const [userProperties,setUserProperties] = useState(null);


    const userId = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref("users/" + userId);
    const userPropertiesRef = ref.child("user_properties");

     //user data constants
     const PROFILEP_PICTURE = 0;
     const USERNAME = 1;
     const ADDRESS = 2;
     const USERBIO = 3;
     const RATING = 4;
     const REVIEWS = 5;
     const SOLD = 6;

     function getUserData(requestedUserData){
        var data = null;
        try{
            switch(requestedUserData){
                case PROFILEP_PICTURE:
                   
                    profilePicture === null? data = userProperties.profilePicture : data = profilePicture;
                    break;
                case USERNAME:
                    username === null?data = userProperties.username : data = username;
                    break;
                case ADDRESS:
                    address === null? data = userProperties.address : data = address;
                    break;
                case USERBIO:
                    userBio === null? data  =userProperties.userBio:data = userBio; 
                     break;
            }
        }catch(err){
            return null; 
        }
        return data;
    }


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            userPropertiesRef.once("value",(datasnapshot)=>{
                    setUserProperties(datasnapshot.val());
            })
          

           
        });
    
        return unsubscribe;
      }, [props.navigation]);

   

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

                    <TouchableOpacity style={{ justifyContent: "center" }} 
                    onPress={()=>{
                        var firebaseUsernameValue = "";
                        try{firebaseUsernameValue = userProperties.username}catch(err){}

                        var firebaseBioValue = "";
                        try{firebaseBioValue = userProperties.userBio}catch(err){}

                        var firebaseAddressValue = "";
                        try{firebaseAddressValue = userProperties.address}catch(err){}
                       
                       
                       userPropertiesRef.update({
                        username:username === null ? firebaseUsernameValue:username,
                        userBio:userBio === null ?firebaseBioValue:userBio,
                        address:address === null ? firebaseAddressValue:address
                       }).then(()=>{
                            props.navigation.navigate("ProfileScreen");
                        }).catch()
                        

                    }}>

                        <Text style={{
                            color: "#f03434", fontSize: 18
                        }}>save</Text>

                    </TouchableOpacity>

                </View>

            </SafeAreaView>


            <ScrollView>



                <View style={styles.settingsOptions}>
                    <Text style={styles.accSett}>Edit personal information</Text>

                        <View style={styles.personal}>

                            <Text style = {styles.Text}>Business Name</Text>
                            <TextInput  
                            style={styles.personalInformation}
                            placeholder = "Business Name"
                            onChangeText={(username)=>setUsername(username)}
                            value={getUserData(USERNAME)}
                            
                            />

                        </View>

                    <View style={styles.personal}>

                        <Text style={styles.Text}>Describe your Business</Text>
                        <TextInput  
                            style={styles.personalInformation}
                            placeholder = "Business Description"
                            onChangeText={(bio)=>setUserBio(bio)}
                            multiline
                            value={getUserData(USERBIO)}
                            />

                    </View>

                    <View style={styles.personal}>

                        <Text style={styles.Text}>Address</Text>
                        <TextInput  
                            style={styles.personalInformation}
                            placeholder = "ADDRESS"
                            onChangeText={(address)=>setUserAddress(address)}
                            value={getUserData(ADDRESS)}
                            />
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

    heyShahbek: {
        color: "#121212",
        width: '90%',
        alignSelf: "center",
        fontSize: 30,
        marginTop: 15,
    },
    settingsOptions: {
        width: "100%",
        height: "auto",
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 24,
        marginBottom: 25
    },
    accSett: {
        width: '80%',
        color: "#121212",
        marginBottom: 10,
        fontSize: 30
    },
   
    
    personal: {
        margin: 10,
        width:'100%',
        height: 'auto',
        justifyContent: "space-around",
        alignItems: "center"
        
    },
    Text: {
        height: 30,
        width: "80%",
        fontSize: 22
    },
    
    personalInformation:{
        width:"80%",
        borderColor:'red',
        borderWidth:1
    }

});

export default AccountSettings;
