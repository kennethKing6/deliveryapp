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
import SearchBar from "../components/SearchBar";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";


function HomeScreen (props) {

 

    return (
        
        
        
        <View style={styles.container}>
                <StatusBar animated barStyle="dark-content" />
                
                
                    
        <SafeAreaView>
                    <ScrollView>

                        <View style={styles.header}>
                            <View style={styles.marketplace}>
                                
                                    <Text style={styles.marketplace1}>Explore</Text>
                                
                            </View>
                            
                            <SearchBar
                                style={styles.cupertinoSearchBarBasic1}
                            ></SearchBar>

                            <View style={styles.categories}>
                                <ScrollView
                                    horizontal={true}
                                    contentContainerStyle={styles.categories_contentContainerStyle}
                                >
                                    <View style={styles.group1Row}>
                                        <View style={styles.group1}>
                                            <View style={styles.rect1}>
                                                <View style={styles.rect2}>
                                                    <MaterialCommunityIconsIcon
                                                        name="bus"
                                                        style={styles.icon1}
                                                    ></MaterialCommunityIconsIcon>
                                                </View>
                                                <Text style={styles.vehicles1}>Vehicles</Text>
                                                <Text style={styles.loremIpsum1}>
                                                    Find the cars of your{"\n"}dreams
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.group2}>
                                            <View style={styles.rect3}>
                                                <View style={styles.rect4}>
                                                    <MaterialCommunityIconsIcon
                                                        name="home"
                                                        style={styles.icon2}
                                                    ></MaterialCommunityIconsIcon>
                                                </View>
                                                <Text style={styles.rentals1}>Rentals</Text>
                                                <Text style={styles.findHomes1}>Find homes</Text>
                                            </View>
                                        </View>
                                        <View style={styles.group3}>
                                            <View style={styles.rect5}>
                                                <View style={styles.rect6}>
                                                    <MaterialCommunityIconsIcon
                                                        name="cellphone-iphone"
                                                        style={styles.icon3}
                                                    ></MaterialCommunityIconsIcon>
                                                </View>
                                                <Text style={styles.electronics1}>Electronics</Text>
                                                <Text style={styles.findNewTech1}>Find new tech</Text>
                                            </View>
                                        </View>
                                        <View style={styles.group4}>
                                            <View style={styles.rect7}>
                                                <View style={styles.rect8}>
                                                    <MaterialCommunityIconsIcon
                                                        name="recycle"
                                                        style={styles.icon4}
                                                    ></MaterialCommunityIconsIcon>
                                                </View>
                                                <Text style={styles.free1}>Free</Text>
                                                <Text style={styles.promoteEcoLife1}>Promote eco life</Text>
                                            </View>
                                        </View>
                                        <View style={styles.group5}>
                                            <View style={styles.rect9}>
                                                <View style={styles.rect10}>
                                                    <MaterialCommunityIconsIcon
                                                        name="bus"
                                                        style={styles.icon5}
                                                    ></MaterialCommunityIconsIcon>
                                                </View>
                                                <Text style={styles.vehicles2}>Vehicles</Text>
                                                <Text style={styles.loremIpsum2}>
                                                    Find the cars of your{"\n"}dreams
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                        
                        
                        <View style={styles.content}>
                            
                            <View style = {{width: '90%', marginTop: 10, height : 'auto', alignSelf: 'center'}}>
                                <Text style = {{fontSize: 30, fontWeight: 'bold', color: '#f03434'}}>Listings Nearby</Text>
                            </View> 

                            <TouchableOpacity
                            onPress={() => props.navigation.navigate('AddListing',{product:'images'})}
                            >
                                
                                    <View style={styles.listing}>

                                    <ImageBackground
                                        source={require("../assets/images/car2.jpg")}
                                        resizeMode="cover"
                                        style={styles.listingImage1}
                                        
                                    >

                                    <View style = {styles.bLMTEXT}>
                                        <Text style = {styles.TextOverlay}>BMW M3</Text>
                                    </View>
                                    </ImageBackground>

                                        
                                    </View>
                            </TouchableOpacity>

                            
                                
                            

                                <View style={styles.listing}>

                                    <ImageBackground
                                        source={require("../assets/images/volkswagen.jpg")}
                                        resizeMode="cover"
                                        style={styles.listingImage1}
                                        
                                    >

                                    <View style = {styles.bLMTEXT}>
                                        <Text style = {styles.TextOverlay}>Volkswagen Golf</Text>
                                    </View>
                                    </ImageBackground>
                                    
                                </View>

                                <View style={styles.listing}>

                                    <ImageBackground
                                        source={require("../assets/images/macbook.jpg")}
                                        resizeMode="cover"
                                        style={styles.listingImage1}
                                    >
                                    <View style = {styles.bLMTEXT}>
                                        <Text style = {styles.TextOverlay}>MacBook Pro</Text>
                                    </View>

                                    </ImageBackground>
                                </View>

                                <View style={styles.listing}>

                                    <ImageBackground
                                        source={require("../assets/images/keyboard.jpg")}
                                        resizeMode="cover"
                                        style={styles.listingImage1}
                                    >
                                         <View style = {styles.bLMTEXT}>
                                        <Text style = {styles.TextOverlay}>Keyboard</Text>
                                    </View>
                                    </ImageBackground>
                                </View>


                            

                            <View style={styles.blackCardListing}>
                                    <View style={styles.bLMTEXT}>
                                        <Text style={styles.blmHeader}>
                                            We stand with{"\n"}#BlackLives Matter
                                        </Text>
                                        <Text style={styles.blmParagraph}>
                                            We believe in a world where everyone belongs. We reject all racism
                                            that stands in the way
                                         </Text>
                                        <Text style={styles.donate}>Donate </Text>
                                    </View>
                              
                            </View>

                            
                            
                            
                                
                            
                            


                        </View>
            
                    </ScrollView>
                    
                    
                    

        </SafeAreaView>
                    

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
        alignSelf: "center"
    },
    
    marketplace1: {
        fontWeight: 'bold',
        color: "#121212",
        fontSize: 50,
        marginTop: 60,
        marginLeft: 7,
        marginBottom: 7,
    },
    cupertinoSearchBarBasic1: {
        height: 54,
        alignSelf: "center"
    },
    categories: {
        height: 140,
    },
    categories_contentContainerStyle: {
        width: "135%",
        height: 140,
        flexDirection: "row"
    },
    group1: {
        width: 100,
        height: 120
    },
    rect1: {
        width: 100,
        height: 120,
        backgroundColor: "rgba(0,122,255,1)",
        borderRadius: 20,
        overflow: "visible"
    },
    rect2: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(10,132,255,1)",
        borderRadius: 15,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 30,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginTop: 12,
        marginLeft: 10
    },
    icon1: {
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        height: 43,
        width: 40,
        marginTop: 4,
        marginLeft: 4
    },
    vehicles1: {
        color: "rgba(255,255,255,1)",
        marginTop: 9,
        marginLeft: 10
    },
    loremIpsum1: {
        color: "rgba(255,255,255,1)",
        fontSize: 8,
        textAlign: "left",
        marginLeft: 10
    },
    group2: {
        width: 100,
        height: 120,
        marginLeft: 8
    },
    rect3: {
        width: 100,
        height: 120,
        backgroundColor: "rgba(255,59,48,1)",
        borderRadius: 20,
        overflow: "visible"
    },
    rect4: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(255,69,58,1)",
        borderRadius: 15,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 30,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginTop: 12,
        marginLeft: 10
    },
    icon2: {
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        height: 43,
        width: 40,
        marginTop: 4,
        marginLeft: 4
    },
    rentals1: {
        color: "rgba(255,255,255,1)",
        marginTop: 10,
        marginLeft: 10
    },
    findHomes1: {
        color: "rgba(255,255,255,1)",
        fontSize: 8,
        textAlign: "left",
        marginLeft: 10
    },
    group3: {
        width: 100,
        height: 120,
        marginLeft: 9
    },
    rect5: {
        width: 100,
        height: 120,
        backgroundColor: "rgba(255,149,0,1)",
        borderRadius: 20,
        overflow: "visible"
    },
    rect6: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(255,159,10,1)",
        borderRadius: 15,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 30,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginTop: 12,
        marginLeft: 10
    },
    icon3: {
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        height: 43,
        width: 40,
        marginTop: 4,
        marginLeft: 4
    },
    electronics1: {
        color: "rgba(255,255,255,1)",
        marginTop: 9,
        marginLeft: 10
    },
    findNewTech1: {
        color: "rgba(255,255,255,1)",
        fontSize: 8,
        textAlign: "left",
        marginLeft: 10
    },
    group4: {
        width: 100,
        height: 120,
        marginLeft: 10
    },
    rect7: {
        width: 100,
        height: 120,
        backgroundColor: "rgba(52,199,89,1)",
        borderRadius: 20,
        overflow: "visible"
    },
    rect8: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(48,209,88,1)",
        borderRadius: 15,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 30,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginTop: 12,
        marginLeft: 10
    },
    icon4: {
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        height: 43,
        width: 40,
        marginTop: 4,
        marginLeft: 4
    },
    free1: {
        color: "rgba(255,255,255,1)",
        marginTop: 9,
        marginLeft: 10
    },
    promoteEcoLife1: {
        color: "rgba(255,255,255,1)",
        fontSize: 8,
        textAlign: "left",
        marginLeft: 10
    },
    group5: {
        width: 100,
        height: 120,
        marginLeft: 15
    },
    rect9: {
        width: 100,
        height: 120,
        backgroundColor: "rgba(231,233,235,1)",
        borderRadius: 20,
        overflow: "visible"
    },
    rect10: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(255,59,48,1)",
        borderRadius: 15,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        elevation: 30,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginTop: 12,
        marginLeft: 10
    },
    icon5: {
        color: "rgba(255,255,255,1)",
        fontSize: 40,
        height: 43,
        width: 40,
        marginTop: 4,
        marginLeft: 4
    },
    vehicles2: {
        color: "rgba(0,0,0,1)",
        marginTop: 9,
        marginLeft: 10
    },
    loremIpsum2: {
        color: "rgba(255,59,48,1)",
        fontSize: 8,
        textAlign: "left",
        marginLeft: 10
    },
    group1Row: {
        height: 120,
        flexDirection: "row",
        flex: 1,
        marginRight: -175,
        marginLeft: 8,
        marginTop: 10
    },
    content: {
        flex: 1,
        paddingBottom: 70,
    },
   
    listing: {
        width: "90%",
        height: 298,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "center",
        shadowOffset: {
            width: 0,
            height: 7
        },
        elevation: 15,
        shadowOpacity: 0.5,
        shadowRadius: 8,
        
    },
    
    
    listingImage1: {
        height: '100%',
        width: '100%',
        backgroundColor: "white",
        borderRadius: 20,
        flex:1,
        overflow: "hidden",
    },
    
   
    TextOverlay: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
    },

    blackCardListing: {
        width: "90%",
        height: 'auto',
        marginTop: 10,
        alignSelf: "center",
        borderRadius: 15,
        backgroundColor: "rgba(0,0,0,1)",
        flex: 1
    },
    
    
    bLMTEXT: {
        width: '95%',
        alignSelf: 'center',
        height: "auto",
        margin: 10,
        justifyContent: 'flex-end',
        flex:1,
        
    },

    blmHeader: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        width: "100%",
        height: "auto",
        marginTop: 50
    },
    blmParagraph: {
        color: "rgba(255,255,255,1)",
        fontSize: 18,
        width: "100%",
        height: "auto",
        marginTop: 10
    },
    donate: {
        color: "rgba(255,255,255,1)",
        width: "100%",
        height: "auto",
        marginTop: 10,
        fontSize: 15
    },

    

});


export default HomeScreen;

