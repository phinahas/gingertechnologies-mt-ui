import React, { useEffect, useState } from "react";

import { createGame, joinRoom } from '../../socket/xoxEventEmitter';

import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  useTheme,
} from "@mui/material";
import XOXGameBoardComponent from "../../components/xox-components/XOXGameBoardComponent";
import { generateUniqueId } from "../../utils/utils";
import { xoxEvents } from "../../socket/xoxEventListener ";
import { useDispatch, useSelector } from "react-redux";

const XOXPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const xoxGameStore = useSelector((state) => state.xoxStore);
  const userStore = useSelector((state) => state.userStore);

  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomCode, setJoinRoomCode] = useState("");


  useEffect(() => {

    xoxEvents(dispatch)

  }, []);

  const boardInitialState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]

  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const handleCreateRoom = () => {
    // Handle create room logic
    let roomId = generateUniqueId();
    createGame({ roomId });
    setCreateRoomName(roomId)

  };

  const handleJoinRoom = () => {
    // Handle join room logic
    joinRoom({
      roomId: joinRoomCode
    })
  };

  return (
    <Box sx={{ width: "100%", mt: 3, px: { xs: 1, sm: 4 } }}>

      {
        xoxGameStore.roomId == null &&
        <Grid
          container
          alignItems="center"
          justifyContent="flex-start"
          spacing={2}
          wrap="nowrap"
        >
          <Grid item xs={12} sm="auto">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>


              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateRoom}

                sx={{ ml: 1, whiteSpace: "nowrap" }}
              >
                Create Room
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, borderColor: theme.palette.divider }}
            />
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

              <TextField
                size="small"
                label="Room Code"
                variant="outlined"
                value={joinRoomCode}
                onChange={(e) => setJoinRoomCode(e.target.value)}
                sx={{ minWidth: 140 }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleJoinRoom}
                disabled={!joinRoomCode}
                sx={{ ml: 1, whiteSpace: "nowrap" }}
              >
                Join
              </Button>
            </Box>
          </Grid>
        </Grid>
      }

      <Grid >

        {xoxGameStore.roomId && xoxGameStore.users.length == 2 ?

          <XOXGameBoardComponent loggedInUser={userStore.user._id} activeUser={xoxStore.activeUser.user} board={board} /> : <h5>Waiting for player</h5>


        }
      </Grid>
    </Box>
  );
};

export default XOXPage;