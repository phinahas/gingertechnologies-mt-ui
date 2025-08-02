import axios from '../axios';



export const GET_messages = async ({conversationId,page}) => {
   try {
    return (await axios.get(`/message/${conversationId}?page=${page}`)).data;
    } catch (error) {
        throw error;
    }
}


