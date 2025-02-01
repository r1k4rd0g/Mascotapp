import {Navigate, Outlet} from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}