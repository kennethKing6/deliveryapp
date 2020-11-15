import React,{useState} from 'react';
import { Text, View,TouchableOpacity,Dimensions,ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';
const {width,height} = Dimensions.get("window");

const AddressScreen = (props) => {
    const [location,setLocation] = useState({
        country: 'uk'
    })

     //firebase references
     const userId = firebase.auth().currentUser.uid;
     const ref = firebase.database().ref("users/" + userId);
     const userPropertiesRef = ref.child("user_properties");
  return (
    <ImageBackground style={{flex:1}}source={require("../../../assets/images/deliveryLocation.jpg")}>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{height:"85%"}}>
      <DropDownPicker
        items={[
            {label: 'USA', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
            {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
            {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
        ]}
        defaultValue={location.country}
        containerStyle={{width: (90/100) * width,height:50,marginTop:(height * (12/100))}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
            justifyContent: 'flex-start'
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={item => setLocation({
            country: item.value
        })}
        
    />
    </View>
      <TouchableOpacity 
            onPress={()=>{
                
                if(location === null){
                    alert("Please select your location")
                }else{
                    userPropertiesRef.update({address: location.country}).then(()=>{
                        props.navigation.navigate("UsernameScreen")

                    }).catch((err)=>{
                        alert("An error occured, please try again later")
                    })
                }
                
                }}
            style = {{width:'90%',height:60,borderRadius:30, backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'center',marginTop:20}}>
            <Text style = {{alignSelf:'center', fontSize:25, fontWeight:'500' , color:'white'}}>Continue</Text>
        </TouchableOpacity>
        
    </View>
    </ImageBackground>

  );
}

export default AddressScreen