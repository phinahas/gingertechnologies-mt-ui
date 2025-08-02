


import { getSocket } from './socket';

import { PUSH_NEW_MESSAGE, SET_NEW_MESSAGE_NOTIFICATION_IN_USER_LIST, SHOW_SNACKBAR } from '../store/actions'


export const chatEvents = (dispatch, selectedUserRef) => {
  const socket = getSocket();

  socket?.on("receive_message", (data) => {

    if (data.message.sender == selectedUserRef.current) {
      dispatch({
        type: PUSH_NEW_MESSAGE,
        payload: data.message
      });
    }

  });

  socket?.on("new_conversation_started", (data) => {


    if (selectedUserRef.current == data.sender) {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          message: `🔔 New Message`,
          severity: 'info'
        }

      })
    } else {
      dispatch({
        type: SHOW_SNACKBAR,
        payload: {
          message: `🔔 New Message`,
          severity: 'info'
        }

      })

      dispatch({
        type: SET_NEW_MESSAGE_NOTIFICATION_IN_USER_LIST,
        payload: data.sender


      })

    }

  });



  socket?.on("user_online", (data) => {

    dispatch({
      type: SHOW_SNACKBAR,
      payload: {
        message: `🟢 ${data.user.username}: Online`,
        severity: 'info'
      }

    })

  });

  socket?.on("user_offline", (data) => {

    dispatch({
      type: SHOW_SNACKBAR,
      payload: {
        message: `🔴 ${data.user.username}: Offline`,
        severity: 'info'
      }

    })

  });


};
