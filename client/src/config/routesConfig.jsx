import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../components/dashboard';
import { Login } from '../components/login';
import { CustomersPage } from '../pages/customersPage';
import {CountryPage} from '../pages/countryPage';
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
                        <Route path="/clientes/listar" element={<CustomersPage />} />
                        <Route path="/user-profile" element={<UserProfileSection />} />
                        <Route path="/ubicaciones/pais" element={<CountryPage />} />
                    </Route>
            </Route>
        </Routes >
    );
}