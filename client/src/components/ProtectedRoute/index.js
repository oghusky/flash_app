import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../../store/AppContext';
export default function ProtectedRoute({ children }) {
    const { jwt } = useContext(AppContext);
    return (
        <div>
            {jwt ? children : <Navigate to={"/login"} replace />}
        </div>
    )
}
