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
    setAppMsg: () => { },
    tests: [],
    setTests: () => { },
    report: {},
    setReport: () => { },
});

export default AppContext;