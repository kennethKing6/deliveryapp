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
    Animated,
    ImageBackground

} from "react-native";
import SearchBar from "../../components/SearchBar";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import Profiles from '../../../Model/Constants/CategoriesAppData';
import {SharedElement} from 'react-navigation-shared-element';
import {styles} from './styles';


export default function HomeScreen (props) {

    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        
        
        
        <View style={styles.container}>
                <StatusBar animated barStyle="dark-content" />
                
                
                    
        <SafeAreaView>
                    <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style = {{alignSelf:'center', justifyContent:'center'}}>

                    <Image
                        style = {{width:30,height:30,marginTop:5}}
                        source = {require('../../../assets/images/DispatchLogo.png')}
                    />

                    </View>
                        <View style={styles.header}>
                        
                            <View style={styles.marketplace}>
                                
                                    <Text style={styles.marketplace1}>Explore</Text>
                                
                            </View>
                            
                            <SearchBar
                                style={styles.cupertinoSearchBarBasic1}
                            ></SearchBar>

                            <View style={styles.categories}>
                                <ScrollView
                                    showsHorizontalScrollIndicator = {false}
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

                        
                            
                            <View style = {{width: '95%', marginTop: 10, height : 'auto', alignSelf: 'center'}}>
                                <Text style = {{fontSize: 20, fontWeight: '900', color: 'black'}}>Popular items</Text>
                            </View> 

                            

                                    <View>

                                        <Animated.FlatList
                                        onScroll = {Animated.event(
                                            [{nativeEvent: {contentOffset: {x: scrollX}}}],
                                            { useNativeDriver: true}
                                        )}
                                        showsHorizontalScrollIndicator={false}
                                        snapToInterval = {220}
                                        decelerationRate = {'fast'}
                                        data={Profiles}
                                        horizontal = {true}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({item, index}) => {
                                            
                                            const inputRange = [(index - 1) * 220, index * 220, (index+1)*220];
                                            const translateX = scrollX.interpolate({
                                                inputRange,
                                                outputRange: [50, 0 ,-50],
                                            });
                                            const scale = scrollX.interpolate({
                                                inputRange,
                                                outputRange: [1,1.1,1],
                                            });
                                            return(
                                            
                                            <TouchableWithoutFeedback style = {[{
                                                width:200,
                                                height:200,
                                                margin:10}]} onPress={()=>{
                                                props.navigation.push('AddListing',{item})
                                            }}>
                                                
                                                <SharedElement id= {`item.${item.key}.photo`} style = {[StyleSheet.absoluteFillObject]}>

                                                    <View style = {[StyleSheet.absoluteFillObject, 
                                                    {overflow: 'hidden', 
                                                    borderRadius:20}]}>

                                                        <Animated.Image
                                                        useNativeDriver = {true}
                                                        style = {[StyleSheet.absoluteFillObject,
                                                        {
                                                            resizeMode: 'cover',
                                                            borderRadius:20,
                                                            width:'100%',
                                                            height:'100%',
                                                            transform:[{scale}],
                                                        }
                                                        ]}
                                                        source={item.src} />
                                                        
                                                    </View>
                                                </SharedElement>

                                                

                                                <View style = {styles.bLMTEXT}>
                                                
                                                {/* <SharedElement id= {`item.${item.key}.title`}> */}

                                                <Animated.Text 
                                                style = {[styles.TextOverlay2,
                                                 {transform: [{translateX}]}
                                                ]}>
                                                {item.name}</Animated.Text>
                                                {/* </SharedElement> */}
                                                </View>
                                            </TouchableWithoutFeedback>
                                            
                                            );
                                        }}
                                        
                                        />

                                    </View>
                           
                            
                                
                                    <View style = {{width: '95%', marginTop: 10, height : 'auto', alignSelf: 'center'}}>
                                <Text style = {{fontSize: 20, fontWeight: '900', color: 'black'}}>For You</Text>
                            </View> 

                                <TouchableOpacity onPress={()=>props.navigation.navigate("MessageListScreen")}>
                                <View style={styles.listing} >
                                    <ImageBackground
                                        source={require("../../../assets/images/volkswagen.jpg")}
                                        resizeMode="cover"
                                        style={styles.listingImage1}
                                        
                                    >

                                    <View style = {styles.bLMTEXT}>
                                        <Text style = {styles.TextOverlay}>Volkswagen Golf</Text>
                                    </View>
                                    </ImageBackground>
                                    
                                </View>
                                </TouchableOpacity>

                                <View style={styles.listing}>

                                    <ImageBackground
                                        source={require("../../../assets/images/macbook.jpg")}
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
                                        source={require("../../../assets/images/keyboard.jpg")}
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


