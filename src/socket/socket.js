import { io } from "socket.io-client";
import { getLocalStorage } from "../utils/localstorageFns";
import { SOCKET_URL, TOKEN_NAME } from "../config/constants";

let socket;

export const connectSocket = () => {
  const token = getLocalStorage(TOKEN_NAME);

  if (!token) return;
  
  socket = io(SOCKET_URL, {
    auth: { token:token }, 
    transports: ["websocket"]
  });

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
  });

  return socket;
};

export const getSocket = () => socket;



export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected");
  }
};