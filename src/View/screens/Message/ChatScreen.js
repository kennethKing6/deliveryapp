import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
        {
            _id: 2,
            author:"Kouad",
            text: 'Hello Naruto',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://i.ytimg.com/vi/MDX049lqytI/maxresdefault.jpg',
            },
          },
      {
        _id: 1,
        text: 'Hello Kenneth',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://vignette.wikia.nocookie.net/naruto/images/0/09/Naruto_newshot.png/revision/latest/scale-to-width-down/340?cb=20170621101134',
        },
      },
      
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1  ,
        }}
        isTyping = {true}
        style={{ flex:1}}
      />

  )
}