import axios from 'axios';

const TestAPI = {
    createTest: async (testInfo, jwt) => {//need token
        try {
            return axios.post('/tests', testInfo, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    getAllTests: async userID => {
        try {
            if (userID) return axios.get(`/tests?userID=${userID}`);
            return axios.get("/tests")
        } catch (e) {
            return e.message
        }
    },
    getAllTestsByUser: async () => {
        try { } catch (e) {
            return e.message;
        }
    },
    getTestById: async (testID, userID) => {
        try {
            return axios.get(`/tests/id?testID=${testID}&userID=${userID}`)
        } catch (e) {
            return e.message;
        }
    },
    updateTestById: async (testID, testInfo, jwt) => {// need token
        try {
            return axios.put(`/tests?testID=${testID}`, testInfo, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    deleteTestById: async (testID, jwt) => {// need token
        try {
            axios.delete(`/tests?testID=${testID}`, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
}

export default TestAPI;