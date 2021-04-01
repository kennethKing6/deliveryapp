import React from "react";

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import UploadProductScreen from '../screens/UploadProductScreens/UploadProductScreen';
import AccountSettings from "../screens/AccountSettings/AccountSettings";
import PersonalInformation from '../screens/PersonalInformation/PersonalInformation';
import ProductDetails from '../screens/UploadProductScreens/ProductDetails';
import ChatScreen from '../screens/Message/ChatScreen';
import PaymentCard from '../screens/AddListing/AddListing';
import ReelsScreen from "../screens/Home/Reels";
import MapScreen from "../screens/Map/MapScreen";
import MessageListScreen from '../screens/Message/MessageListScreen';
import AddListingScreen from '../screens/AddListing/AddListing'
import {AppBottomNavigator} from './AppBottomNavigator'







const NormalNavigator = createSharedElementStackNavigator();
export function AppSignedInNavigator(){
    return(
        <>
             <NormalNavigator.Navigator>
                <NormalNavigator.Screen 
                    name = "SignedInScreens" 
                    component = {AppBottomNavigator}
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
                    <NormalNavigator.Screen
                        name="ReelsScreen"
                        component={ReelsScreen}
                        options={{ headerShown: false }}
                    />

                   <NormalNavigator.Screen
                        name="MessageListScreen"
                        component={MessageListScreen}
                        options={{ headerShown: false }}
                    />
                    <NormalNavigator.Screen
                        name="MapScreen"
                        component={MapScreen}
                        options={{ headerShown: false }}
                    />
                    
  
                </NormalNavigator.Navigator>
        </>
    )
}