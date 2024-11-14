import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderComponent } from '../components/headerComponent';
import { Sidebar } from '../components/siderBar';
import { ContentArea } from '../components/contentArea';
import { CustomerProfilePage } from '../pages/customerProfilePage';





export const MainLayout = () => (
    <Router>
        <Layout style={{ maxHeight: '1920', maxWidth: '1080' }}>
            <HeaderComponent />
            <Layout>
                <Sidebar />
                <Layout style={{ padding: 24 }}>
                    <Routes>
                        {/* Ruta para el CRUD */}
                        <Route path="/" element={<ContentArea />} />
                        {/* Ruta para el perfil del cliente */}
                        <Route
                            path="/customer-profile"
                            element={<CustomerProfilePage />}
                        />
                    </Routes>
                    <ContentArea />
                </Layout>
            </Layout>
        </Layout>
    </Router>

);
