import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../components/dashboard';
import { Login } from '../components/login';
import { CustomersPage } from '../pages/customersPage';
import {CountryPage, StatePage, CityPage, NeighborhoodPage} from '../pages/locationsPage';
import { ProtectedRoute } from '../components/protectedRoute';
import { MainLayout } from '../layouts/mainLayout';
import {MessageHistory} from '../components/messageHistory';
import { LocationSelector } from '../components/locationSelector';


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
                        <Route path="/ubicaciones" element={<LocationSelector />} />
                        <Route path="/ubicaciones/paises" element={<CountryPage />} />
                        <Route path="/ubicaciones/departamentos" element={<StatePage />} />
                        <Route path='/ubicaciones/ciudades' element={<CityPage />} />
                        <Route path='/ubicaciones/barrios' element={<NeighborhoodPage />} />
                        <Route path='/tools/mensajes-del-sistema' element={<MessageHistory />} />
                    </Route>
            </Route>
        </Routes >
    );
}
