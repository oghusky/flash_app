import axios from 'axios';

const DeckAPI = {
    getAllDecks: async () => {
        try {
            return axios.get("/decks")
        } catch (e) {
            return e.message
        }
    },
    createNewDeck: async (deckInfo, jwt) => {
        try {
            return axios.post("/decks", deckInfo, {
                headers: {
                    authorization: jwt
                }
            });
        } catch (e) {
            return e.message;
        }
    },
    getDeckByDeckID: async id => {
        try {
            return axios.get(`/decks/id?deckID=${id}`)
        } catch (e) { return e.message }
    },
    deleteDeckByDeckID: async (id, jwt) => {
        try {
            return axios.delete(`/decks/id?deckID=${id}`, {
                headers: {
                    authorization: jwt
                }
            });
        } catch (e) {
            return e.message;
        }
    }
}

export default DeckAPI;