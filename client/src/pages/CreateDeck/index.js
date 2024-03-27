import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import Form from "react-bootstrap/Form";
import TextInputs from "../../components/TextInputs";
import CheckInputs from '../../components/CheckInputs';
import Buttons from "../../components/Buttons";
import { Helmet } from 'react-helmet';
// API
import DeckAPI from '../../API/decks';
// context
import AppContext from '../../store/AppContext';

export default function CreateDeck() {
    const navigate = useNavigate();
    const { jwt, decks, setDecks, setAppMsg } = useContext(AppContext);
    const [deckInfo, setDeckInfo] = useState({
        name: "",
        description: "",
        isForAdults: false,
    });
    const [wordCount, setWordCount] = useState(50);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!deckInfo.name || !deckInfo.description) setAppMsg({ show: true, variant: "danger", text: "Deck must have name and description!" });
        try {
            const res = await DeckAPI.createNewDeck(deckInfo, jwt);
            if (res.status === 201) {
                setDecks([...decks, res.data.deck]);
                setAppMsg({ show: true, variant: "success", text: "Deck created!" });
                navigate(`/deck/id/${res.data.deck._id}`);
            } else {
                setAppMsg({ show: true, variant: "danger", text: res.response.data.msg });
            }
        } catch (e) { return e.message }
    }
    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "description" && wordCount >= 0) {
            setWordCount(prevCount => --prevCount);
        }
        setDeckInfo({ ...deckInfo, [name]: value })
    }
    const hanldeCheckboxChange = (event) => {
        const { checked, name } = event.target;
        setDeckInfo({ ...deckInfo, [name]: checked });
    }
    return (
        <>
            <Helmet>
                <title>Flash_App | Create New Deck</title>
            </Helmet>
            <Form onSubmit={handleSubmit}>
                <TextInputs
                    type={'text'}
                    id={'deckName'}
                    name={'name'}
                    label={'Deck Name'}
                    placeholder={'Enter deck name'}
                    onChange={handleUserInputChange}
                />
                <TextInputs
                    type={'text'}
                    id={'deckDescription'}
                    name={'description'}
                    label={'Deck Description'}
                    placeholder={'Enter brief description'}
                    onChange={handleUserInputChange}
                    underInput={wordCount === 50 ? `50 characters left` : `${wordCount} characters left`}
                    maxLength={50}
                />
                <CheckInputs
                    id={"isForAdults"}
                    type={"checkbox"}
                    name={"isForAdults"}
                    label={"Is this deck for adults"}
                    onChange={hanldeCheckboxChange}
                />
                <Buttons btnText={"Submit"} type={"submit"} variant={"primary"} />
            </Form>
        </>
    );
}