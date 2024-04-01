import React, { useState, useContext } from 'react';
import { useHref } from 'react-router-dom';
import AppContext from '../../store/AppContext'
import SearchAPI from '../../API/search';
import './SearchInput.css';

const SearchInput = () => {
    const href = useHref();
    const [searchTerm, setSearchTerm] = useState('');
    const { setDecks } = useContext(AppContext);
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const isDecksOrTests = href.split("/").includes("decks") ? "decks" : "tests";

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await SearchAPI.getDeckBySearch(searchTerm);
            if (res.status === 200) setDecks(res.data.decks);
        } catch (e) {
            return e.message;
        }
    };
    return (
        <form className="search-form px-0" onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={`Search ${isDecksOrTests}...`}
                className="search-input"
            />
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
};

export default SearchInput;
