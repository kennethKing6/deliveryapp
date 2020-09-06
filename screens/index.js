import React from "react";

import { View, TouchableOpacity, Text, Dimensions } from "react-native";


import Feather from 'react-native-vector-icons/Feather';


//SCREENS
import HomeScreen from "./HomeScreen";

import MapScreen from "./MapScreen";
import UploadScreen from "./ListItems/ListItem";
import ProductTitleScreen from './ListItems/ProductTitle';
import ProductDescriptionScreen from './ListItems/ProductDescription';
import ProductPriceScreen from './ListItems/ProductPrice';
import ProductCategoryScreen from './ListItems/ProductCategory';
import ProductImageScreen from './ListItems/ProductImage';
import FinishListingScreen from './ListItems/FinishListing';
import WelcomeScreen from "./WelcomeScreen";
import ProfileScreen from "./Profile";
import AccountSettings from "./AccountSettings";
import PersonalInformation from './PersonalInformation';
import AddListing from './AddListing';
import UploadProductScreen from './UploadProductScreen';


import SignIn from "./Login";
import SignUp from "./Register";
//END OF SCREENS

import {createStackNavigator} from '@react-navigation/stack';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



const Stack = createStackNavigator ();

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

const HomeScreenStackNavigator = createStackNavigator();

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

const MapScreenStackNavigator = createStackNavigator();

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

const UploadScreenStackNavigator = createStackNavigator();

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




const ProfileScreenStackNavigator = createStackNavigator();

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


const ListItemsScreenStackNavigator = createStackNavigator();

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

const Switch = createStackNavigator();

export const MainNavigator = () => {
    return(

        <Switch.Navigator>

            <Switch.Screen 
            name = "signedOut" 
            component = {SignedOut}
            options = {{headerShown:false}}
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
        </Switch.Navigator>

    )

}