import React from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    ScrollView,
    FlatList,
    SafeAreaView,
    Image,
    ImageBackground

} from "react-native";
import SearchBar from "../../components/SearchBar";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";


function HomeScreen1 (props) {

 

    return (
        
        
        
        <View style={styles.container}>
                <StatusBar animated barStyle="dark-content" />
                
                
                <ScrollView>
        <SafeAreaView>
                    

                        <View style={styles.header}>
                            <View style={styles.marketplace}>
                                
                                    <Text style={styles.marketplace1}>Selling</Text>
                                
                            </View>
                            
                            
                            

                         </View>   

                            <TouchableOpacity 
                            onPress={() => props.navigation.navigate('ListItems')}
                            style = {styles.sellItem}>

                                <Text style = {styles.listItem}> List an item</Text>

                            </TouchableOpacity>

                        
                         <View style={styles.marketplace}>
                                
                                <Text style={{fontSize: 35, color: 'grey', marginTop : 10}}>C$0.00</Text>
                            
                        </View>
                        
                         <View style={styles.banner}>
                                            <View style={styles.rating1}>
                                                <Text style={styles.loremIpsum}>0</Text>
                                                <Text style={styles.rating}>Active</Text>
                                            </View>
                                            <View style={styles.rating1}>
                                                <Text style={styles.loremIpsum}>0</Text>
                                                <Text style={styles.rating}>Sold</Text>
                                            </View>
                                            <View style={styles.rating1}>
                                                <Text style={styles.loremIpsum}>0</Text>
                                                <Text style={styles.rating}>Unsold</Text>
                                            </View>
                                        </View>
                            
                            
                            
                                
                            
                            


            
                    
                    
                    
                    

        </SafeAreaView>
        </ScrollView>

                </View>
            


        


    );
               
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    
    header: {
        height: "auto",
        width: "100%",
        alignItems: "center",
    },
    marketplace: {
        width: "100%",
        height: "auto",
        alignSelf: "center",
        alignItems: 'center'
    },
    
    marketplace1: {
        fontWeight: 'bold',
        color: "#121212",
        width: '90%',
        fontSize: 50,
        marginTop: 60,
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

    

});


export default HomeScreen1;

