import { combineReducers } from 'redux';

// reducer import

import snackbarReducer from './snackbarReducers';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import xoxReducer from './xoxReducer'


// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({

    snackbarStore: snackbarReducer,
    userStore: userReducer,
    chatStore:chatReducer,
    xoxStore:xoxReducer

});

export default reducer;
