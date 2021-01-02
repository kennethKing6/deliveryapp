import React,{useEffect} from "react";
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
    Dimensions,
    ImageBackground

} from "react-native";
import SearchBar from "../../components/SearchBar";
import Feather from "react-native-vector-icons/Feather";
import { TouchableWithoutFeedback, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profiles from '../../model/Constants/CategoriesAppData';
import {SharedElement} from 'react-navigation-shared-element';
import {styles} from './styles';
import SellerData from './Sellers';
import ProductData from './Products';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

export default function HomeScreen (props) {


     //  firebase references
     const userId = firebase.auth().currentUser.uid;
     const ref = firebase.database().ref("users/" + userId);
     const userPropertiesRef = ref.child("user_properties");


     useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            messaging().getToken().then((token)=>{
                return uploadUserData(token)
             }).catch(()=>{
                return uploadUserData(null)
             })
        
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [props.navigation]);
    
     async function uploadUserData(token){
        AsyncStorage.getItem('@user_properties').then((properties)=>{
            const values =  properties != null ? JSON.parse(properties) : null;
            
            if(token != null){
                values['token'] = token;
            }
            if(values){
                return ref.update({user_properties:values})

            }else{
                return null;
            }
        }).catch((err)=>{
            console.log("err",err)
        })
     }
   
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        
        
        
        <View style={styles.container}>

                <StatusBar animated barStyle="dark-content" />
                
                
                    
                    
        <SafeAreaView>

                    <View style = {{alignSelf:'center',flexDirection:'row',justifyContent:'space-between',width:'90%',marginBottom:5}}>
                    
                        <Text style = {{fontSize:25,fontWeight:'700',marginRight:10}}>D I S P A T C H</Text>
                        
                        <View style ={{flexDirection:'row'}}>

                        <Image
                            style = {{width:25,height:25,marginRight:15}}
                            source = {require('../../assets/images/DispatchLogo.png')}
                        />
                        <Feather name = {'heart'} style = {{fontSize:25,marginRight:15}}/>
                        <Feather name = {'shopping-bag'} style = {{fontSize:25}}/>
                        </View>
            
                    </View>

        </SafeAreaView>
        <ScrollView
                    showsVerticalScrollIndicator={false}>
                        <View style={styles.header}>
                        
                            <View style={styles.marketplace}>
                                
                                    <Text style={styles.marketplace1}>Explore</Text>
                                
                            </View>
                            
                            <SearchBar
                                style={styles.cupertinoSearchBarBasic1}
                            ></SearchBar>
                            
                        </View>

                        
                        

                        <View style={styles.content}>

                        
                            
                            <View style = {{width: '95%', marginTop: 10, height : 'auto', alignSelf: 'center'}}>
                                <Text style = {{fontSize: 20, fontWeight: '900', color: 'black'}}>BROWSE CATEGORIES</Text>
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
                                                margin:10}]} 
                                                onPress={()=>{
                                                props.navigation.navigate('AddListingScreen',{item})
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
                           
                                    <View style = {{width:'100%', backgroundColor:'#EEEEEE',marginTop:10,marginBottom:10}}>

                                        <View style = {{width:'100%',alignSelf:'center', marginTop:15,marginBottom:15}}>

                                        <View style = {{width:'90%',alignSelf:'center',marginBottom:10}}>

                                            <Text style = {{fontSize:20, fontWeight:'900'}}>TOP SELLERS</Text>
                                        </View>
                                            

                                            <FlatList
                                            data = {SellerData}
                                            horizontal = {true}
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item, index) => item.id}
                                            renderItem={({item, index}) => {
                                            
                                                        
                                            return(
                                                <View style = {{marginRight:10,alignItems:'center',paddingLeft:10}}>
                                                
                                                <View style = {{borderWidth:1.5,borderColor:'black',borderRadius:100}}>
                                                <ImageBackground
                                                source = {item.src}
                                                resizeMode = {'cover'}
                                                style = {{width: 100,height:100, borderRadius:100,overflow:'hidden',borderWidth:2,borderColor:'white'}}/>
                                                </View>
                                        
                                                <Text style = {{fontSize:18,fontWeight:'400'}}>{item.name}</Text>
                                            </View>
                                            );
                                            }
                                            }
                                        />

                                            
                                        </View>

                                        </View>
                                
                                    <View style = {{width: '95%', marginTop: 10, height : 'auto', alignSelf: 'center'}}>
                                        <Text style = {{fontSize: 20, fontWeight: '900', color: 'black'}}>FOR YOU</Text>
                                    </View> 

                                        <FlatList
                                            data = {ProductData}
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item) => item.key}
                                            renderItem={({item}) => {
                                            
                                                        
                                            return(

                                                <View style = {{marginTop:20}}>
                                                <View style = {{width:'95%',alignSelf:'center',flexDirection:'row',marginBottom:10}}>
                                                    <ImageBackground
                                                    source = {item.sellerimg}
                                                    resizeMode = {'cover'}
                                                    style = {{width: 35, height:35, borderRadius:35,borderWidth:1,borderColor:'black', overflow: 'hidden'}}
                                                    />
                                                    <View style ={{marginLeft:10}}>
                                                        <Text style = {{fontSize: 16, fontWeight: '900'}}>{item.seller}</Text>
                                                        <Text style = {{fontSize: 14, fontWeight: '500',color:'grey'}}>{item.time}</Text>
                                                    </View>
                                                </View>

                                                <View style = {{width:'95%',alignSelf:'center'}}>
                                                    <Text style = {{fontSize:20,fontWeight:'500'}}>{item.name}</Text>
                                                </View>
                                                
                                                <TouchableWithoutFeedback
                                                onPress={()=>{
                                                props.navigation.navigate('AddListingScreen',{item})
                                            }}
                                                >

                                                <View style={[styles.listing, {marginBottom:20}]} >
                                                <SharedElement id= {`item.${item.key}.photo`} style = {[StyleSheet.absoluteFillObject]}>
                                                    <ImageBackground
                                                        source={item.src}
                                                        resizeMode="cover"
                                                        style={styles.listingImage1}
                                                        
                                                    />

                                                    
                                                </SharedElement>
                                                </View>
                                                </TouchableWithoutFeedback>

                                                   
                                                    <View style = {{width:'95%',alignSelf:'center',flexDirection:'row',justifyContent:"space-between"}}>
                                                        <View style = {{flexDirection:'row'}}>

                                                        <Feather
                                                            name = {'heart'}
                                                            style = {{fontSize: 25,color:'black', marginRight:5}}
                                                        />
                                                        <Feather
                                                            name = {'message-circle'}
                                                            style = {{fontSize: 25,color:'black',marginRight:5}}
                                                        />
                                                        <Feather
                                                            name = {'send'}
                                                            style = {{fontSize: 25,color:'black', marginRight:5}}
                                                        />
                                                        </View>

                                                        <View style = {{flexDirection:'row'}}>
                                                        <TouchableOpacity onPress = {() => props.navigation.navigate('ReelsScreen',{item})}>
                                                        <Feather
                                                            name = {'play-circle'}
                                                            style = {{fontSize: 25,color:'black', marginRight:5}}
                                                        />
                                                        </TouchableOpacity>
                                                        <Feather
                                                            name = {'bookmark'}
                                                            style = {{fontSize: 25,color:'black', marginRight:5}}
                                                        />
                                                        </View>
                                                    
                                                    </View>

                                                </View>
                                            );
                                            }
                                            }
                                        />

                                

                                

                            

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
                    
                    
                    

        
                    

                </View>
            


        


    );
               
}


