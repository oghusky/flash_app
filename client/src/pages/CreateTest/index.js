import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import Form from "react-bootstrap/Form";
import TextInputs from "../../components/TextInputs";
import Buttons from "../../components/Buttons";
import { Helmet } from 'react-helmet';
// API
import TestAPI from '../../API/tests';
// context
import AppContext from '../../store/AppContext';

export default function CreateTest() {
    const { jwt, tests, setTests, setAppMsg } = useContext(AppContext);
    const [wordCount, setWordCount] = useState(50);
    const [testInfo, setTestInfo] = useState({
        name: "",
        description: ""
    });
    const navigate = useNavigate();
    const isValidDescription = /^[a-zA-Z0-9,\-. ]+$/.test(testInfo.description);
    const isValidName = /^[a-zA-Z0-9,\-. ]+$/.test(testInfo.name);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!testInfo.name) {
            setAppMsg({ show: true, variant: "danger", text: "Test must have name" });
            return;
        }
        try {
            const res = await TestAPI.createTest(testInfo, jwt);
            if (res.status === 201) {
                setTests([...tests, res.data.test]);
                setAppMsg({ show: true, variant: "success", text: "Test created!" });
                navigate(`/test/id/${res.data.test._id}`);
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
        if (name === "description" || name === "name") {
            const isValid = /^[a-zA-Z0-9,\-. ]+$/.test(value);
            if (!isValid) {
                setAppMsg({ show: true, variant: "danger", text: "Name and description can only contain alphanumeric characters, commas, hyphens, and periods." });
            }
        }
        setTestInfo({ ...testInfo, [name]: value })
    }
    return (
        <>
            <Helmet>
                <title>Flash_App | Create New Test</title>
            </Helmet>
            <Form onSubmit={handleSubmit}>
                <TextInputs
                    type={'text'}
                    id={'testName'}
                    name={'name'}
                    label={'Test Name'}
                    placeholder={'Enter test name'}
                    onChange={handleUserInputChange}
                />
                <TextInputs
                    type={'text'}
                    id={'testDescription'}
                    name={'description'}
                    label={'Test Description'}
                    placeholder={'Enter brief description'}
                    onChange={handleUserInputChange}
                    underInput={wordCount === 50 ? `50 characters left` : `${wordCount} characters left`}
                    maxLength={50}
                />
                <Buttons
                    variant={"primary"}
                    btnText={"Submit"}
                    type={"submit"}
                    disabled={!isValidName || !isValidDescription}
                />
            </Form>
        </>
    );
}