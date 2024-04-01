import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../../store/AppContext';
export default function ProtectedRoute({ children }) {
    const { jwt, user } = useContext(AppContext);
    return (
        <div>
            {jwt || user ? children : <Navigate to={"/login"} replace />}
        </div>
    )
}
