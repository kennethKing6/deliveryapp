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
  //Token to send message
  const corresponFCMToken = route.params.FCMToken;

  console.log("corresponFCMToken",corresponFCMToken)
   //firebase references
   const userId = firebase.auth().currentUser.uid;
   const ref = firebase.database().ref("users/" + userId);
   const messagesRef = ref.child("messages").child(correspondance);
   const correspondanceMessageRef = firebase.database().ref("users/" + correspondance).child("messages").child(userId);
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
    // console.log("The refer",datasnapshot.ref)
    setDatasnapshot(datasnapshot)
  }).then((failure)=>{

  }).catch()

}

const onSend = useCallback((messagesList) => {
 
  for(var i = 0; i < messagesList.length; ++i){
    messagesList[i]['createdAt'] = new Date();
    messagesRef.push(messagesList[i])
    correspondanceMessageRef.push(messagesList[i])
  }
}, [])

const USERNAME = 0;
const FCMTOKEN = 1;
const USER_PROFILE_PIC = 2;
function getUserData(data){
  var result = ""; 
  if(data === USERNAME){
    try{result = datasnapshot.val().username}catch(err){}
  }else if(data === FCMTOKEN){
    try{result = datasnapshot.val().FCMToken}catch(err){}
  }else if(data === USER_PROFILE_PIC){
    try{result = datasnapshot.val().userProfilePicture}catch(err){}

  }
  return result;
}



  return (

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
          name: getUserData(USERNAME),
          FCMToken: getUserData(FCMTOKEN),
          avatar: getUserData(USER_PROFILE_PIC),
          corresponFCMToken:corresponFCMToken
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