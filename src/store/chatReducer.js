
// action - state management
import * as actionTypes from './actions';

export const initialState = {
    userList: [],
    selectedUser: null,
    message: '',
    conversations: [],
    conversationId: null,
    page: 1,
    hasMore:true

};

const chatReducer = (state = initialState, action) => {

    switch (action.type) {


        case actionTypes.SET_USERS:
            return {
                ...state,
                userList: action.payload
            }

        case actionTypes.SET_SELECTED_USER:
            return {
                ...state,
                selectedUser: action.payload
            }

        case actionTypes.SET_CONVERSATION_ID:
            return {
                ...state,
                conversationId: action.payload
            }

        case actionTypes.LOAD_MESSAGES:
            return {
                ...state,
                conversations: [...action.payload].reverse()
            }

        case actionTypes.APPEND_OLDER_MESSAGES:
            return {
                ...state,
                conversations: [...action.payload.reverse(), ...state.conversations]
            };

        case actionTypes.PUSH_NEW_MESSAGE:
            return {
                ...state,
                conversations: [...state.conversations, action.payload]
            }

        case actionTypes.INC_PAGE:
            return {
                ...state,
                page: state.page + 1
            }

        case actionTypes.RESET_PAGE:
            return{
                ...state,
                page:1
            }    

        case actionTypes.SET_HAS_MORE:
            return {
                ...state,
                hasMore:action.payload
            }    



        case actionTypes.SET_NEW_MESSAGE_NOTIFICATION_IN_USER_LIST:

            return {
                ...state,
                userList: state.userList.map(user =>
                    user._id === action.payload
                        ? { ...user, newMessage: true }
                        : user
                )
            };

        case actionTypes.CLEAR_NEW_MESSAGE_NOTIFICATION_IN_USER_LIST:
            
            return {
                ...state,
                userList: state.userList.map(user =>
                    user._id === action.payload
                        ? { ...user, newMessage: false }
                        : user
                )
            };    

        case actionTypes.RESET_CONVERSATIONS:
            return {
                ...state,
                conversations:[],
                page:1,
                hasMore:true
            };    
    


        case actionTypes.SET_TO_INITIAL_STATE:
            return initialState

        




        default:
            return state;

    }


}

export default chatReducer;