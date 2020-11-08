import React, { Component,useState,useEffect } from "react";
import { 
    StyleSheet, 
    View, 
    StatusBar, 
    Text, 
    TouchableOpacity, 
    SafeAreaView, 
    ScrollView,
    ImageBackground,
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
            <StatusBar barStyle="light-content" />


            <SafeAreaView >

            <View style={styles.TopNav}>

                        <TouchableOpacity style={{ justifyContent: "center"}}
                            onPress={() => props.navigation.navigate('AccountSettings')}>

                            <Text style={{
                                color: "white", fontSize: 20, fontWeight:'900'
                            }}>Cancel</Text>

                        </TouchableOpacity>

                       

                        <View style={{ justifyContent: "center", opacity: 100 }}>
                        
                        <TouchableOpacity 
                        style = {{backgroundColor:'#e2e8fe',borderRadius:30}}
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
                        

                    }}
                        >
                        <Text style={{
                                color: "black", fontSize: 20,fontWeight:'900',padding:10
                            }}>Save</Text>

                        </TouchableOpacity>

                        </View>

                    </View>

                

            </SafeAreaView>


            <ScrollView>

                

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
            <Text style={styles.shahbekMiru}>BUSINESS NAME</Text>
            <View style = {{flexDirection:'row'}}>
                <Text style={{fontSize:35,color:'#00336b'}}>@</Text>
                <TextInput
                style = {{fontWeight:'900',fontSize:35,left:5}} 
                placeholder = "Business Name"
                placeholderTextColor = "#00336b"
                color="#0093fb"
                onChangeText={(username)=>setUsername(username)}
                value={getUserData(USERNAME)}
                
                />
           </View>

           <View style = {{borderColor:'#0093fb',width:'100%',height:1,borderWidth:0.5,borderRadius:2,marginBottom:10,marginTop:10}}/>

           <Text style={styles.shahbekMiru}>ADRESS</Text>
                <TextInput
                style = {{fontWeight:'900',fontSize:30}} 
                placeholder = "Adress"
                placeholderTextColor = "#00336b"
                color="#0093fb"
                onChangeText={(address)=>setUserAddress(address)}
                value={getUserData(ADDRESS)}
                
                />
        </View>

        <View style = {{borderColor:'#0093fb',width:'100%',height:1,borderWidth:0.5,borderRadius:2,marginBottom:10,marginTop:10}}/>


        <View style={styles.group2}>
        <Text style={styles.shahbekMiru}>DESCRIPTION</Text>
                <TextInput
                style = {{fontWeight:'600',fontSize:18}} 
                placeholder = "Store description"
                multiline = {true}
                placeholderTextColor = "#00336b"
                color="#0093fb"
                onChangeText={(bio)=>setUserBio(bio)}
                value={getUserData(USERBIO)}
                maxLength = {250}
                />
        </View>
        
        
    </View>
</View>

</View>


                <Text style = {{color:'white',fontSize:20}}> COLORS</Text>
                
                <TouchableOpacity>
                <Text style = {{color:'white',fontSize:20}}> White</Text>

                </TouchableOpacity>
                
                <TouchableOpacity>
                <Text style = {{color:'white',fontSize:20}}> Blue</Text>

                </TouchableOpacity>
               
            </ScrollView>


           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },

    TopNav: {
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
        width: "100%",
        height: 'auto',
        alignItems: "flex-start",
        justifyContent: "space-around"
    },
    group2: {
        width: "100%",
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
