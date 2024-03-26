import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// context
import AppContext from '../../store/AppContext';
export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { jwt } = useContext(AppContext);
    const sendToLogin = (jwt) => {
        if (!jwt) navigate('/login');
    }
    return (
        <div>
            {jwt ? children : sendToLogin(jwt)}
        </div>
    )
}
