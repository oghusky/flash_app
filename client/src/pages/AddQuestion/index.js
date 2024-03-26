import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// components
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import TextInputs from "../../components/TextInputs";
import Buttons from "../../components/Buttons";
import { Helmet } from 'react-helmet';
import QuestionAPI from '../../API/questions';
import AppContext from '../../store/AppContext';
export default function AddQuestion() {
    const { jwt, setAppMsg } = useContext(AppContext);
    const navigate = useNavigate();
    const params = useParams();
    const [questions, setQuestions] = useState([
        {
            question: "",
            answer: ""
        }
    ]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await QuestionAPI.createNewQuestion(params?.deckID, questions, jwt);
            if (res.status === 201) {
                setAppMsg({ show: true, variant: "success", text: "Questions created!" })
                navigate(`/deck/id/${params?.deckID}`);
            } else {
                console.log("bloop")
                setAppMsg({ show: true, variant: "danger", text: res.data.msg })
            }
        } catch (e) {
            return e.message
        }
    }
    const handleUserInputChange = (index, event) => {
        const { name, value } = event.target;
        const newQuestions = [...questions];
        newQuestions[index][name] = value;
        setQuestions(newQuestions);
    }
    const handleAddQuestion = () => {
        setQuestions([...questions, {
            question: '',
            answer: ''
        }
        ]);
    };
    const questionsArray = questions.map((question, index) => (
        <div key={index}>
            <TextInputs
                label={"Question"}
                type={"text"}
                placeholder={"Enter question"}
                name={`question`}
                onChange={e => handleUserInputChange(index, e)}
                value={questions.question}
            />
            <TextInputs
                label={"Answer"}
                type={"text"}
                placeholder={"Enter answer"}
                name={`answer`}
                onChange={e => handleUserInputChange(index, e)}
                value={questions.answer}
            />
        </div>
    ))
    return (
        <Container>
            <Helmet>
                <title>Flash_App | Add Question(s)</title>
            </Helmet>
            <Form onSubmit={handleSubmit}>
                {questionsArray}
                <Buttons
                    btnText={"Add New Question"}
                    variant={"outline-primary"}
                    onClick={handleAddQuestion}
                    className={"w-100 my-1"}
                />
                <Buttons
                    btnText={"Submit"}
                    type={"submit"}
                    variant={"primary"}
                    className={"w-100 my-1"}
                />
            </Form>
        </Container>
    );
} 