import React, { Component } from "react";
import { View, StatusBar, Text, ScrollView,Image} from "react-native";
import LoginButtons from '../../components/LoginButtons';
import { StyleSheet} from 'react-native';


function WelcomeScreen(props) {
    return (

        
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
           
            <View style={styles.pageView}>
            
                <View style = {{alignItems:'center'}}>
                <Image
                    style = {{width:100,height:100}}
                    source={require("../../../../src/assets/images/DispatchLogo.png")}
                />
                            
                    <Text style={styles.welcomeToDispatch}>
                       dispatch
                        </Text>
                    
                </View>

                
                
                <View style={styles.buttons}>
                    <LoginButtons
                        onPress={() => props.navigation.navigate('SignUpScreen')}
                        style = {{
                            backgroundColor:'#00a3ff',
                            marginBottom:10,
                            shadowColor: "#222222",
                            shadowOffset: {
                                width: 0,
                                height: 4
                            },
                            shadowOpacity: 0.4,
                            shadowRadius: 5,
                            }}
                        text='Sign Up'

                    />
                    <LoginButtons
                        onPress={() => props.navigation.navigate('SignInScreen')}
                        style={{
                            backgroundColor:"#303030",
                            marginBottom:10,
                            shadowColor: "#222222",
                            shadowOffset: {
                                width: 0,
                                height: 4
                            },
                            shadowOpacity: 0.4,
                            shadowRadius: 5,
                             }}
                        color = 'black'
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
        backgroundColor: "white"
    },
    pageView: {
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf:'center',
        width:"90%",
        height: "100%",
    },
    
    welcomeToDispatch: {
        fontWeight: '900',
        color: "#121212",
        fontSize: 60,
        width: "80%",
        height: "auto",
        alignSelf: "center",
    },
    subtitle: {
        fontSize:20,
        color: "rgba(155,155,155,1)",
        width: "80%",
        height: "auto",
        alignSelf: "center",
    },

    buttons: {
        justifyContent: "center",
        alignItems: "stretch",
        alignSelf: "stretch",
    },
    
    
});


export default WelcomeScreen;