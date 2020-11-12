import React from "react";

import { View, TouchableOpacity, Text, Dimensions } from "react-native";


import Feather from 'react-native-vector-icons/Feather';


//SCREENS
import HomeScreen from "../screens/Home/HomeScreen";

import MapScreen from "../screens/Map/MapScreen";
import UploadScreen from "../screens/ListItems/ListItem";
import ProductTitleScreen from '../screens/ListItems/ProductTitle';
import ProductDescriptionScreen from '../screens/ListItems/ProductDescription';
import ProductPriceScreen from '../screens/ListItems/ProductPrice';
import ProductCategoryScreen from '../screens/ListItems/ProductCategory';
import ProductImageScreen from '../screens/ListItems/ProductImage';
import FinishListingScreen from '../screens/ListItems/FinishListing';
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import ProfileScreen from "../screens/Profile/Profile";
import AccountSettings from "../screens/AccountSettings/AccountSettings";
import PersonalInformation from '../screens/PersonalInformation/PersonalInformation';
import AddListing from '../screens/AddListing/AddListing';
import UploadProductScreen from '../screens/UploadProductScreens/UploadProductScreen';
import ProductDetails from '../screens/UploadProductScreens/ProductDetails';
import SelectCategories from '../screens/SelectCategory/SelectCategories';
import Introduction from '../screens/Introduction/Introduction';
import PaymentCard from '../screens/Payment/PaymentCard';
import ChatScreen from '../screens/Message/ChatScreen';
import MessageListScreen from '../screens/Message/MessageListScreen';





import SignIn from "../screens/Login/Login";
import SignUp from "../screens/Register/Register";
//END OF SCREENS

import {createStackNavigator} from '@react-navigation/stack';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {enableScreens} from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import {NavigationContainer} from '@react-navigation/native';

enableScreens();

const Stack = createSharedElementStackNavigator ();

export const SignedOut = () => {
    return(
        
        <Stack.Navigator
        initialRouteName = "Welcome"
        >
            
        <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
         />
        <Stack.Screen
            name = "SignIn"
            component = {SignIn}
            options = {{headerShown: false}}
        />
        <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
        />
        

        </Stack.Navigator>
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

                const IconNames = ["home","map","tag","user"];

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
                name="HomeScreenNav"
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
                        name="UploadScreen"
                        component={UploadScreen}
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


const ListItemsScreenStackNavigator = createSharedElementStackNavigator();

const ListItemsScreenNavigator = () => {
    return (
        <ListItemsScreenStackNavigator.Navigator
            screenOptions={defaultStackNavigationOptions}
        >
            <ListItemsScreenStackNavigator.Screen
                name="ProductTitleScreen"
                component={ProductTitleScreen}
                options={{ headerShown: false }}

            />
            <ListItemsScreenStackNavigator.Screen
                name="ProductDescriptionScreen"
                component={ProductDescriptionScreen}
                options={{ headerShown: false }}

            />
            <ListItemsScreenStackNavigator.Screen
                name="ProductPriceScreen"
                component={ProductPriceScreen}
                options={{ headerShown: false }}

            />
            <ListItemsScreenStackNavigator.Screen
                name="ProductCategoryScreen"
                component={ProductCategoryScreen}
                options={{ headerShown: false }}

            />
            <ListItemsScreenStackNavigator.Screen
                name="ProductImageScreen"
                component={ProductImageScreen}
                options={{ headerShown: false }}

            />
            <ListItemsScreenStackNavigator.Screen
                name="FinishListingScreen"
                component={FinishListingScreen}
                options={{ headerShown: false }}

            />

            
        </ListItemsScreenStackNavigator.Navigator>
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

const Switch = createSharedElementStackNavigator();

export const MainNavigator = () => {
    return(

        
        <Switch.Navigator>

            <Switch.Screen 
            name = "signedOut" 
            component = {SignedOut}
            options = {{headerShown:false}}
            />
            <Switch.Screen
                name="SelectCategories"
                component={SelectCategories}
                options={{ headerShown: false }}
            />
            <Switch.Screen
                name="Introduction"
                component={Introduction}
                options={{ headerShown: false }}
            />
            <Switch.Screen
                name="PaymentCard"
                component={PaymentCard}
                options={{ headerShown: false }}
            />
            <Switch.Screen 
            name = "signedIn" 
            component = {AppNavigator}
            options = {{headerShown:false}}
            /> 
            <Switch.Screen
                name="AccountSettings"
                component={AccountSettings}
                options={{ headerShown: false }}
            />
            <Switch.Screen
                name="PersonalInformation"
                component={PersonalInformation}
                options={{ headerShown: false }}
            />
            <Switch.Screen
                name="AddListing"
                component={AddListing}
                options={{ headerShown: false }}
            />
            <Switch.Screen
                name="ListItems"
                component={ListItemsScreenNavigator}
                options={{ headerShown: false }}
            />
            <Switch.Screen
                name="UploadProductScreen"
                component={UploadProductScreen}
                options={{ headerShown: false }}
            />
            <Switch.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{ headerShown: false }}
            />
            <Switch.Screen
                name="MessageListScreen"
                component={MessageListScreen}
                options={{ headerShown: false }}
            />
             <Switch.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{ headerShown: false }}
            />
            
            
            
        </Switch.Navigator>
        
    )

}
