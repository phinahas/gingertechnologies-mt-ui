import axios from '../axios';

export const POST_login = async ({email,password}) => {
   try {
    return (await axios.post('/auth/login',{email,password})).data;
    } catch (error) {
        throw error;
    }
};

export const POST_register = async ({username,email,password}) => {
   try {
    return (await axios.post(`/auth/register`, {username,email,password})).data;
    } catch (error) {
        throw error;
    }
}

export const GET_user = async () => {
   try {
    return (await axios.get(`/auth/user`)).data;
    } catch (error) {
        throw error;
    }
}
