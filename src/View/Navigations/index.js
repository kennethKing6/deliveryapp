import React,{useEffect, useState} from "react";

import { View, TouchableOpacity, Text, Dimensions } from "react-native";


import Feather from 'react-native-vector-icons/Feather';


//SCREENS
import HomeScreen from "../screens/Home/HomeScreen";
import MapScreen from "../screens/Map/MapScreen";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import ProfileScreen from "../screens/Profile/Profile";
import AccountSettings from "../screens/AccountSettings/AccountSettings";
import PersonalInformation from '../screens/PersonalInformation/PersonalInformation';
import UploadProductScreen from '../screens/UploadProductScreens/UploadProductScreen';
import ProductDetails from '../screens/UploadProductScreens/ProductDetails';
import Introduction from '../screens/Introduction/Introduction';
import AddressScreen from '../screens/Address/AddressScreen';
import UsernameScreen from '../screens/Username/UsernameScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import SelectCategories from '../screens/SelectCategory/SelectCategories';
import PaymentCard from '../screens/Payment/PaymentCard';
import ChatScreen from '../screens/Message/ChatScreen';
import MessageListScreen from '../screens/Message/MessageListScreen';
import SignIn from "../screens/Login/Login";
import SignUp from "../screens/Register/Register";
import AddListingScreen from '../screens/AddListing/AddListing';
//END OF SCREENS
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {enableScreens} from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import * as firebase from 'firebase';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
enableScreens();
//Add firebase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB5nb54BH2M3yKurqTRvR3C-kN0x5CEoO0",
    authDomain: "deliveryapp-bd7d8.firebaseapp.com",
    databaseURL: "https://deliveryapp-bd7d8.firebaseio.com",
    projectId: "deliveryapp-bd7d8",
    storageBucket: "deliveryapp-bd7d8.appspot.com",
    messagingSenderId: "257715845585",
    appId: "1:257715845585:web:d30eb92a5b8fa30a9f48f0",
    measurementId: "G-JNM1GWZ4B1"
  };
  if (!firebase.apps.length) {
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
  }

const Stack = createSharedElementStackNavigator ();

export const SignedOut = () => {
    return(
        
        <Stack.Navigator
        initialRouteName = "WelcomeScreen"
        >
            
        <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ headerShown: false }}
         />
        <Stack.Screen
            name = "SignInScreen"
            component = {SignIn}
            options = {{headerShown: false}}
        />
        <Stack.Screen
                name="SignUpScreen"
                component={SignUp}
                options={{ headerShown: false }}
        />
       

        </Stack.Navigator>
    )
}

const IntroductionNavigator = createSharedElementStackNavigator ();

export const AppIntroductions = ()=>{
    return(
        <IntroductionNavigator.Navigator
        initialRouteName="IntroductionScreen">
         <IntroductionNavigator.Screen
                name="IntroductionScreen"
                component={Introduction}
                options={{ headerShown: false }}
            />
               <IntroductionNavigator.Screen
                name="AddressScreen"
                component={AddressScreen}
                options={{ headerShown: false }}
            />
            <IntroductionNavigator.Screen
                name="UsernameScreen"
                component={UsernameScreen}
                options={{ headerShown: false }}
            />
            <IntroductionNavigator.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{ headerShown: false }}
            />
               <IntroductionNavigator.Screen
                name="SelectCategories"
                component={SelectCategories}
                options={{ headerShown: false }}
            />
            
        </IntroductionNavigator.Navigator>
    )
}


const MyTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View
            style={{
                position: "absolute",
                bottom: Dimensions.get("window").width / 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 65,
                backgroundColor: "rgba(255,255,255,1)",
                borderRadius: 50,
                width: "80%",
                marginLeft: 40,
                marginRight: 40,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.20,
                shadowRadius: 10,
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const IconNames = ["home","map","message-square","user"];

                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                    
                };

                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ["selected"] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            width: (Dimensions.get("window").width * 13) / 25 / 2,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            flexDirection: "row",
                            fontSize: 15,
                        }}
                    >
                        <Feather
                            name={IconNames[index]}
                            size={25}
                            color={isFocused ? "#2ecc71" : "#616161"} 

                        />
                       
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const defaultStackNavigationOptions = {
    
    headerStyle: {
        backgroundColor: "black",
        shadowOpacity: 0,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    headerTitleStyle: {
        fontSize: 20,
    },
    headerTintColor: "blue",
    headerBackTitle: '',
};

const HomeScreenStackNavigator = createSharedElementStackNavigator();

const HomeScreenNavigator = () => {
    return (
        <HomeScreenStackNavigator.Navigator
            screenOptions={defaultStackNavigationOptions}
        >
            <HomeScreenStackNavigator.Screen
                name="HomeScreen"
                component={HomeScreen}
                options = {{headerShown: false}}
            />
            

        </HomeScreenStackNavigator.Navigator>
    );
};

const MapScreenStackNavigator = createSharedElementStackNavigator();

const MapScreenNavigator = () => {
    return (
        <MapScreenStackNavigator.Navigator
            screenOptions={defaultStackNavigationOptions}
        >
            <MapScreenStackNavigator.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ headerShown: false }}

            />
        </MapScreenStackNavigator.Navigator>
    );
};

const UploadScreenStackNavigator = createSharedElementStackNavigator();

const UploadScreenNavigator = () => {
    
    return (

                <UploadScreenStackNavigator.Navigator initialRouteName="UploadScreen">
                    <UploadScreenStackNavigator.Screen
                        name="MessageListScreen"
                        component={MessageListScreen}
                        options={{ headerShown: false }}

                    />
                    
                    
                </UploadScreenStackNavigator.Navigator>



    );
};




const ProfileScreenStackNavigator = createSharedElementStackNavigator();

const ProfileScreenNavigator = () => {
    return (
        <ProfileScreenStackNavigator.Navigator
            screenOptions={defaultStackNavigationOptions}
        >
            <ProfileScreenStackNavigator.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}

            />
            
        </ProfileScreenStackNavigator.Navigator>
    );
};




const BottomNavigationBar = createBottomTabNavigator();

export const AppNavigator = () => {
    return (
        <BottomNavigationBar.Navigator tabBar={(props) => <MyTabBar {...props} />}>
            <BottomNavigationBar.Screen
                name="HomeScreenNavigator"
                component={HomeScreenNavigator}
                tabBarOptions={{ 
                    showLabel: false 
                    }}
                options={{
                    
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused }) => (
                        <Text
                            style={{
                                fontSize: focused ? 20 : 15,
                                color: focused ? "red" : "blue",
                            }}
                        >
                            M
                        </Text>
                    ),
                    showLabel: false,
                }}
            />
            <BottomNavigationBar.Screen
                name="MapScreenNavigator"
                component={MapScreenNavigator}
                options={{
                    tabBarLabel: "search",
                    tabBarLabel: ({ focused, tintColor: color }) => (
                        <Feather
                            name="human-greeting"
                            size={focused ? size + 5 : size}
                            color={focused ? "red" : "blue"}
                        />
                    ),
                }}
            />
            <BottomNavigationBar.Screen
                name="UploadScreenNavigator"
                component={UploadScreenNavigator}
                options={{
                    tabBarLabel: "upload",
                    tabBarLabel: ({ focused, tintColor: color }) => (
                        <Feather
                            name="plus-circle"
                            size={focused ? size + 5 : size}
                            color={focused ? "red" : "blue"}
                        />
                    ),
                }}
            />
            <BottomNavigationBar.Screen
                name="profileScreenNavigator"
                component={ProfileScreenNavigator}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ focused, size }) => (
                        <Feather
                            name="human-greeting"
                            size={focused ? size + 5 : size}
                            color={focused ? "blue" : "red"}
                        />
                    ),
                }}
            />
        </BottomNavigationBar.Navigator>
    );
};

const NormalNavigator = createSharedElementStackNavigator();
function GetNormalScreens(){
    return(
        <>
             <NormalNavigator.Navigator>
             <NormalNavigator.Screen 
                    name = "AppIntroductions" 
                    component = {AppIntroductions}
                    options = {{headerShown:false}}
                    /> 
                <NormalNavigator.Screen 
                    name = "SignedInScreens" 
                    component = {AppNavigator}
                    options = {{headerShown:false}}
                    /> 
                    <NormalNavigator.Screen
                        name="PaymentCard"
                        component={PaymentCard}
                        options={{ headerShown: false }}
                    />
                   
                    <NormalNavigator.Screen
                        name="AccountSettings"
                        component={AccountSettings}
                        options={{ headerShown: false }}
                    />
                    <NormalNavigator.Screen
                        name="PersonalInformation"
                        component={PersonalInformation}
                        options={{ headerShown: false }}
                    />
                   
                   
                    <NormalNavigator.Screen
                        name="UploadProductScreen"
                        component={UploadProductScreen}
                        options={{ headerShown: false }}
                    />
                    <NormalNavigator.Screen
                        name="ProductDetails"
                        component={ProductDetails}
                        options={{ headerShown: false }}
                    />
                   
                     <NormalNavigator.Screen
                        name="ChatScreen"
                        component={ChatScreen}
                        options={{ headerShown: false }}
                    />
                     <NormalNavigator.Screen
                        name="AddListingScreen"
                        component={AddListingScreen}
                        options={{ headerShown: false }}
                    />
                   
                    
                </NormalNavigator.Navigator>
        </>
    )
}
const AppNavigatorOnly = createSharedElementStackNavigator();
function GetOnlyAppNavigator(){
   return(
       <>
         <AppNavigatorOnly.Navigator>
    
    <AppNavigatorOnly.Screen 
        name = "SignedInScreens" 
        component = {AppNavigator}
        options = {{headerShown:false}}
        /> 
        <AppNavigatorOnly.Screen
            name="PaymentCard"
            component={PaymentCard}
            options={{ headerShown: false }}
        />
       
        <AppNavigatorOnly.Screen
            name="AccountSettings"
            component={AccountSettings}
            options={{ headerShown: false }}
        />
        <AppNavigatorOnly.Screen
            name="PersonalInformation"
            component={PersonalInformation}
            options={{ headerShown: false }}
        />
       
       
        <AppNavigatorOnly.Screen
            name="UploadProductScreen"
            component={UploadProductScreen}
            options={{ headerShown: false }}
        />
        <AppNavigatorOnly.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ headerShown: false }}
        />
       
         <AppNavigatorOnly.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
        />
         <AppNavigatorOnly.Screen
            name="AddListingScreen"
            component={AddListingScreen}
            options={{ headerShown: false }}
        />
       
        
    </AppNavigatorOnly.Navigator>
       </>
   )
}

const SignedOutNavigator = createSharedElementStackNavigator();

function GetSignedOutScreen(){
    return(
        <>
             <SignedOutNavigator.Navigator>
                <SignedOutNavigator.Screen 
                    name = "signedOut" 
                    component = {SignedOut}
                    options = {{headerShown:false}}
                    />
                </SignedOutNavigator.Navigator>
        </>
    )
}
function GetScreens(){
    const [isSignedIn,setIsSignedIn] = useState(false);
    const [sawIntroduction,setSawIntroduction] = useState(null);
    AsyncStorage.getItem('@IntroductionScreen').then((value)=>{
        if(value !== null) {
            setSawIntroduction(true)
          }
    }).catch((err)=>{
        
    })
  
         auth().onAuthStateChanged((user)=>{
            console.log("user",user)
            if(user === null){
              setIsSignedIn(false);
            }else{
                setIsSignedIn(true);

            }
          })

    
    
    
    
    
     return( isSignedIn? sawIntroduction === null? <GetNormalScreens/>: <GetOnlyAppNavigator/>: <GetSignedOutScreen/>)
    }
const Switch = createSharedElementStackNavigator();

export const MainNavigator = () => {
  
        
            return(
                <>   

                <GetScreens/>

                </>
            )
      
        }
    
   
    


