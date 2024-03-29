import axios from 'axios';

const FavoriteAPI = {
    getFavoriteByUserIDAndDeckID: async (deckID, jwt) => {
        try {
            return axios.get(`/favorites?deckID=${deckID}`, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    postFavoriteByUserIDAndDeckID: (deckID, jwt) => {
        try {
            return axios.post(`/favorites?deckID=${deckID}`, {}, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    deleteFavoriteByUserIDAndDeckID: (deckID, jwt) => {
        try {
            return axios.delete(`/favorites?deckID=${deckID}`, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    }
}

export default FavoriteAPI;