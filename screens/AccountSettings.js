import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import LoginButtons from "../components/LoginButtons";

function AccountSettings(props) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />


            <SafeAreaView >

                <View style={styles.TopNav}>

                    <TouchableOpacity style={{ justifyContent: "center"}}
                        onPress={() => props.navigation.navigate('ProfileScreen')}>

                        <MaterialCommunityIconsIcon
                            name="arrow-left"
                            style={styles.icon1}
                        ></MaterialCommunityIconsIcon>

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


                <Text style={styles.heyShahbek}>Hey Shahbek!</Text>
                
                <View style={styles.settingsOptions}>
                    <Text style={styles.accSett}>Account Settings</Text>
                    
                    <View style={styles.settingOpts}>
                        <TouchableOpacity 
                        style={styles.personal}
                        onPress={() => props.navigation.navigate('PersonalInformation')}
                        >
                            <Text style={styles.personalInformation}>Personal information</Text>
                            <MaterialCommunityIconsIcon
                                name="account-outline"
                                style={styles.icon1}
                            ></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.personal}>
                            <Text style={styles.personalInformation}>Profile settings</Text>
                            <MaterialCommunityIconsIcon
                                name="store"
                                style={styles.icon1}
                            ></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.personal}>
                            <Text style={styles.personalInformation}>Payments</Text>
                            <MaterialCommunityIconsIcon
                                name="cash-usd"
                                style={styles.icon1}
                            ></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.personal}
                        onPress={() => props.navigation.navigate('AddListing')}
                        >
                            <Text style={styles.personalInformation}>Add new listings</Text>
                            <MaterialCommunityIconsIcon
                                name="cash-usd"
                                style={styles.icon1}
                            ></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.personal}
                        onPress={() => props.navigation.navigate('UploadProductScreen')}
                        >
                            <Text style={styles.personalInformation}>Add products</Text>
                            <MaterialCommunityIconsIcon
                                name="cash-usd"
                                style={styles.icon1}
                            ></MaterialCommunityIconsIcon>
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
        justifyContent: "space-between",
        alignItems: "center"
    },
    personalInformation: {
        
        color: "#121212",
        fontSize: 19
    },
   

});

export default AccountSettings;
