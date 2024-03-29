import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import QuestionAPI from '../../API/questions';
import AppContext from '../../store/AppContext';
import './FlashCard.css'; // Import CSS for styling

export default function RunDeck() {
    const params = useParams();
    const { jwt } = useContext(AppContext);
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        getQuestionsByDeckID(params?.deckID);
    }, [params?.deckID]);
    const getQuestionsByDeckID = async deckID => {
        try {
            const res = await QuestionAPI.getQuestionsByDeckID(deckID, jwt);
            if (res.status === 200) {
                setQuestions(res.data.questions);
            }
        } catch (e) {
            return e.message;
        }
    }
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleCardClick = () => {
        setShowAnswer(!showAnswer);
    };

    const handlePrevCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setShowAnswer(false);
        }
    };

    const handleNextCard = () => {
        if (currentCardIndex < questions?.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setShowAnswer(false);
        }
    };
    return (
        <Container className='d-flex align-items-center justify-content-center flex-column' id="flashcard-container">
            <div
                className={`flashcard ${showAnswer ? 'flipped' : ''}`}
                onClick={handleCardClick}
            >
                <div className="front">
                    <p><b>Q: {questions[currentCardIndex]?.question}</b></p>
                </div>
                <div className="back">
                    <p>A: {questions[currentCardIndex]?.answer}</p>
                </div>
            </div>
            <div className="navigation-arrows">
                <button className="leftArrow" onClick={handlePrevCard} disabled={currentCardIndex === 0}>
                    &#10094; Prev
                </button>
                <button className="rightArrow" onClick={handleNextCard} disabled={currentCardIndex === questions?.length - 1}>
                    Next &#10095;
                </button>
            </div>
        </Container>
    );
}


