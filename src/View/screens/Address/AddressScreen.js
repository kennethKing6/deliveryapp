import React,{useState,useRef,useEffect} from 'react';
import { Text, View,TouchableOpacity,Dimensions,ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';
import Geocoder from 'react-native-geocoding';
import Autocomplete from 'react-native-autocomplete-input';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GetLocation from 'react-native-get-location';

const {width,height} = Dimensions.get("window");
// use a valid API key
const AddressScreen = (props) => {
  const [addresses,setAddresses] = useState([]);
      const [location,setLocation] = useState("");
      useEffect(()=>{
        if(location.length === 0){
          getUserLocation().then((position)=>{
            return Geocoder.init("AIzaSyCVObze8pBBjZEVdBDgHysPKcih0P9mmLw",{
               components:"country:ca",
               language:"en",
               location:position
             }); 
           }).then().catch()
        }

      },[])
        async function getUserLocation(){
          const position = await GetLocation.getCurrentPosition({
                                                            enableHighAccuracy: true,
                                                            timeout: 15000,
                                                        });
            return position;
         
        }

  
 
    

     //firebase references
     const userId = firebase.auth().currentUser.uid;
     const ref = firebase.database().ref("users/" + userId);
     const userPropertiesRef = ref.child("user_properties");
     console.log("location",location);

  return (
    <ImageBackground style={{flex:1}} source={require("../../../assets/images/deliveryLocation.jpg")}>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{height:"85%"}}>
      <View style={{width:width * (80/90),height:30}}>
                    <Autocomplete
                    containerStyle={{flex: 1}}
            data={addresses}
            defaultValue={location}
            onChangeText={text => {
                if(location.length > 3){
                  setTimeout(()=>{
                Geocoder.from(location)
              .then(json => {
                    var newAddrresses = []
                      if(addresses.length > 0){
                        addresses.forEach(item=>{
                        newAddrresses.push(item)
                      })
                      }
                      json.results.forEach(address=>{
                        if(addresses.includes(address.formatted_address) === false){
                          newAddrresses.push(address.formatted_address)
                        }
                      })
                setAddresses(newAddrresses)
              })
                  .catch(error => console.warn(error));
                        },2000)
                }
              setLocation(text);
            
      
            }}
            containerStyle={{
              zIndex: 1,
              minHeight:height * (80/90),
              minWidth:width * (80/90),

            }}
            hideResults={false}
           
            renderItem={({ item, i }) => (
              <TouchableOpacity 
              style={{margin:10,}}
              key={i} onPress={() =>{setLocation(item)}}>

                <Text style={{color:"#D9D9D9"}} numberOfLines={1}>{item}</Text>
              </TouchableOpacity>
            )}
          />
            </View>
  
    </View>
      <TouchableOpacity 
            onPress={()=>{
                
                if(location === null){
                    alert("Please select your location")
                }else{
                    userPropertiesRef.update({address: location}).then(()=>{
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