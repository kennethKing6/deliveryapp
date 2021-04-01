import React, { useState,useEffect } from "react";
import { 
    StyleSheet, 
    View, 
    StatusBar, 
    Text, 
    TouchableOpacity, 
    SafeAreaView, 
    ScrollView,
    ImageBackground,
    TextInput,
     
 } from "react-native";
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import {ImageUploader} from '../../Model/ImageUploader';


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
     const PROFILE_PICTURE = 0;
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
                case PROFILE_PICTURE:
                    var localImage = null;
                   try{localImage = profilePicture.data}catch(err){localImage=null}

                   var remoteImage = null;
                   try{remoteImage = userProperties.userProfilePicture}catch(err){remoteImage=null}

                    localImage != null ? data = {uri:`data:image/gif;base64,${localImage}`} :
                    remoteImage != null? data =  {uri: remoteImage} : data = null;

                  

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

   
      function getImageProfile(){
        const options = {
            title: 'Make your business shine',           
            noData: false,
            quality:0.3,
          };

          ImagePicker.showImagePicker(options, (response) => {
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                setProfilePic(response);
              
          
            }
          });
      }

      

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
                            const imageUploader = new ImageUploader(userId);
                
                            imageUploader.uploadFile(profilePicture,"Profile Picture","profilePicture").then((uploadTask)=>{

                                return firebase.storage().ref(uploadTask.metadata.fullPath).getDownloadURL();

                            }).then((url)=>{

                                userPropertiesRef.update({
                                    userProfilePicture: url,
                                    username:username === null ? firebaseUsernameValue:username,
                                    userBio:userBio === null ?firebaseBioValue:userBio,
                                    address:address === null ? firebaseAddressValue:address
                                }).then(()=>{
                                        props.navigation.navigate("ProfileScreen");
                                    }).catch()
                        
                            }).catch(()=>{
                                userPropertiesRef.update({
                                username:username === null ? firebaseUsernameValue:username,
                                userBio:userBio === null ?firebaseBioValue:userBio,
                                address:address === null ? firebaseAddressValue:address
                            }).then(()=>{
                                    props.navigation.navigate("ProfileScreen");
                                }).catch()
                        
                            })

                        
                            

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

            

            <TouchableOpacity style={styles.rect2}
                onPress={()=>{
                    getImageProfile();
                }}
            >
                <ImageBackground
                    source={getUserData(PROFILE_PICTURE) === null? require("../../assets/icons/profilephoto_placeholder.png") : getUserData(PROFILE_PICTURE)}
                    resizeMode="center"

                    style={styles.listingImage1}
                ></ImageBackground>
            </TouchableOpacity>
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
                    style = {{fontWeight:'900',fontSize:13}} 
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
                    maxLength={400}
                    />
                    <Text style={{width:"100%",textAlign:"right",padding:2,color:"white"}}>
                    {(getUserData(USERBIO)== null ? 0 : getUserData(USERBIO).length) + "/400"}
                    </Text>
            </View>
            
            
        </View>
    </View>

    </View>


                    
                    

                    <View style = {{width: '90%', marginTop:10,alignSelf:'center',alignItems:'center'}}>

                        <Text style = {{color:'white', fontSize:20, fontWeight:'900',marginBottom:10}}>Select your theme</Text>
                    <View style = {{flexDirection:'row',justifyContent:'space-evenly',width:'100%'}}>
                    
                    
                    <TouchableOpacity>
                        <View style = {{width:70,height:70,borderRadius:70,backgroundColor:'#00336b'}}></View>
                    </TouchableOpacity>
                   

                    <TouchableOpacity>
                        <View style = {{width:70,height:70,borderRadius:70,backgroundColor:'white'}}></View>
                    </TouchableOpacity>
                    
                    

                    </View>

                    </View>
                    
                    
                
                </ScrollView>


            
            </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
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
