//App Bottom Navigator
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import HomeScreen from "../screens/Home/HomeScreen";
import MapScreen from "../screens/Map/MapScreen";
import MessageListScreen from '../screens/Message/MessageListScreen';
import ProfileScreen from "../screens/Profile/Profile";
import Feather from 'react-native-vector-icons/Feather';
import { View, TouchableOpacity, Text, Dimensions } from "react-native";



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

export const AppBottomNavigator = () => {
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