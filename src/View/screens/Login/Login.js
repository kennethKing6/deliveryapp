import React,{useState }from "react";
import { StyleSheet, View, StatusBar, Text} from "react-native";
import LoginButtons from "../../components/LoginButtons";
import CustomTextInput from '../../components/CustomTextInput';
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';


function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    return (

        <View style={styles.container}>

            <StatusBar barStyle="dark-content" />


            <View style={styles.pageView}>

            

                <View style={styles.header}>

                    <Text style={styles.signUp}>Login</Text>
                    <Text style={styles.subtitle}>Don't have an account? SignUp.</Text>
                    

                </View>



                <View style={styles.scroll}>
                
                    <CustomTextInput 

                        placeholder="Email or Username"
                        clearButtonMode='always'
                        onChangeText={(text) => {setEmail(text)}}
                         defaultValue={email}

                    />
                    <CustomTextInput
                        placeholder="Password"
                        clearButtonMode='always'
                        secureTextEntry={true}
                        onChangeText={(text) => {setPassword(text)}}
                    />
                </View>

                <View style={styles.buttons}>

                <LoginButtons
                        onPress={ 
                            ()=>{
                                firebase.auth()
                                .signInWithEmailAndPassword (email, password)
                                .then(() => {
                                
                                })
                                .catch(error => {
                                
                            
                                alert(error);
                                });
                            }
                        }
                        text='Login'
                     />

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
        flex: 1
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
    scroll: {
        height: 398,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: 'center',
        overflow: "hidden",
        flex: 2,
    },


    buttons: {
        justifyContent: "center",
        alignItems: "stretch",
        alignSelf: "stretch",
        flex: 1,
    },

});

export default Login;
