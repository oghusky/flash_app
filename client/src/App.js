import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
// containers
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import AddQuestion from './pages/AddQuestion';
import UserProfile from './pages/UserProfile';
import CreateDeck from './pages/CreateDeck';
import MsgDiv from './components/MsgDiv';
import Register from './pages/Register';
import SeeDeck from './pages/SeeDeck';
import Login from './pages/Login';
import Decks from './pages/Decks';
// import Login from './pages/Login';
// import Questions from './components/Questions';
import Welcome from './pages/Welcome';
// context
import AppContext from './store/AppContext';
function App() {
  // state
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState([]);
  const [appMsg, setAppMsg] = useState({});
  const [decks, setDecks] = useState([]);
  const [user, setUser] = useState({});
  const [jwt, setJwt] = useState("");
  // state object
  const state = {
    questions, setQuestions,
    comments, setComments,
    appMsg, setAppMsg,
    decks, setDecks,
    user, setUser,
    jwt, setJwt
  };
  // useeffect
  // check if user logged in
  useEffect(() => {
    if (localStorage.getItem("FA_User")) {
      setJwt(JSON.parse(localStorage.getItem("FA_User")).token);
      setUser(JSON.parse(localStorage.getItem("FA_User")).user);
    } else {
      setJwt("");
      setUser({});
    }
  }, [])
  // sets alert to blank on load
  useEffect(() => {
    setAppMsg({ show: false, variant: "success", text: "" })
    // eslint-disable-next-line
  }, [])
  // hides alert after 2 seconds
  useEffect(() => {
    if (appMsg.show) {
      const hideDiv = setTimeout(() => {
        return setAppMsg({
          show: false,
          variant: "",
          text: ""
        });
      }, 2000);
      return () => {
        clearTimeout(hideDiv)
      }
    }
  }, [appMsg]);
  return (
    <div className='App'>
      <Router>
        <Helmet>
          <title>Flash_App</title>
        </Helmet>
        <AppContext.Provider value={state}>
          <Navigation />
          <MsgDiv appMsg={appMsg} />
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/decks" element={<Decks />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/create_deck" element={<CreateDeck />} />
            <Route exact path="/deck/id/:deckID" element={<SeeDeck />} />
            <Route exact path="/user/id/:userID" element={<UserProfile />} />
            <Route exact path="/deck/add_question/:deckID" element={<AddQuestion />} />
          </Routes>
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;