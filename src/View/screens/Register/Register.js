import React, { Component,useState} from "react";
import { StyleSheet, View, StatusBar, Text} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoginButtons from "../../components/LoginButtons";
import CustomTextInput from '../../components/CustomTextInput';
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * This is used to make sure the user correctly 
 * filled up the form 
 * 
 * @author Kouadio Kenneth
 * 
 * @param {user email} email 
 * @param {*} password 
 * @param {*} resetPassword 
 * @param {*} phone 
 * @param {*} firstName 
 * @param {*} lastName 
 * 
 * @return returns true if all the condition have been met
 */
function validateForm(email,password,resetPassword,phone,firstName,lastName){
    console.log("phone number is " + phone)
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    //Regex for a 10 digit phone number
    const phoneRegex = /\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/;

    if(!emailRegex.test(String(email).toLowerCase())){
        alert("Please enter a valid email address");
        return false;
    }else if(! (resetPassword === password)){
        alert("Passwords need to match");
        return false;
    }
    else if(firstName == "" || lastName == ""){
        //For anything else, prompt the user to
        //complete the form if
        //-The  firstname and lastname fields are empty
        alert("Please enter your first and last name");
        return false;
    }else if(!phoneRegex.test(String(phone))){
        alert("Please enter a valid phone number");
        return false;
    }
    return true;
}


function Register(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetPassword, setresetPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); 
    const [firstName, getFirstName] = useState(""); 
    const [lastName, getLastName] = useState(""); 


    return (

        <KeyboardAwareScrollView 
        style={{ 
        backgroundColor: "rgba(255,255,255,1)" }}
        resetScrollToCoords= {{x: 0, y: 0}} 
        contentContainerStyle = {styles.container}
        scrollEnabled = {false}
        >
            <View style={styles.container}>
                    
                    <StatusBar barStyle="dark-content" flex={1}/>

                    
                    <View style = {styles.pageView}>


                            <View style = {styles.header}>
                                <Text style={styles.signUp}>Sign up</Text>
                                <Text style={styles.subtitle}>Already have an account? Log in.</Text>
                             </View>

                             <View style={styles.scroll}>
                                  

                                        <CustomTextInput
                                        
                                        placeholder = "First name"
                                        clearButtonMode = 'always'
                                        onChangeText = {(firstName) => {getFirstName(firstName)}}
                                        />
                                        <CustomTextInput 
                                        placeholder="Last name"
                                        clearButtonMode='always'
                                        onChangeText = {(lastName) => {getLastName(lastName)}}
                                        />
                                        <CustomTextInput
                                            placeholder="Phone number"
                                            keyboardType = 'phone-pad'
                                            clearButtonMode='always'
                                            onChangeText = {(phoneNumber) => {setPhoneNumber(phoneNumber)}}
                                        />
                                        <CustomTextInput 
                                        placeholder="Email address"
                                        keyboardType = 'email-address'
                                        clearButtonMode='always'
                                        onChangeText = {(email) => {setEmail(email)}}
                                        />
                                        <CustomTextInput
                                        placeholder="Password"
                                        clearButtonMode='always'
                                        secureTextEntry={true}
                                        onChangeText = {(password) => {setPassword(password)}}

                                        />
                                        <CustomTextInput
                                            placeholder="Confirm password"
                                            clearButtonMode='always'
                                            secureTextEntry = {true}
                                            onChangeText = {(resetPassword) => {setresetPassword(resetPassword)}}

                                        />
                                        


                        
                        

                                    
                                </View>

                            <View style = {styles.buttons}>

                            <LoginButtons
                                        onPress={() => {
                                                if(validateForm(email,password,resetPassword,phoneNumber,firstName,lastName)){
                                                    const credentials = {
                                                        email:email,
                                                        password:password,
                                                        phoneNumber:phoneNumber,
                                                        firstName:firstName,
                                                        lastName:lastName
                                                    }
                                                    AsyncStorage.setItem('@user_properties', JSON.stringify(credentials))
                                                    .then(()=>{
                                                        props.navigation.navigate("IntroductionScreen")
                                                    }).catch(()=>{
                                                        alert("Registration failed please try again later!")
                                                    })
                                                    
                                                }
                                            }}
                                        text = 'Sign Up'
                                        
                                    />

                                <Text style = {{alignSelf:'center', color:'grey',fontSize:13,fontWeight:'400' ,width:'80%',textAlign:'center'}}>
                                By tapping 'Sign Up'and using the Dispatch app, you're agreeing with our <Text style = {{color:"rgba(240,52,52,1)"}}>terms of service</Text> and <Text style = {{color:"rgba(240,52,52,1)"}}>privacy policy.</Text></Text>

                                </View>


                    </View>

                        
                        
                    
                </View>

        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,1)"
    },
    pageView: {
        justifyContent: "space-around",
        flex:4,
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    header: {
        justifyContent: "flex-end",
        alignItems: "stretch",
        alignSelf: "stretch",
        flex: 1,

    },
    signUp: {
        color: "#121212",
        fontSize: 50,
        width: "80%",
        height: "auto",
        alignSelf: "center",
    },
    subtitle: {
        fontSize: 20,
        color: "rgba(155,155,155,1)",
        width: "80%",
        height: "auto",
        alignSelf: "center",
    },
     
    
    buttons: {
        justifyContent: "center",
        alignItems: "stretch",
        alignSelf: "stretch",
        flex: 1,
    },
    scroll: {
        alignSelf: "stretch",
        alignItems: "center",
        overflow: "hidden",
        flex: 2,
        flexGrow: 2, 
        justifyContent: 'center' 
    },
    
  
    
});

export default Register;