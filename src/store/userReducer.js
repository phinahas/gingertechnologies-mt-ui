
// action - state management
import * as actionTypes from './actions';

export const initialState = {
    user:null,
    token:null

};

const userReducer = (state=initialState,action)=>{

    switch(action.type){

            
        case actionTypes.SET_USER:
            return{
                ...state,
                user:action.payload
            }  
            
        case actionTypes.SET_TOKEN:
            return{
                ...state,
                token:action.payload
            }      


        default:
            return state;

    }


}

export default userReducer;