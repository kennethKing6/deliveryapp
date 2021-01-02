import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

function CustomTextInput(props) {
    return (

        <View style={styles.searchRectangle}>
            
                    <TextInput
                    style = {[styles.input,props.style]} 
                    placeholder = {props.placeholder}
                    placeholderTextColor = {props.placeholderTextColor}
                    clearButtonMode = {props.clearButtonMode}
                    secureTextEntry = {props.secureTextEntry}
                    onChangeText = {(text) =>props.onChangeText(text)}
                    keyboardType = {props.keyboardType}
                    
                    />

                
            
        </View>

    );
}

const styles = StyleSheet.create({

    searchRectangle: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: "#F7F7F7",
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: 'center',
        alignItems: "stretch",
        margin:5
    },
    
    
    input: {
        flex:0.95,
        height:'100%',
        color: "#121212",
        fontSize: 20,
        
    },
    
});

export default CustomTextInput;
