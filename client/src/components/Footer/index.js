import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
export default function Footer() {
    return (
        <footer style={{ backgroundColor: "#000", color: "#fff" }}>
            <Container className='p-3'>
                <Link className={"nav-link"} to="/">Home</Link>
                <Link className={"nav-link"} to="/termsofservice">Terms of service</Link>
            </Container>
        </footer>
    )
}