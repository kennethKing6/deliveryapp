import React, { Component } from "react";
import {View, StyleSheet, TouchableOpacity, Text } from "react-native";

function LoginButtons(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View 
            style={[styles.registerButton, props.style]}>
                <Text style={[styles.signUp]}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
    registerButton: {
        width: "90%",
        height: 50,
        backgroundColor: "rgba(240,52,52,1)",
        borderRadius: 12,
        justifyContent: "center",
        alignSelf: "center",
        margin:5,
        bottom: 10,
    
    },
    signUp: {
        color: "rgba(255,255,255,1)",
        fontSize: 22,
        alignSelf: "center",
        justifyContent: "center",
    },
});

export default LoginButtons;
