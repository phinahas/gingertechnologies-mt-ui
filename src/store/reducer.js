import { combineReducers } from 'redux';

// reducer import

import snackbarReducer from './snackbarReducers';
import userReducer from './userReducer';
import chatReducer from './chatReducer';


// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({

    snackbarStore: snackbarReducer,
    userStore: userReducer,
    chatStore:chatReducer

});

export default reducer;
