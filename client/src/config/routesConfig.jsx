import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../components/dashboard';
import { Login } from '../components/login';
import { CustomerList } from '../components/customerList';
import { UserProfileSection } from '../components/userProfileSections';
import { ProtectedRoute } from '../components/protectedRoute';
import { MainLayout } from '../layouts/mainLayout';


export const IndicatorRoutes = () => {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route element={<ProtectedRoute />} >
                    <Route path="/" element={<MainLayout />} >
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/Clientes/Listar" element={<CustomerList />} />
                        <Route path="/user-profile" element={<UserProfileSection />} />
                    </Route>
            </Route>
        </Routes >
    );
}