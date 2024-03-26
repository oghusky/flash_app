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
    }
}

export default QuestionAPI;