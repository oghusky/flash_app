import axios from 'axios';

const SearchAPI = {
    getDeckBySearch: async searchTerm => {
        try {
            return await axios.get(`/search?searchTerm=${searchTerm}`)
        } catch (e) {
            return e.message;
        }
    }
}

export default SearchAPI;