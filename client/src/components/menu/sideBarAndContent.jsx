import { Layout, Menu, Breadcrumb, } from 'antd';
import { Outlet, useLocation, useNavigate, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { sideMenuItems } from '../../config/menuConfig';
import { CollapseButton } from './collapseButton';
import { extendedThemeConfig } from '../../styles/theme';
import "./sideBar.css";

const { Sider, Content } = Layout;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [breadCrumbItems, setBreadCrumbItems] = useState([]);
  //const { token } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split("/").filter((item) => item);
    //Generar dinamicamente la ruta:
    const items = [
      { key: "home", title: "Home", onClick: ()=> navigate("/")}, //Estático ruta de inicio
      ...path.map((_, index) => {
        const url = `/${path.slice(0, index + 1).join("/")}`;
        const title = path[index].replace(/-/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        return { key: url, title: title, onClick: () => navigate(url) };
      }),
    ];
    setBreadCrumbItems(items);
  }, [location.pathname, navigate]);
  // Obtener la key seleccionada basada en la ruta actual
  const getSelectedKey = (pathname) => {
    for (const menu of sideMenuItems) {
      if (menu.items) {
        const foundItem = menu.items.find((item) => item.link === pathname);
        if (foundItem) return foundItem.key;
      } else if (menu.link === pathname) {
        return menu.key;
      }
    }
    return "";
  };

  // Obtener la key del sub menú abierto basado en la ruta actual
  const getOpenKey = (pathname) => {
    const foundMenu = sideMenuItems.find((menu) =>
      menu.items?.some((subItem) => subItem.link === pathname)
    );
    return foundMenu ? foundMenu.key : undefined;
  };

  // Manejar la navegación al hacer clic en un menú
  const handleMenuClick = (menuItem) => {
    if (menuItem?.link) {
      navigate(menuItem.link);
    }
  };
  const menuItems = sideMenuItems.map((item) => {
    if (item.items) {
        return {
            key: item.key,
            icon: item.icon,
            label: item.label,
            children: item.items.map((subItem) => ({
                key: subItem.key,
                label: subItem.label,
                onClick: () => handleMenuClick(subItem),
            })),
        };
    } else {
        return {
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => handleMenuClick(item),
        };
    }
});
  return (
    <Layout
      className="custom-layout"
      style={{
        minHeight: "100vh",
        bodyBg: extendedThemeConfig.bodyBg,
      }}
    >
      {/* Sidebar */}
      <Sider
        width={200}
        style={{
          background: extendedThemeConfig.colorBgSidebar,
          borderRadius: extendedThemeConfig.borderRadius,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
      >
        <CollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />
        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey(location.pathname)]} // Encuentra la clave correcta
          defaultOpenKeys={getOpenKey(location.pathname) ? [getOpenKey(location.pathname)] : []} // Abre el sub menú correcto
          style={{
            height: "90%",
            backgroundColor: 'transparent',
            colorBorder: extendedThemeConfig.colorBorder,
            alignItems: 'center',
          }}
          items={menuItems}
        />
      </Sider>
      {/* Main Content Area */}
      <Layout>
        {/* Breadcrumb */}
        <Breadcrumb
          style={{
            margin: "16px",
            backgroundColor: extendedThemeConfig.backgroundColor,
            padding: "8px",
            borderRadius: extendedThemeConfig.borderRadius,
          }}
          items={breadCrumbItems}
        />
        {/* Content */}
        <Content
          style={{
            padding: "16px",
            margin: "16px",
            backgroundColor: extendedThemeConfig.backgroundColor,
            borderRadius: extendedThemeConfig.borderRadius
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};