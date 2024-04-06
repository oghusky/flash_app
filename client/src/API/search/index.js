import axios from 'axios';

const SearchAPI = {
    getDeckBySearch: async searchTerm => {
        try {
            return await axios.get(`/search?searchTerm=${searchTerm}`)
        } catch (e) {
            return e.message;
        }
    },
    getTestsBySearch: async searchTerm => {
        console.log({ searchTerm })
        try {
            return await axios.get(`/search?testsSearchTerm=${searchTerm}`)
        } catch (e) {
            return e.message;
        }
    }
}

export default SearchAPI;