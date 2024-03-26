import React from 'react';

const AppContext = React.createContext({
    jwt: "",
    setJwt: function () { },
    user: {},
    setUser: () => { },
    decks: [],
    setDecks: () => { },
    questions: [],
    setQuestions: () => { },
    comments: [],
    setComments: () => { },
    appMsg: {},
    setAppMsg: () => { }
});

export default AppContext;