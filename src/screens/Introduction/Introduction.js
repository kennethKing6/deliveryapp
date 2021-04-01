import React, {useState} from 'react';
import {
    StyleSheet, 
    View,
    ScrollView,
    StatusBar,
    Button, 
    ImageBackground,
    SafeAreaView,
    Text,
    Dimensions,
    FlatList,
    List,
    Image,
    TouchableOpacity
} from 'react-native';
import Dots from 'react-native-dots-pagination';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';

const {width,height} = Dimensions.get("window");



export default function Introduction(props) {
    const [active,setActive] = useState(0)
         //firebase references
    //  const userId = firebase.auth().currentUser.uid;
    //  const ref = firebase.database().ref("users/" + userId);
    //  const userPropertiesRef = ref.child("user_properties");
        return (
      <View style={styles.page}>
                      <StatusBar animated barStyle="dark-content" />

                <View style = {styles.container}>
                

                
                    <SafeAreaView>

                    <View style = {{alignSelf:'center', justifyContent:'center',marginTop:50}}>

                    <Image
                        style = {{width:width/6,height:width/6}}
                        source = {require('../../assets/images/DispatchLogo.png')}
                    />

                    </View>

                    <ScrollView
                    horizontal={true}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    >
                                <View style={{ width }}>

                                
                                    <View style = {{marginTop:20,marginBottom:20,width:'70%',alignItems:'center',alignSelf:'center'}}>
                                        <Text style = {{fontSize:30, fontWeight:'700',textAlign:'center'}}>Use Dispatch to  support small businesses</Text>
                                    </View>


                                <View style = {{alignSelf:'center',backgroundColor:'#fde3a7',borderRadius:30,overflow:'hidden',marginTop:20,marginBottom:20}}>
                                    <Image
                                        style = {{width:width*0.6,height:width*0.6,top:'25%'}}
                                        source = {require('../../assets/images/hand.png')}
                                    />
                                </View>

                                </View>
                                <View style={{ width }}>

                                
                                    <View style = {{marginTop:20,marginBottom:20,width:'70%',alignItems:'center',alignSelf:'center'}}>
                                        <Text style = {{fontSize:30, fontWeight:'700',textAlign:'center'}}>Discuss and agree on the best possible price</Text>
                                    </View>


                                <View style = {{alignSelf:'center',backgroundColor:'#c5eff7',borderRadius:30,overflow:'hidden',marginTop:20,marginBottom:20}}>
                                    <Image
                                        style = {{width:width*0.6,height:width*0.6,top:'10%'}}
                                        source = {require('../../assets/images/hand2.png')}
                                    />
                                </View>

                                </View>

                                <View style={{ width }}>

                                
                                    <View style = {{marginTop:20,marginBottom:20,width:'70%',alignItems:'center',alignSelf:'center'}}>
                                        <Text style = {{fontSize:30, fontWeight:'700',textAlign:'center'}}>Get instant door delivery for all your parcels</Text>
                                    </View>


                                <View style = {{alignSelf:'center',backgroundColor:'#d5b8ff',borderRadius:30,overflow:'hidden',marginTop:20,marginBottom:20}}>
                                    <Image
                                        style = {{width:width*0.6,height:width*0.6,top:'25%'}}
                                        source = {require('../../assets/images/hand3.png')}
                                    />
                                </View>

                                </View>

                                
                      </ScrollView>
                      <Dots length={2} active={active} />
                      
                      <TouchableOpacity 
                      onPress={() => {
                    //     userPropertiesRef.update({userId: userId}).then(()=>{
                    //       props.navigation.navigate('AddressScreen')
                    // }).catch((err)=>{
                    //     alert("An error occured, please try again later")
                    // })
                    props.navigation.navigate('AddressScreen')
                        }}
                      style = {{width:'90%',height:60,borderRadius:30, backgroundColor:'#00a3ff',justifyContent:'center',alignSelf:'center',marginTop:20,
                      shadowColor: "#222222",
                                    shadowOffset: {
                                        width: 0,
                                        height: 4
                                    },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 7,
                                    }}>
                        <Text style = {{alignSelf:'center', fontSize:25, fontWeight:'500' , color:'white'}}>Continue</Text>
                      </TouchableOpacity>
                    </SafeAreaView>
                </View>

      </View>
    );
  
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor:'white'
  },
  container: {
    flex:1,
      width: '100%',
      alignSelf:'center'
  },
 
});