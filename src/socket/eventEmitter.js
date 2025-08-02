import { getSocket } from './socket';

export const sendMessage = ({ conversationId, content }) => {

    const socket = getSocket();
    socket.emit("send_message",
        {
            conversationId, content
        }
    )

}

