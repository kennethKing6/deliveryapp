import React, { Component } from "react";
import { 
    StyleSheet, 
    View, 
    StatusBar, 
    Text, 
    TouchableOpacity, 
    SafeAreaView, 
    ScrollView,
 } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomTextInput from "../components/CustomTextInput";

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


            <ScrollView>



                <View style={styles.settingsOptions}>
                    <Text style={styles.accSett}>Edit personal information</Text>

                        <View style={styles.personal}>

                            <Text style = {styles.Text}>First Name</Text>
                            <CustomTextInput 
                            style={styles.personalInformation}
                            placeholder = "First Name"
                            
                            />

                        </View>

                    <View style={styles.personal}>

                        <Text style={styles.Text}>Last Name</Text>
                        <CustomTextInput
                            placeholder="Last Name"

                        />

                    </View>

                    <View style={styles.personal}>

                        <Text style={styles.Text}>Email</Text>
                        <CustomTextInput
                            placeholder="Email"

                        />

                    </View>
                    <View style={styles.personal}>

                        <Text style={styles.Text}>Phone number</Text>
                        <CustomTextInput
                            placeholder="Phone number"

                        />

                    </View>
                     <View style={styles.personal}>

                        <Text style={styles.Text}>Phone number</Text>
                        <CustomTextInput
                            placeholder="Phone number"

                        />

                    </View>
                    <View style={styles.personal}>

                        <Text style={styles.Text}>Phone number</Text>
                        <CustomTextInput
                            placeholder="Phone number"

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
    


});

export default AccountSettings;
