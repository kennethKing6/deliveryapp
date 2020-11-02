import React, { Component, useState } from "react";
import { StyleSheet, View, StatusBar, Text, ImageBackground,Image, TouchableOpacity, SafeAreaView,TouchableHighlight,Modal, ScrollView } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ion from "react-native-vector-icons/Ionicons";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import styles from './styles';


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
                            color: "black", fontSize: 18
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


                <Text style={styles.heyShahbek}>Urban wear</Text>
                
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
                    onPress={() => props.navigation.navigate('signedOut')}
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
                                    source = {require('../../../assets/images/earth.gif')}/>
                                    
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



export default AccountSettings;
