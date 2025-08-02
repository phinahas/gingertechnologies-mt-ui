

import { Box, Typography } from '@mui/material';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { useEffect, useRef } from 'react';




function ChatWindow({
  setMessageToSentFn,
  selectedUser=null,
  loggedInUser=null,
  messages=[],
  onLoadOlderMessages = ()=>{}
}) {

  const messagesContainerRef = useRef(null);


  const onSendBtnFn = (message)=>{

    setMessageToSentFn(message)

  }

useEffect(() => {
  const container = messagesContainerRef.current;
  if (!container) return;

  const handleScroll = () => {
    if (container.scrollTop === 0) {
      
      onLoadOlderMessages();
    }
  };

  container.addEventListener('scroll', handleScroll);
  return () => container.removeEventListener('scroll', handleScroll);
}, [onLoadOlderMessages]);


  

  return (
    <Box className="chat-main">
      {selectedUser ? (
        <>
          
          <Box className="messages-container" ref={messagesContainerRef}>
            {messages.map((msg) => (
              <MessageBubble key={msg._id} message={msg} loggedInUser={loggedInUser} />
            ))}
          </Box>
          
          <MessageInput onSendBtnFn={onSendBtnFn} />
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
          <Typography variant="h6" color="textSecondary">
            Select a user to start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ChatWindow;