import axios from 'axios';

const UserAPI = {
    postRegister: async register => {
        try {
            return await axios.post('/users', { register });
        } catch (e) {
            return e.message;
        }
    },
    postLogin: async login => {
        try {
            return await axios.post('/users/login', { login });
        } catch (e) {
            return e.message;
        }
    },
    getUserByID: async (userID, jwt) => {
        try {
            return await axios.get(`/users/id/${userID}`, {
                headers: {
                    authorization: jwt
                }
            });
        } catch (e) {
            return e.message
        }
    },
    editUserByID: async (userID, data, jwt) => {
        try {
            return await axios.put(`/users/id/${userID}`, data, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    deleteUserByID: async (userID, jwt) => {
        try {
            return await axios.delete(`/users/id/${userID}`, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    }
};
export default UserAPI;