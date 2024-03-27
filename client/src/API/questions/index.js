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
    }
}

export default QuestionAPI;