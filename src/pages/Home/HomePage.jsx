import React, { useEffect, useState, useRef } from 'react'

import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

//components
import ConversationList from '../../components/ConversationList';
import ChatWindow from '../../components/ChatWindow';

//ui-components
import Loader from '../../components/ui-components/loader/Loader';

//hooks
import { handleCatchBlock } from '../../hooks/catchBlock';

//services
import { GET_getConversationId, GET_users } from '../../services/userServices';

//socket 
import { disconnectSocket } from '../../socket/socket'
import { sendMessage } from '../../socket/eventEmitter'
import { chatEvents } from '../../socket/eventListener'

//Redux
import { SET_USERS, SET_SELECTED_USER, SET_CONVERSATION_ID, LOAD_MESSAGES, PUSH_NEW_MESSAGE, CLEAR_NEW_MESSAGE_NOTIFICATION_IN_USER_LIST, INC_PAGE, SET_HAS_MORE, APPEND_OLDER_MESSAGES, RESET_PAGE, RESET_CONVERSATIONS } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { GET_messages } from '../../services/chatServices';
import { generateUniqueId, getCurrentUtcTime } from '../../utils/utils';


function HomePage() {





  const dispatch = useDispatch();
  const navigate = useNavigate();


  const chatStore = useSelector((store) => store.chatStore);
  const loggedInUserStore = useSelector((store) => store.userStore);

  const selectedUserRef = useRef(chatStore.selectedUser);

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    selectedUserRef.current = chatStore.selectedUser;
  }, [chatStore.selectedUser]);

  useEffect(() => {
    chatEvents(dispatch, selectedUserRef);
    return () => {
      disconnectSocket();
    };
  }, []);


  useEffect(() => {

    get_Users()


  }, [])

  const get_Users = async () => {

    try {
      setLoading(true)
      let res = await GET_users();
      dispatch({ type: SET_USERS, payload: res.userList });
    } catch (error) {
      handleCatchBlock(error, navigate,dispatch);
      setLoading(false)
    } finally {
      setLoading(false)

    }

  }


  const get_ConversationId = async (selectedUserId) => {

    try {
      setLoading(true)
      let res = await GET_getConversationId({ selectedUserId });
      dispatch({ type: SET_CONVERSATION_ID, payload: res.conversationId });
      return res.conversationId
    } catch (error) {
      handleCatchBlock(error, navigate,dispatch);
      setLoading(false)
    } finally {
      setLoading(false)

    }

  }

  const get_Messages = async (conversationId, page) => {
    
    try {
      
      setLoading(true)
      if (page == 1) {
        let res = await GET_messages({ conversationId: conversationId, page: page });
        dispatch({ type: LOAD_MESSAGES, payload: res.messages });
        dispatch({ type: INC_PAGE })
        dispatch({
          type: SET_HAS_MORE,
          payload: res.totalConversations > chatStore.conversations.length ? true : false
        })

      } else {
        
        let res = await GET_messages({ conversationId: conversationId, page: page });
        dispatch({ type: APPEND_OLDER_MESSAGES, payload: res.messages });
        dispatch({ type: INC_PAGE })
        
        dispatch({
          type: SET_HAS_MORE,
          payload: res.totalConversations > chatStore.conversations.length ? true : false
        })
      }

    } catch (error) {
      handleCatchBlock(error, navigate,dispatch);
      setLoading(false)
    } finally {
      setLoading(false)

    }

  }

  const loadOlderMessages = async () => {
    
    
    if(chatStore.hasMore){
      

      get_Messages(chatStore.conversationId, chatStore.page)
    }

  }

  const selectAUser = async (userId) => {

    dispatch({
      type:RESET_CONVERSATIONS
    })
   
    dispatch({
      type: SET_SELECTED_USER,
      payload: userId
    })
    dispatch({
      type: CLEAR_NEW_MESSAGE_NOTIFICATION_IN_USER_LIST,
      payload: userId
    })
   
    let conversationId = await get_ConversationId(userId);
    get_Messages(conversationId, 1)
  }

  const setMessageToSent = (message) => {

    const formmatedMessage = {

      _id: generateUniqueId(),
      sender: loggedInUserStore.user._id,
      conversationId: chatStore.conversationId,
      content: message,
      createdAt: getCurrentUtcTime()

    }

    dispatch({
      type: PUSH_NEW_MESSAGE,
      payload: formmatedMessage
    });



    sendMessage({ content: message, conversationId: chatStore.conversationId })
  }





  return (
    <>
      <Loader openState={loading} />
      <Box className="chat-container">
        <ConversationList
          userList={chatStore.userList}
          selectAUserForChat={selectAUser}
          selectedUser={chatStore.selectedUser}
        />
        <ChatWindow
          setMessageToSentFn={setMessageToSent}
          selectedUser={chatStore.selectedUser}
          messages={chatStore.conversations}
          loggedInUser={loggedInUserStore.user._id}
          onLoadOlderMessages={loadOlderMessages}

        />
      </Box>
    </>

  )
}

export default HomePage