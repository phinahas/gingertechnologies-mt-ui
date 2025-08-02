import axios from '../axios';



export const GET_users = async () => {
   try {
    return (await axios.get(`/user`)).data;
    } catch (error) {
        throw error;
    }
}


export const GET_getConversationId = async({selectedUserId})=>{
     try {
    return (await axios.get(`/user/get-conversation-id?selectedUserId=${selectedUserId}`)).data;
    } catch (error) {
        throw error;
    }
}