import { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Container } from 'react-bootstrap';
import Buttons from '../../components/Buttons';
import QuestionAPI from '../../API/questions';
import AppContext from '../../store/AppContext';

export default function RunTest() {
    const params = useParams();
    const { jwt, setAppMsg } = useContext(AppContext);
    const [questions, setQuestions] = useState([]);
    const [questionsLength, setQuestionsLength] = useState(0);
    const getQuestionsByTestID = useCallback(async testID => {
        try {
            const res = await QuestionAPI.getQuestionsByTestID(testID, jwt);
            if (res.status === 200) {
                setQuestions(res.data.questions);
                setQuestionsLength(res.data.questions.length);
            }
        } catch (e) {
            return e.message;
        }
    }, [jwt]);
    useEffect(() => {
        getQuestionsByTestID(params?.testID);
    }, [params?.testID, getQuestionsByTestID]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const handleOptionChange = (option) => {
        setSelectedAnswer(option);
    };

    const handleNextQuestion = async () => {
        // Check if the user has selected an answer
        if (selectedAnswer !== '') {
            // Move to the next question
            const res = await QuestionAPI.checkTestAnswerById(questions[currentQuestionIndex]?._id, jwt);
            const formattedAnswer = res.data.answer === true ? "True" : res.data.answer === "False" ? false : res.data.answer;
            if (res.status === 200 && (formattedAnswer === selectedAnswer)) {
                setAppMsg({ show: true, variant: "success", text: "Nice!!!" });
            } else setAppMsg({ show: true, variant: "danger", text: "Incorrect. Try again" });
            if (currentQuestionIndex < questionsLength && (formattedAnswer === selectedAnswer)) setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            // Reset selected answer for the next question
            setSelectedAnswer('');
        } else {
            // Show an alert or message indicating that the user needs to select an answer
            setAppMsg({ show: true, variant: "warning", text: 'Please select an answer before proceeding to the next question.' });
        }
    };

    return (
        <Container className='d-flex justify-content-start flex-column mt-5'>
            <Helmet><title>Flash_App | Run a test</title></Helmet>
            {
                (currentQuestionIndex < questionsLength) ? (
                    <div className='p-3' style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
                        <p className='d-flex justify-content-between flex-row'><span>Question {currentQuestionIndex + 1}</span> <span>{currentQuestionIndex + 1} of {questionsLength}</span></p>
                        <h3>{questions[currentQuestionIndex]?.question.toUpperCase()}</h3>
                        <ul style={{ padding: "0 10px" }}>
                            {questions[currentQuestionIndex]?.options?.map((option, index) => (
                                <li key={index} style={{ display: `${option ? 'block' : 'none'}` }}>
                                    <input
                                        type="radio"
                                        id={`option-${index}`}
                                        value={option}
                                        checked={selectedAnswer === option}
                                        onChange={() => handleOptionChange(option)}
                                    />
                                    <label htmlFor={`option-${index}`} style={{ marginLeft: "10px" }}>{option}</label>
                                </li>
                            ))}
                        </ul>
                        <Buttons
                            className={"w-100"}
                            variant={"primary"}
                            btnText={"Submit Answer"}
                            onClick={handleNextQuestion}
                        />
                    </div>)
                    :
                    (<div>
                        <h6>Good Job!!!</h6>
                        <Link to="/tests">Go back to tests page</Link>\
                    </div>)
            }
        </Container>
    );
}