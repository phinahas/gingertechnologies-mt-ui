import { START_GAME } from './actions';

const initialState = {
  roomId:null,
  borad:[
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
  users:[],
  activeUser:null
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        users:action.payload.gameUsers,
        roomId:action.payload.roomId,
        activeUser:action.payload.activeUser,
        board:action.payload.board

      };
    
    default:
      return state;
  }
};

export default snackbarReducer;
