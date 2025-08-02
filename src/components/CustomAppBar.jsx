import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SET_TO_INITIAL_STATE, SET_TOKEN, SET_USER } from "../store/actions";
import { useNavigate } from "react-router-dom";

import {disconnectSocket} from '../socket/socket'
import { TOKEN_NAME } from "../config/constants";

const CustomAppBar = () => {

  const userStore = useSelector((state)=>state.userStore)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  

  const handleLogout = () => {
  
    
    disconnectSocket()
    localStorage.removeItem(TOKEN_NAME); 
    dispatch({ type: SET_USER, payload: null });
    dispatch({ type: SET_TOKEN, payload: null });
    dispatch({type:SET_TO_INITIAL_STATE}) 


    navigate('/login')
   
  };

  return (
    <AppBar position="sticky" color="primary" sx={{ zIndex: 1300 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Hi, {userStore?.user?.username || null}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
              sx={{ fontWeight: 500 }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
