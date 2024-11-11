// src/components/sideBar.jsx

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { sideMenuItems } from "../config/menuConfig";

const { Sider } = Layout;

export const Sidebar = () => (
  <Sider width={200} style={{ backgroundColor: "#f0f2f5" }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{
        height: "100%",
        borderRight: 0,
        backgroundColor: "#f0f2f5",
      }}
    >
      {/* Enlace a la vista principal (CRUD) */}
      <Menu.Item key="1">
        <Link to="/">Inicio</Link>
      </Menu.Item>

      {/* Enlace a la vista del perfil del cliente */}
      <Menu.Item key="2">
        <Link to="/customer-profile">Perfil de Cliente</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);
