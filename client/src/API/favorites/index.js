import axios from 'axios';

const FavoriteAPI = {
    getFavoriteByUserIDAndDeckID: async ({ deckID, testID }, jwt) => {
        try {
            return axios.get(`/favorites?deckID=${deckID || ""}&testID=${testID || ""}`, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    postFavoriteByUserIDAndDeckID: ({ deckID, testID }, jwt) => {
        try {
            return axios.post(`/favorites?deckID=${deckID || ""}&testID=${testID || ""}`, {}, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    },
    deleteFavoriteByUserIDAndDeckID: ({ deckID, testID }, jwt) => {
        try {
            return axios.delete(`/favorites?deckID=${deckID || ""}&testID=${testID || ""}`, {
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