import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';

export default function ChatScreen(props) {
  const [messages, setMessages] = useState([]);
  const [datasnapshot,setDatasnapshot] = useState(null)

  const {route} = props;

  
  const correspondance = route.params.correspondence;
  console.log("correspondance",correspondance)
   //firebase references
   const userId = firebase.auth().currentUser.uid;
   const ref = firebase.database().ref("users/" + userId);
   const messagesRef = ref.child("messages").child(correspondance);
   const correspondanceMessageRef = firebase.database().ref("users/" + correspondance).child("messages");
   const userPropertiesRef = ref.child("user_properties");

  
  useEffect(() => {

    const unsubscribe = props.navigation.addListener('focus', () => {
      if(datasnapshot === null)
          getUserProperties();
     
        //
        if(messages.length === 0){
          GetMessages();

        }

  });

  
    return unsubscribe;

  }, [messages])
  
 

  useEffect(()=>{
    const onValueChange  = messagesRef.on("child_added",(snapshot)=>{
      if(snapshot !== null){
        GetMessages();

      } 

    })
    return ()=>messagesRef.off("child_added",onValueChange);
  })

 
  function GetMessages(){

    messagesRef.once('value').then((snapshot)=>{
     if(snapshot !== undefined){
      var messagesList = [];
      const newMessages = Object.values(snapshot.val());
      if(snapshot !== null && typeof snapshot !== 'string' && newMessages.length > messages.length){
        snapshot.forEach(element =>{
          messagesList.push(element.val());

        })
       setMessages(messagesList.reverse(                                                                           ));
       

      }
     }
    }).then((failure)=>{

    }).catch()
}

function getUserProperties(){
  return userPropertiesRef.once("value").then((datasnapshot)=>{
    setDatasnapshot(datasnapshot)
  }).then((failure)=>{

  }).catch()

}

const onSend = useCallback((messagesList) => {
  // messagesList[0]._id = correspondance;

  // messagesList.forEach(element=>{
  //   messagesRef.push(element)
  // })

  for(var i = 0; i < messagesList.length; ++i){
    messagesRef.push(messagesList[i])
    correspondanceMessageRef.push(messagesList[i]);
  }
}, [])

  return (

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
          // name: datasnapshot == null? "unknown": datasnapshot.val().username,
          // avatar: datasnapshot == null? require("../../../assets/icons/profilephoto_placeholder.png") : datasnapshot.val().userProfilePicture
        }}
        isTyping = {true}
        style={{ flex:1}}
        isLoadingEarlier
        onLoadEarlier={async ()=>{
         const prevmessages = await messagesRef.once('value');
         var messagesList = [];

         if(prevmessages !== null && typeof prevmessages !== 'string'){
          prevmessages.forEach(element => {
                messagesList.push(element.val());
              });
         }

         return messagesList;
        }}
      />

  )
}