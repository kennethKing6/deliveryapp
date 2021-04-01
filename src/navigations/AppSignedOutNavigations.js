import React from "react";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import SignIn from "../screens/Login/Login";
import SignUp from "../screens/Register/Register";
import Introduction from '../screens/Introduction/Introduction';
import AddressScreen from '../screens/Address/AddressScreen';
import UsernameScreen from '../screens/Username/UsernameScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import SelectCategories from '../screens/SelectCategory/SelectCategories';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';


const Stack = createSharedElementStackNavigator ();

export const AppSignedOutNavigations = () => {
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
         <Stack.Screen
                name="IntroductionScreen"
                component={Introduction}
                options={{ headerShown: false }}
            />
               <Stack.Screen
                name="AddressScreen"
                component={AddressScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UsernameScreen"
                component={UsernameScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{ headerShown: false }}
            />
               <Stack.Screen
                name="SelectCategories"
                component={SelectCategories}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}