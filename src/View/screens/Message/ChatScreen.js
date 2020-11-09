import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firebase from "@react-native-firebase/app";
import database from '@react-native-firebase/database';

export default function ChatScreen(props) {
  const [messages, setMessages] = useState([]);
  const [datasnapshot,setDatasnapshot] = useState(null)


  
   //firebase references
   const userId = firebase.auth().currentUser.uid;
   const ref = firebase.database().ref("users/" + userId);
   const messagesRef = ref.child("messages").child(props.correspondanceID);

  
  useEffect(() => {

    const unsubscribe = props.navigation.addListener('focus', () => {
      if(datasnapshot === null)
        getUserProperties();
     

      GetMessages();

  });

  
    return unsubscribe;

  }, [messages])
  
 

  useEffect(()=>{
    const addedMessages = messagesRef.on("child_added",(snapshot)=>{
      GetMessages();

    })
    return ()=>addedMessages.off("child_added",addedMessages);
  })

 
  function GetMessages(){

    messagesRef.once("value",(snapshot)=>{
      var messagesList = [];
      snapshot.forEach(element => {
        messagesList.push(element.val());
      });
     setMessages(messagesList.reverse());
  })
}

function getUserProperties(){
  const profilePictureRef = ref.child("user_properties").child("userProfilePicture");
  profilePictureRef.once("Value",(datasnapshot)=>{
    setDatasnapshot(datasnapshot)
  })

}
  return (

      <GiftedChat
        messages={messages}
        onSend={messages => messagesRef.push(messages)}
        user={{
          _id: userId,
          name: datasnapshot == null? "unknown": datasnapshot.val().username,
          avatar: datasnapshot == null? require("../../../assets/icons/profilephoto_placeholder.png") : datasnapshot.val().userProfilePicture
        }}
        isTyping = {true}
        style={{ flex:1}}
      />

  )
}