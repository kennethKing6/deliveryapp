import React,{useState }from "react";
import { StyleSheet, View, StatusBar, Text,Image} from "react-native";
import LoginButtons from "../../components/LoginButtons";
import CustomTextInput from '../../components/CustomTextInput';
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import { TouchableOpacity } from "react-native-gesture-handler";


function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    return (

        <View style={styles.container}>

            <StatusBar barStyle="dark-content" />


            <View style={styles.pageView}>

            



                <View style = {{backgroundColor:'white', borderRadius:30, padding:5,
                shadowOffset: {
                    width: 0,
                    height: 0
                },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                }}>

                    <Image
                        style = {{width:100,height:100}}
                        source={require("../../../../src/assets/images/DispatchLogo.png")}
                    />
                    

                </View>

                <View style = {{width:'90%'}}>
                
                    <CustomTextInput 

                        placeholder="Email or Username"
                        clearButtonMode='always'
                        onChangeText={(text) => {setEmail(text)}}
                        placeholderTextColor = {'black'}
                        defaultValue={email}

                    />
                    <CustomTextInput
                        placeholder="Password"
                        clearButtonMode='always'
                        secureTextEntry={true}
                        placeholderTextColor = {'black'}

                        onChangeText={(text) => {setPassword(text)}}
                    />
                    
                    <View style = {{alignSelf:'flex-end',marginTop:10,marginBottom:10}}>
                    
                        <Text style = {{fontSize:17,fontWeight:'500', color:'#00a3ff'}}>Forgot your password?</Text>

                    </View>

                <View style={styles.buttons}>

                <LoginButtons
                        onPress={ ()=>{
                            console.log("email",email)
                                firebase.auth()
                                .signInWithEmailAndPassword (email, password)
                                .then()
                                .catch(error => {
                                    console.log("Sign in error",error)
                                     alert(error);
                                });
                            }
                        }
                        style = {{
                            marginTop:10,
                            marginBottom:10,
                            backgroundColor:'#00a3ff',
                            shadowColor: "#222222",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 7,
                            }}
                        text='Login'
                     />

                </View>
                
                <View style = {{alignItems:'center',marginTop:10}}>
                    <Text style = {{fontSize:17, fontWeight:'500',color:'grey',marginBottom:10}}>OR</Text>
                    
                    <TouchableOpacity onPress = {() => {props.navigation.navigate('SignUpScreen')}}>
                    <Text style = {{fontSize:17, fontWeight:'500',color:'black'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                </View>





            </View>

        </View>




    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,1)"
    },
    pageView: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "100%",
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
        width: "100%",
        height: "auto",
        alignSelf: "center",
    },
    

    buttons: {
        justifyContent: "center",
        alignItems: "stretch",
        alignSelf: "stretch",
    },

});

export default Login;
