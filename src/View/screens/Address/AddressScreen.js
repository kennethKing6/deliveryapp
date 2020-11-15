import React,{useState} from 'react';
import { Text, View,TouchableOpacity,Dimensions,ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';
import Geocoder from 'react-native-geocoding';
import Autocomplete from 'react-native-autocomplete-input';

const {width,height} = Dimensions.get("window");
Geocoder.init("AIzaSyCVObze8pBBjZEVdBDgHysPKcih0P9mmLw"); // use a valid API key

const AddressScreen = (props) => {
   

    function GetAddresses(){
        const [addresses,setAddresses] = useState([]);
        const [location,setLocation] = useState("");
        // Initialize the module (needs to be done only once)

Geocoder.from(location)
		.then(json => {
            var locations = [];
            json.results.forEach(location=>{
                locations.push(location.formatted_address)
            })
			setAddresses(locations)
			console.log("locations",locations);
		})
        .catch(error => console.warn(error));
        
        return(
            <View style={{width:width * (80/90),height:30}}>
                    <Autocomplete
                    containerStyle={{flex: 1}}
            data={addresses}
            
            defaultValue={location}
            onChangeText={text => setLocation(text)}
            renderItem={({ item, i }) => (
              <TouchableOpacity onPress={() =>{setLocation(item)}}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
            </View>
        )
    }

     //firebase references
     const userId = firebase.auth().currentUser.uid;
     const ref = firebase.database().ref("users/" + userId);
     const userPropertiesRef = ref.child("user_properties");
  return (
    <ImageBackground style={{flex:1}}source={require("../../../assets/images/deliveryLocation.jpg")}>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{height:"85%"}}>
        <GetAddresses/>
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