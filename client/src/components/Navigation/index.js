import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// context
import AppContext from '../../store/AppContext';
// components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Buttons from '../Buttons';

export default function Navigation() {
    const navigate = useNavigate();
    const { user, setUser, setJwt, setAppMsg } = useContext(AppContext);
    const handleLogout = async () => {
        localStorage.removeItem("FA_User");
        setUser({});
        setJwt("");
        setAppMsg({ show: true, variant: "primary", text: "See you next time!" })
        navigate('/login');
    }

    const [expanded, setExpanded] = useState(false);

    const handleNavbarToggle = () => {
        setExpanded(!expanded);
    };

    const handleLinkClick = () => {
        setExpanded(false);
    };
    return (
        <Navbar bg="light" expand="lg" expanded={expanded} onToggle={handleNavbarToggle}>
            <Container>
                <Link className="navbar-brand" to="/">Flash_App</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav onClick={handleLinkClick}>
                        <li className='nav-item'>
                            <Link className={"nav-link"} to={'/decks'}>Decks</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className={"nav-link"} to={'/tests'}>Tests</Link>
                        </li>
                        {user && user.email ? (
                            <>
                                <li className="nav-item">
                                    <Link to={`/user/id/${user._id}`} className="nav-link">Hi {user.userName}!</Link>
                                </li>
                                <li className="nav-item"
                                    onClick={() => handleLogout()}
                                >
                                    {/* eslint-disable */}
                                    <a href="#" className="nav-link">
                                        LOGOUT
                                    </a>
                                    {/* eslint-enable */}
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <Link to="/register" className='nav-link'> Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link"><Buttons className={"btn-sm"} btnText={"LOGIN"} btnAlign={"right"} variant={"outline-primary"} /></Link>
                                </li>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
