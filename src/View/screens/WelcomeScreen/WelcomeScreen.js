import React, { Component } from "react";
import { View, StatusBar, Text, ScrollView} from "react-native";
import LoginButtons from '../../components/LoginButtons';
import styles from './styles';


function WelcomeScreen(props) {
    return (

        
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.pageView}>
            
                <View style={styles.header}>
                    <Text style={styles.welcomeToDispatch}>
                        Welcome {"\n"}to Dispatch
                        </Text>
                    <Text style={styles.subtitle}>
                        Order nearby items and Dispatch
                        </Text>
                </View>

                <View style={styles.scroll}>
                    <View style={styles.scrollArea}>
                        <ScrollView
                            horizontal={false}
                            contentContainerStyle={styles.scrollArea_contentContainerStyle}
                        >
                            <View style={styles.cont1}>
                                <View style={styles.deliveryBox}>
                                    <Text style={styles.delivery}>Delivery</Text>
                                    <Text style={styles.immediate}>
                                        We offer immediate shipments directly to your door</Text>
                                </View>
                            </View>
                            <View style={styles.cont2}>
                                <View style={styles.deliveryBox1}>
                                    <Text style={styles.marketplace}>Marketplace</Text>
                                    <Text style={styles.immediate1}>
                                        Buy goods from local sellers around you </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                
                <View style={styles.buttons}>
                    <LoginButtons
                        onPress={() => props.navigation.navigate('SignUp')}
                        text='Sign Up'

                    />
                    <LoginButtons
                        onPress={() => props.navigation.navigate('SignIn')}
                        style={{
                            backgroundColor:"black" }}
                        color = 'black'
                        text='Login'

                    />

                </View>
            </View>
        </View>
    );
}


export default WelcomeScreen;