import React from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    ScrollView,
    SafeAreaView,
    TextInput,
    Dimensions
    

} from "react-native";
import SearchBar from "../../components/SearchBar";
import Feather from "react-native-vector-icons/Feather";
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "native-base";


function HomeScreen1 (props) {

 

    return (
        
        
        
        <View style={styles.container}>
                <StatusBar animated barStyle="dark-content" />
                
                <SafeAreaView>
                <View style={styles.TopNav}>

                    <TouchableOpacity style={{ justifyContent: "center", borderRadius: 20, backgroundColor: '#E6E6E6'}}
                        onPress={() => props.navigation.navigate('UploadScreen')}>

                        <Feather
                            name="arrow-left"
                            style={styles.icon1}
                        />

                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center', marginTop: 5 }}>

                        <Text style={{
                            color: "black", fontSize: 18, opacity: 0
                        }}>Settings</Text>

                    </View>

                    <View style={{ justifyContent: "center", opacity: 0 }}>

                        <Feather
                            name="arrow-left"
                            style={styles.icon1}
                        ></Feather>

                    </View>

                </View>
                </SafeAreaView>
                
                <ScrollView>
                    

                        <TouchableOpacity>

                                    <Text style={styles.marketplace1}>What are you selling?</Text>
                        </TouchableOpacity>
                                
                            
                        <View style={styles.searchRectangle}>
                            <View style={styles.contents}>
                                <View style={styles.searchIconRow}>
                                    <Feather name="search" style={styles.searchIcon}></Feather>
                                    <TextInput placeholder="Title" clearButtonMode="always" style={styles.input}></TextInput>
                                </View>
                            </View>
                        </View>
                            
            

                            
                    
                    

        </ScrollView>
                        <Button 
                        onPress={() => props.navigation.navigate('ProductDescriptionScreen')}
                        style = {styles.Button}>
                            <Feather 
                            style = {styles.icon2}
                            name= 'arrow-right'/>
                        </Button>
                </View>
            


        


    );
               
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    TopNav: {
        width: '90%',
        height: 'auto',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: "center", 
        justifyContent: 'space-between'
    },
    icon1: {
        color: "#2ecc71",
        fontSize: 30,

    },
    
    
    marketplace1: {
        fontWeight: 'bold',
        color: "#121212",
        width: '90%',
        alignSelf: "center",
        fontSize: 50,
        marginBottom: 10,
    },
    cupertinoSearchBarBasic1: {
        height: 54,
        alignSelf: "center"
    },
    listItem: {
        color: 'white',
        fontSize: 20,
        

    },
    sellItem: {
        width: "90%", 
        height: 'auto', 
        backgroundColor: '#2ecc71',
        borderRadius: 30,
        height: 50,
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        
    },
    banner: {
        marginTop: 20,
        width: "100%",
        height: 48,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rating1: {
        flex: 1,
        width: 'auto',
        height: 48,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    loremIpsum: {
        color: "#2ecc71",
        fontSize: 40
    },
    rating: {
        fontSize: 20
    },
    

    // SEARCHBAR STYLING - TURN INTO COMPONENT
    searchRectangle: {
        width: "90%",
        height: 50,
        backgroundColor: "#E6E6E6",
        borderRadius: 30,
        overflow: 'hidden',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    contents: {
        width: '95%',
        height: 'auto',
        flexDirection: "row",
    },
    searchIcon: {
        color: "black",
        fontSize: 22,
        marginTop: 4
    },
    input: {
        color: "#121212",
        width: "90%",
        height: 30,
        fontSize: 25,
        marginLeft: 5,
        justifyContent: "center",
    },
    searchIconRow: {
        height: 30,
        flexDirection: "row",
        flex: 1
    },
    //end 

    //button
    Button: {
        position: "absolute",
        bottom: Dimensions.get("window").width / 20,
        width: 60,
        height: 60, 
        borderRadius: 30,
        backgroundColor: "#2ecc71",
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: "center",
        alignSelf: "center"
    },
    icon2: {
        color: "white",
        fontSize: 30,

    },

});


export default HomeScreen1;

