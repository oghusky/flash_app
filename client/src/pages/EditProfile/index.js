import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from "react-bootstrap";
import TextInputs from "../../components/TextInputs";
import Buttons from '../../components/Buttons';
import Modals from '../../components/Modals';
import AppContext from '../../store/AppContext';
import UserAPI from '../../API/users';
export default function EditProfile() {
    const [deleteUserModalShow, setDeleteUserModalShow] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const { setAppMsg, setUser, setJwt, user, jwt } = useContext(AppContext);
    const [editProfile, setEditProfile] = useState({
        firstName: user.firstName,
        userName: user.userName,
        lastName: user.lastName,
        email: user.email,
        password: "",
        confirm: "",
    });
    const handleDeleteModalClose = () => setDeleteUserModalShow(false);
    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        setEditProfile({ ...editProfile, [name]: value })
    }
    const handleSubmitDeleteUserClick = async () => {
        try {
            const res = await UserAPI.deleteUserByID(user._id, jwt);
            if (res.status === 200) {
                localStorage.setItem("FA_User", JSON.stringify({
                    token: "",
                    user: ""
                }));
                setJwt("");
                setUser("");
                navigate('/decks');
                setAppMsg({ show: true, variant: "primary", text: "Sorry to see you go!" });
            }
        } catch (e) {
            return e.message;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const pwdMatch = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
        if (editProfile.password && !editProfile.password.match(pwdMatch)) {
            return setAppMsg({ show: true, variant: "danger", text: "Password must be at least 6 characters, have one capital letter, have one number, and one symbols" });
        }
        if ((editProfile.password === editProfile.confirm)) {
            const response = await UserAPI.editUserByID(user._id, editProfile, jwt);
            if (response && response.status === 200) {
                localStorage.setItem("FA_User", JSON.stringify({
                    token: response.data.token,
                    user: response.data.updatedUser
                }));
                setJwt(response.data.token);
                setUser(response.data.updatedUser);
                navigate(`/user/id/${params?.userID}`);
                setAppMsg({ show: true, variant: "success", text: "User updated!" });
            } else {
                setAppMsg({ show: true, variant: "danger", text: "Something went wrong. Try again." });
            }
        }
    }
    useEffect(() => {
        if (user?._id !== params?.userID) {
            navigate(`/user/id/${params?.userID}`);
        }
    }, [navigate, params?.userID, user?._id]);
    const handleUserDeleteClick = () => {
        setDeleteUserModalShow(true)
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <TextInputs
                    onChange={handleUserInputChange}
                    placeholder={'user@bloopco.io'}
                    id={'registerEmail'}
                    label={'Email'}
                    type={'email'}
                    name={'email'}
                />
                <TextInputs
                    onChange={handleUserInputChange}
                    placeholder={'Enter username'}
                    label={'Username'}
                    name={'userName'}
                    id={'userName'}
                    type={'text'}
                />
                <TextInputs
                    placeholder={'Enter your first name'}
                    onChange={handleUserInputChange}
                    label={'First Name'}
                    name={'firstName'}
                    id={'firstName'}
                    type={'text'}
                />
                <TextInputs
                    placeholder={'Enter your last name'}
                    onChange={handleUserInputChange}
                    label={'Last Name'}
                    name={'lastName'}
                    id={'lasttName'}
                    type={'text'}
                />
                <TextInputs
                    onChange={handleUserInputChange}
                    placeholder={'Password'}
                    id={'registerPassword'}
                    label={'Password'}
                    type={'password'}
                    name={'password'}
                />
                <TextInputs
                    onChange={handleUserInputChange}
                    label={'Confirm Password'}
                    placeholder={'Confirm Password'}
                    id={'confirmPassword'}
                    type={'password'}
                    name={'confirm'}
                />
                <Buttons
                    btnAlign={'text-end my-3'}
                    variant={'primary'}
                    className={"w-100"}
                    btnText={'Submit'}
                    type={'submit'}
                />
            </Form>
            <div style={{ padding: "0 30px" }}>
                <Buttons
                    style={{ display: "block", margin: "0 auto" }}
                    onClick={handleUserDeleteClick}
                    btnText={'Delete Account'}
                    className={"w-50 center"}
                    variant={'danger'}
                    btnAlign={'my-3'}
                    type={'button'}
                />
            </div>
            <Modals
                title="Are you sure you want to delete your account?"
                show={deleteUserModalShow}
                close={<Buttons btnText={"Cancel"} onClick={handleDeleteModalClose} variant={"outline-danger"} />}
                save={<Buttons btnText={"Delete"} variant={"danger"} onClick={handleSubmitDeleteUserClick} />}
                closeVariant={"none"}
                saveVariant={"none"}
            />
        </>
    );
}