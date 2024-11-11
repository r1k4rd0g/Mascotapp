// src/containers/mainLayout.jsx

import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { HeaderComponent } from "../components/headerComponent";
import { Sidebar } from "../components/siderBar.jsx";
import { ContentArea } from "../components/contentArea";
import { CustomerProfilePage } from "../pages/CustomerProfilePage";

const { Content } = Layout;

export const MainLayout = () => (
  <Router>
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "8px",
            }}
          >
            <Routes>
              {/* Ruta para el CRUD */}
              <Route path="/" element={<ContentArea />} />

              {/* Ruta para el perfil del cliente */}
              <Route
                path="/customer-profile"
                element={<CustomerProfilePage />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </Router>
);
