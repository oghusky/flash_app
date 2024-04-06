import axios from 'axios';

const QuestionAPI = {
    createNewQuestion: async (deckID, questions, jwt) => {
        try {
            return axios.post(`/questions?deckID=${deckID}`, questions, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    deleteQuestion: async (id, jwt) => {
        try {
            return axios.delete(`/questions/id?questionID=${id}`, {
                headers: {
                    authorization: jwt
                }
            });
        } catch (e) {
            return e.message
        }
    },
    getQuestionsByDeckID: async (deckID, jwt) => {
        try {
            return axios.get(`/questions?deckID=${deckID}`, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    createNewTestQuestions: async (questions, testID, jwt) => {
        try {
            return axios.post(`/questions/tests?testID=${testID}`, questions, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    getQuestionsByTestID: async testID => {
        try {
            return axios.get(`/questions/tests/id?testID=${testID}`);
        } catch (e) {
            return e.message;
        }
    },
    deleteTestQuestionByQuestionID: async (questionID, jwt) => {
        try {
            return axios.delete(`/questions/tests/id?questionID=${questionID}`, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    checkTestAnswerById: async (questionID, jwt) => {
        try {
            return axios.get(`/questions/tests/run?questionID=${questionID}`, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    }
}

export default QuestionAPI;