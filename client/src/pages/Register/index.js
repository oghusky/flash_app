import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// components
import Form from 'react-bootstrap/Form';
import TextInputs from '../../components/TextInputs';
import Buttons from '../../components/Buttons';
import CheckInputs from '../../components/CheckInputs';
import { Helmet } from 'react-helmet';
// API
import API from '../../API/users';
// context
import AppContext from '../../store/AppContext';
export default function Register() {
    const { setAppMsg } = useContext(AppContext);
    const navigate = useNavigate();
    const [register, setRegister] = useState({
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        isAdult: false,
        userName: ''
    })

    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]: value })
    }

    const hanldeCheckboxChange = (event) => {
        const { checked, name } = event.target;setRegister({ ...register, [name]: checked });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await API.postRegister(register);
        if (response.status === 201) {
            setAppMsg({ show: true, variant: "success", text: "Registration success!" });
            navigate('/login');
        } else {
            setAppMsg({ show: true, variant: "danger", text: response.response.data.msg });
        }
    }

    return (
        <>
            <Helmet><title>QuestAnon | Register</title></Helmet>
            <h3 className="text-center">REGISTER</h3>
            <Form onSubmit={handleSubmit}>
                <TextInputs
                    type={'email'}
                    id={'registerEmail'}
                    name={'email'}
                    label={'Email'}
                    placeholder={'user@bloopco.io'}
                    onChange={handleUserInputChange}
                />
                <TextInputs
                    type={'text'}
                    id={'userName'}
                    name={'userName'}
                    label={'Username'}
                    placeholder={'Enter username'}
                    onChange={handleUserInputChange}
                />
                <TextInputs
                    id={'firstName'}
                    type={'text'}
                    name={'firstName'}
                    label={'First Name'}
                    placeholder={'Enter your first name'}
                    onChange={handleUserInputChange}
                />
                <TextInputs
                    id={'lasttName'}
                    type={'text'}
                    name={'lastName'}
                    label={'Last Name'}
                    placeholder={'Enter your last name'}
                    onChange={handleUserInputChange}
                />
                <TextInputs
                    id={'registerPassword'}
                    type={'password'}
                    name={'password'}
                    label={'Password'}
                    placeholder={'Password'}
                    onChange={handleUserInputChange}
                />
                <CheckInputs
                    id={"isAdult"}
                    type={"checkbox"}
                    name={"isAdult"}
                    label={"Are you over 18?"}
                    onChange={hanldeCheckboxChange}
                />
                <Buttons
                    variant={'primary'}
                    btnText={'REGISTER'}
                    btnAlign={'text-end my-3'}
                    type={'submit'}
                />
            </Form>
            <p className="text-center">Have an account <Link to="/login">Login</Link></p>
        </>
    )
}
