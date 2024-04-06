import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// components
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import TextInputs from "../../components/TextInputs";
import PrependInput from '../../components/PrependInput';
import Buttons from "../../components/Buttons";
import Modals from "../../components/Modals";
import { Helmet } from 'react-helmet';
import QuestionAPI from '../../API/questions';
import AppContext from '../../store/AppContext';
export default function AddTestQuestion() {
    const { jwt, setAppMsg } = useContext(AppContext);
    const navigate = useNavigate();
    const params = useParams();
    const [questions, setQuestions] = useState([]);
    const handleUserInputChange = (index, event) => {
        const { name, value } = event.target;
        const newQuestions = [...questions];
        newQuestions[index][name] = value;
        setQuestions(newQuestions);
    }
    const handleAddMcQuestion = () => {
        setQuestions([
            ...questions,
            {
                questionType: "multipleChoice",
                question: "",
                options: ["", "", "", ""],
                answer: ""
            }
        ]);
    };

    const handleAddTFQuestion = () => {
        setQuestions([
            ...questions,
            {
                questionType: "trueFalse",
                question: "",
                options: ["True", "False"], // Fixed options for True/False
                answer: ""
            }
        ]);
    };
    const handleOptionInputChange = (qIndex, oIndex, e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex] = e.target.value;
        setQuestions(updatedQuestions);
    };

    const questionsArray = questions.map((question, index) => {
        return (
            <div key={index} className={"my-2"}>
                <TextInputs
                    label={`Question ${index + 1}`}
                    type={"text"}
                    placeholder={"Enter question"}
                    name={`question`}
                    onChange={(e) => handleUserInputChange(index, e)}
                    value={question.question} // Use question.question instead of questions.question
                />
                {question.options.map((option, oIndex) => {
                    return (
                        <TextInputs
                            key={oIndex}
                            label={"Option"}
                            type={"text"}
                            placeholder={"Enter option answer"}
                            name={`option${oIndex}`}
                            onChange={(e) => handleOptionInputChange(index, oIndex, e)} // Pass the correct index
                            value={option} // Use option instead of questions.option
                        />
                    );
                })}
                <TextInputs
                    label={"Answer (Copy/Paste answer here)"}
                    type={"text"}
                    placeholder={"Enter answer"}
                    name={`answer`}
                    onChange={(e) => handleUserInputChange(index, e)}
                    value={question.answer} // Use question.answer instead of questions.answer
                />
            </div>
        );
    });
    const handleTestSubmit = async e => {
        e.preventDefault();
        try {
            let allValidQuestions;
            questions.forEach(q => {
                if (!q.question || !q.answer) {
                    setAppMsg({ show: true, variant: "danger", text: "You must enter a question and answer for each entry" });
                    return;
                }
                if (!q.options.includes(q.answer)) {
                    setAppMsg({ show: true, variant: "danger", text: "Your options do not include your answer" });
                    return;
                }
                allValidQuestions = true;
            })
            if (allValidQuestions) {
                const res = await QuestionAPI.createNewTestQuestions(questions, params?.testID, jwt);
                navigate(`/test/id/${params?.testID}`);
            }
        } catch (e) {
            return e.message;
        }
    }
    return (
        <>
            <Container>
                <h2 className='text-center'>Add Test Question(s)</h2>

                <Form onSubmit={handleTestSubmit}>
                    {questionsArray}
                    <Buttons
                        btnText={"Add Multiple Choice Question"}
                        variant={"outline-primary"}
                        onClick={handleAddMcQuestion}
                        className={"w-100 my-1"}
                    />
                    <Buttons
                        btnText={"Add True or False Question"}
                        variant={"outline-primary"}
                        onClick={handleAddTFQuestion}
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
        </>
    );
}