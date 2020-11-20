import React,{useState,useRef,useEffect} from 'react';
import { Text, View,TouchableOpacity,Dimensions,ImageBackground,StyleSheet,Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';
import Geocoder from 'react-native-geocoding';
import Autocomplete from 'react-native-autocomplete-input';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GetLocation from 'react-native-get-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
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
    //  const userId = firebase.auth().currentUser.uid;
    //  const ref = firebase.database().ref("users/" + userId);
    //  const userPropertiesRef = ref.child("user_properties");
    //  console.log("location",location);

  return (
    <View style={{ flex: 1, justifyContent: "space-around", alignItems: "center",backgroundColor:'white'}}>
      <View>
      <Image
        style = {{width:150,height:150,alignSelf:'center'}}
        source = {require('../../../assets/images/pin.png')}
      />
      <Text style = {{fontSize:30, color:'black',fontWeight:'900'}}>Where are you located?</Text>
      <View style={{width:width * (80/90),height:30}}>
      
                    <Autocomplete
                    style = {{height:50, backgroundColor:'#F7F7F7',borderRadius:10,fontWeight:'900',fontSize:20 ,padding:10,marginBottom:5,marginTop:5}}
                    placeholder = 'Location'
                    placeholderTextColor = {'lightgrey'}
                    
                    inputContainerStyle = {{borderWidth:0, borderColor:'red'}}
                    listStyle = {{borderWidth:0}}
                    
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

                    
                    
                    hideResults={false}
                    renderItem={({ item, i }) => (
                    
                    
                    <View style = {{backgroundColor:'#F7F7F7', borderRadius:10,marginBottom:5}}>
                    
                      <TouchableOpacity 
                      style={styles.descriptionContainer}
                      key={i} 
                      onPress={() =>{setLocation(item)}}>

                        <Text style={{color:"#8e8e93",fontSize:18,fontWeight:'700'}} numberOfLines={2}>{item}</Text>
                      </TouchableOpacity>

                      </View>
                    )}
                  />
            </View>
  
    </View>
      <TouchableOpacity 
            onPress={()=>{
                
                if(location === null){
                    alert("Please select your location")
                }else{
                    // userPropertiesRef.update({address: location}).then(()=>{
                    //     props.navigation.navigate("UsernameScreen")

                    // }).catch((err)=>{
                    //     alert("An error occured, please try again later")
                    // })
                    AsyncStorage.getItem('@user_properties').then((data)=>{
                     var result =  data != null ? JSON.parse(data) : null;
                     if(result != null){
                      result['address'] = location
                     }else{
                      result = {};
                      result['address'] = location
                     }
                     return result
                    }).then((savingObj)=>{
                      return AsyncStorage.setItem('@user_properties', JSON.stringify(savingObj))
                    }).then(()=>{
                      props.navigation.navigate("UsernameScreen")
                    }).catch(()=>{
                      alert("Failed to save your location, please try again later!")
                    })
                }
                
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
        
    </View>

  );
}

const styles = StyleSheet.create({

  descriptionContainer: {
    margin:10,
  },
  autocompleteContainer: {
    
  },

});
export default AddressScreen