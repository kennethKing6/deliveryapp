import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function SearchBar(props) {
    return (
        
            <View style={styles.searchRectangle}>
                <View style={styles.contents}>
                    <View style={styles.searchIconRow}>
                        <Icon name="search" style={styles.searchIcon}></Icon>
                        <TextInput placeholder="Search" clearButtonMode="always" style={styles.input}></TextInput>
                    </View>
                </View>
            </View>
        
    );
}

const styles = StyleSheet.create({
    
    searchRectangle: {
        width: "95%",
        height: 38,
        backgroundColor: "#E6E6E6",
        borderRadius: 10,
    },
    contents: {
        width: 341,
        height: 30,
        flexDirection: "row",
        marginTop: 4,
        marginLeft: 8
    },
    searchIcon: {
        color: "rgba(128,128,128,1)",
        fontSize: 22,
        marginTop: 4
    },
    input: {
        color: "#121212",
        width: 315,
        height: 30,
        fontSize: 25,
        marginLeft: 10,
        justifyContent: "center",
    },
    searchIconRow: {
        height: 30,
        flexDirection: "row",
        flex: 1
    }
});

export default SearchBar;
