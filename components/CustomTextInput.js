import React, { Component } from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";

function CustomTextInput(props) {
    return (

        <View style={styles.searchRectangle}>
            

                    <TextInput
                    style = {styles.input} 
                    placeholder = {props.placeholder}
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
        width: "80%",
        height: 38,
        backgroundColor: "#E6E6E6",
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: 'center',
        alignItems: "stretch",
        margin:5
    },
    
    
    input: {
        flex:0.95,
        fontFamily: "Regular",
        color: "#121212",
        fontSize: 20,
        
    },
    
});

export default CustomTextInput;
