import { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
// components
import Form from "react-bootstrap/Form";
import TextInputs from "../../components/TextInputs";
import Buttons from "../../components/Buttons";
import { Helmet } from 'react-helmet';
// API
import UserAPI from "../../API/users";
// context
import AppContext from "../../store/AppContext";
export default function Login() {
    const { setJwt, setUser, setAppMsg } = useContext(AppContext);
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        password: '',
        email: '',
    })

    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await UserAPI.postLogin(login);
        if (response && response.status === 200) {
            localStorage.setItem("FA_User", JSON.stringify({
                token: response.data.token,
                user: response.data.user
            }));
            setJwt(response.data.token);
            setUser(response.data.user);
            navigate('/decks');
            setAppMsg({ show: true, variant: "success", text: "Welcome!" });
        } else {
            setAppMsg({ show: true, variant: "danger", text: "Your info doesn't match. Try again." });
        }
    }

    return (
        <>
            <Helmet><title>Flash_App | Login</title></Helmet>
            <h3 className="text-center">LOGIN</h3>
            <Form onSubmit={handleSubmit}>
                <TextInputs
                    type={'text'}
                    id={'registerEmail'}
                    name={'email'}
                    label={'Email'}
                    placeholder={'user@email.com'}
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
                <Buttons
                    variant={'primary'}
                    btnText={'LOGIN'}
                    btnAlign={'text-end my-3'}
                    type={'submit'}
                />
            </Form>
            <p className="text-center">Don't have an account <Link to="/register">Register</Link></p>
        </>
    );
}
