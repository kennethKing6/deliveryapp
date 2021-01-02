import React, { useState } from "react";
import { StyleSheet, View, StatusBar, Text,Image, TouchableOpacity, SafeAreaView,TouchableHighlight,Modal, ScrollView } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ion from "react-native-vector-icons/Ionicons";
import { BlurView } from "@react-native-community/blur";
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';


import LoginButtons from "../../components/LoginButtons";

function AccountSettings(props) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            
            <StatusBar barStyle="dark-content" />

            <SafeAreaView >

                <View style={styles.TopNav}>

                    <TouchableOpacity style={{ justifyContent: "center"}}
                        onPress={() => props.navigation.navigate('ProfileScreen')}>

                        <Feather
                            name="arrow-left"
                            style={styles.icon1}
                        />

                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center', marginTop: 5 }}>

                        <Text style={{
                            color: "black", fontSize: 24, fontWeight:'900'
                        }}>Settings</Text>

                    </View>

                    <View style={{ justifyContent: "center", opacity: 0 }}>

                        <MaterialCommunityIconsIcon
                            name="dots-vertical"
                            style={styles.icon1}
                        ></MaterialCommunityIconsIcon>

                    </View>

                </View>

            </SafeAreaView>
            
            <ScrollView>


                {/* <Text style={styles.heyShahbek}>Urban wear</Text> */}
                
                <View style={styles.settingsOptions}>
                    
                    
                    <View style={styles.settingOpts}>
                        <TouchableOpacity 
                        style = {styles.settings}
                        onPress={() => props.navigation.navigate('PersonalInformation')}
                        >
                        <View style = {styles.personal}>
                            <Feather
                                name="mail"
                                style={styles.icon1}
                            />
                            <Text style={styles.personalInformation}>Account</Text>

                        </View>
                        <Feather name = 'chevron-right' style = {[styles.icon1,{color:'grey'}]} />

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settings}>
                            <View style = {styles.personal}>
                            
                                <Feather
                                    name="save"
                                    style={styles.icon1}
                                />
                                <Text style={styles.personalInformation}>Saved </Text>

                            </View>
                            <Feather name = 'chevron-right' style = {[styles.icon1,{color:'grey'}]} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={() => props.navigation.navigate('PaymentCard')}
                        style={styles.settings}>
                        <View style = {styles.personal}>
                            <Ion
                                name="card-outline"
                                style={styles.icon1}
                            />
                            <Text style={styles.personalInformation}>Payments</Text>
                            
                        </View>
                        <Feather name = 'chevron-right' style = {[styles.icon1,{color:'grey'}]} />

                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={styles.settings}
                        >
                        <View style = {styles.personal}>

                            <Feather
                                name="settings"
                                style={styles.icon1}
                            />
                            <Text style={styles.personalInformation}>Settings</Text>

                        </View>
                        <Feather name = 'chevron-right' style = {[styles.icon1,{color:'grey'}]} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={styles.settings}
                        onPress={() => props.navigation.navigate('UploadProductScreen')}
                        >
                         <View style = {styles.personal}>
                            <Feather
                                name="plus-circle"
                                style={styles.icon1}
                            />
                            <Text style={styles.personalInformation}>Add </Text>
                            </View>
                        
                            <Feather name = 'chevron-right' style = {[styles.icon1,{color:'grey'}]} />
                        
                        </TouchableOpacity>
                        
                        <View style = {{borderColor:'lightgrey',width:'100%',height:1,borderWidth:0.5,borderRadius:2,marginBottom:10}}/>

                        <TouchableOpacity style={styles.settings}>
                            <View style = {styles.personal}>
                            
                                <Ion
                                    name="mail-unread-outline"
                                    style={styles.icon1}
                                />
                                <Text style={styles.personalInformation}>Help and support </Text>

                            </View>
                            <Feather name = 'chevron-right' style = {[styles.icon1,{color:'grey'}]} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settings}>
                        <View style = {styles.personal}>
                            <Feather
                                name="users"
                                style={styles.icon1}
                            />
                            <Text style={styles.personalInformation}>FAQ</Text>
                            
                        </View>
                        <Feather name = 'chevron-right' style = {[styles.icon1,{color:'grey'}]} />

                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={styles.settings}
                        >
                        <View style = {styles.personal}>

                            <Feather
                                name="info"
                                style={styles.icon1}
                            />
                            <Text style={styles.personalInformation}>About</Text>

                        </View>
                        <Feather name = 'chevron-right' style = {[styles.icon1,{color:'grey'}]} />
                        </TouchableOpacity>

                        <View style = {{borderColor:'lightgrey',width:'100%',height:1,borderWidth:0.5,borderRadius:2,marginBottom:10}}/>

                        <TouchableOpacity 
                        style={styles.settings}
                        title="OPEN BOTTOM SHEET" 
                        onPress={() => {
                        setModalVisible(true);
                        }}
                        >
                        <View style = {styles.personal}>

                            <Feather
                                name="thumbs-up"
                                style={styles.icon1}
                            />
                            <Text style={styles.personalInformation}>Rate us</Text>

                        </View>
                        <Feather name = 'chevron-right' style = {[styles.icon1,{color:'grey'}]} />
                        </TouchableOpacity>

                    </View>
                </View>
                
                <LoginButtons
                    onPress={() => {
                        firebase.auth()
                        .signOut()
                        .then()}}
                    style={{
                        backgroundColor: "black"
                    }}
                    color='black'
                    text='Sign Out'

                />
                    

           
                    
                    
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
                            blurType="dark"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="white"
                            />

                            <View style={styles.centeredView2}>
                            
                            
                            <View style={styles.modalView}>
                            

                                    <View style = {{width:'100%'}}>

                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: "#00000033" }}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                            }}
                                        >
                                            
                                            <Feather name = 'x' style={styles.textStyle}></Feather>
                                        </TouchableHighlight>
                                    </View>

                                    <Image 
                                    resizeMode= 'cover'
                                    style = {{width:'50%',height:'50%'}}
                                    source = {require('../../assets/images/earth.gif')}/>
                                    
                                    <Text style={styles.modalText}>How did we do?</Text>
                                    
                                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-evenly'}}>
                                        <View style={{backgroundColor:'#2ecc71',borderRadius:30,justifyContent:'center'}}>
                                            <Feather name = 'thumbs-up' style = {{fontSize:40,padding:10,color:'white'}}/>
                                        </View>
                                        <View style={{backgroundColor:'#e74c3c',borderRadius:30,justifyContent:'center'}}>
                                            <Feather name = 'thumbs-down' style = {{fontSize:40,padding:10,color:'white'}}/>
                                        </View>                                   

                                    </View>
                                
                                </View>
                                        
                            </View>
                            
                        </Modal>

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
        color: "#2ecc71",
        fontSize: 25,

    },

    heyShahbek: {
        color: "#121212",
        width: '90%',
        alignSelf: "center",
        fontSize: 30,
        fontWeight:'900',
        marginTop: 15,
    },
    settingsOptions: {
        width: "100%",
        height: "auto",
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 25
    },
    settings: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center',
        marginBottom:10

    },
    accSett: {
        width: '90%',
        color: "#121212",
        marginBottom: 10,
        fontSize: 25
    },
    settingOpts: {

        width: '90%',
        height: 'auto',
        justifyContent: "space-between"
    },
    personal: {
    
        height: 35,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    personalInformation: {
        
        color: "#121212",
        fontSize: 17,
        marginLeft:10
    },

    centeredView: {
        flex:1,
        // backgroundColor: '#00000099',
              
        
      },
      centeredView2: {
        flex:1,
        
        // backgroundColor: '#00000099',
        justifyContent: "center",
        alignItems: "center",        
        
      },
      
      
      modalView: {
        width:'80%',
        height:'60%',
        padding:20,
        justifyContent:'space-between',
        backgroundColor: "#f5f7f8",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
      },
      openButton: {
        width:30,
        borderRadius: 30,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontSize:30,
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        fontSize:30,
        fontWeight:'600',
        textAlign: "center"
      },
      absolute: {
        position:'absolute',
        width: '100%',
        height:'100%',
      }
   

});

export default AccountSettings;
