import React, { Component } from "react";
import { View, StatusBar, Text, ScrollView} from "react-native";
import LoginButtons from '../../components/LoginButtons';
import { StyleSheet} from 'react-native';


function WelcomeScreen(props) {
    return (

        
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.pageView}>
            
                <View style={styles.header}>
                    <Text style={styles.welcomeToDispatch}>
                        Welcome {"\n"}to Dispatch
                        </Text>
                    <Text style={styles.subtitle}>
                        Order nearby items and Dispatch
                        </Text>
                </View>

                <View style={styles.scroll}>
                    <View style={styles.scrollArea}>
                        <ScrollView
                            horizontal={false}
                            contentContainerStyle={styles.scrollArea_contentContainerStyle}
                        >
                            <View style={styles.cont1}>
                                <View style={styles.deliveryBox}>
                                    <Text style={styles.delivery}>Delivery</Text>
                                    <Text style={styles.immediate}>
                                        We offer immediate shipments directly to your door</Text>
                                </View>
                            </View>
                            <View style={styles.cont2}>
                                <View style={styles.deliveryBox1}>
                                    <Text style={styles.marketplace}>Marketplace</Text>
                                    <Text style={styles.immediate1}>
                                        Buy goods from local sellers around you </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                
                <View style={styles.buttons}>
                    <LoginButtons
                        onPress={() => props.navigation.navigate('SignUpScreen')}
                        text='Sign Up'

                    />
                    <LoginButtons
                        onPress={() => props.navigation.navigate('SignInScreen')}
                        style={{
                            backgroundColor:"black" }}
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
        width:"100%",
        height: "100%",
        flex: 1
    },
    header: {
        justifyContent: "flex-end",
        alignItems: "stretch",
        alignSelf: "stretch",
        flex: 1,
        
    },
    welcomeToDispatch: {
        fontWeight: 'bold',
        color: "#121212",
        fontSize: 40,
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

    scroll: {
        height: 398,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        flex: 2,
    },
    scrollArea: {
        width: "80%",
        height: "auto",
        backgroundColor: "rgba(238,238,238,1)",
        borderRadius: 15,
        
    },
    scrollArea_contentContainerStyle: {
        height: 306,
        width: 292,
        justifyContent: "flex-start"
    },
    cont1: {
        width: 292,
        height: 153,
        justifyContent: "center",
        alignItems: "center"
    },
    deliveryBox: {
        width: 268,
        height: 97,
        justifyContent: "space-around"
    },
    delivery: {
        color: "rgba(0,0,0,1)",
        fontSize: 24
    },
    immediate: {
        color: "rgba(155,155,155,1)",
        fontSize: 14
    },
    cont2: {
        width: 292,
        height: 153,
        justifyContent: "center",
        alignItems: "center"
    },
    deliveryBox1: {
        width: 268,
        height: 97,
        justifyContent: "space-around"
    },
    marketplace: {
        color: "rgba(0,0,0,1)",
        fontSize: 24
    },
    immediate1: {
        color: "rgba(155,155,155,1)",
        fontSize: 14
    },
    buttons: {
        justifyContent: "center",
        alignItems: "stretch",
        alignSelf: "stretch",
        flex: 1,
    },
    
    
});


export default WelcomeScreen;