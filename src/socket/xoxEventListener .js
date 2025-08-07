


import { getSocket } from './socket';

import { PUSH_NEW_MESSAGE, SET_NEW_MESSAGE_NOTIFICATION_IN_USER_LIST, SHOW_SNACKBAR, START_GAME } from '../store/actions'


export const xoxEvents = (dispatch) => {
  const socket = getSocket();

socket.on("res_roomCreated",({
  roomConfig
})=>{

  console.log(roomConfig)
  dispatch({
    type:START_GAME,
    payload:{
      gameUsers:roomConfig.game,
      roomId:roomConfig.room,
      activeUser:roomConfig.game[0].user,
      board:roomConfig.board
    }
  })

})

socket.on("joinedRoom",({roomConfig})=>{
  console.log(roomConfig);
  dispatch({
    type:START_GAME,
    payload:{
      gameUsers:roomConfig.game,
      roomId:roomConfig.roomId,
      activeUser: roomConfig.game.find((user)=>user.turn == true) ,
      board:roomConfig.board
    }
  })
})

socket.on("error_joinRoomError",(res)=>{
  console.log(res)
})
};
