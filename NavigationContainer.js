import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./src/View/Navigations/index";

const AppContainer = (props) => {
    return (
        <NavigationContainer>
        <MainNavigator/>
        </NavigationContainer>
    );
};

export default AppContainer;