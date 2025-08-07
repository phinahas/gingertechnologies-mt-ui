import { getSocket } from './socket';

export const createGame = ({ roomId }) => {

    console.log(roomId)

    const socket = getSocket();
    socket.emit("createRoom",
        {
            roomId
        }
    )

}

export const joinRoom = ({ roomId }) => {

    console.log(roomId)

    const socket = getSocket();
    socket.emit("joinRoom",
        {
            roomId
        }
    )

}


