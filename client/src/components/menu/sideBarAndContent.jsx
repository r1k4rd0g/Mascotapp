import { Layout, Menu, Breadcrumb, } from 'antd';
import { Link, Outlet, useLocation, useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import { sideMenuItems } from '../../config/menuConfig';
import { CollapseButton } from './collapseButton';
import { extendedThemeConfig } from '../../styles/theme';
import "./sideBar.css";

const { Sider, Content } = Layout;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  //const { token } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  //Generar dinamicamente la ruta:
  const path = location.pathname.split("/").filter((item) => item);
  const breadCrumbItems = [
    { key: "home", label: <Link to="/">Home</Link> }, //Estático ruta de inicio
    ...path.map((_, index) => {
      const url = `/${path.slice(0, index + 1).join("/")}`;
      const label = path[index].replace(/-/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
      return { key: url, label: <Link to={url}>{label}</Link> }
    }),
  ];
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
        >
          {sideMenuItems.map((item) => {
            return (
              item.items ? (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.items.map((subItem) => (
                    <Menu.Item
                      key={subItem.key}
                      onClick={() => handleMenuClick(subItem)}
                    >
                      {subItem.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item
                  key={item.key}
                  onClick={() => handleMenuClick(item)}
                >
                  {item.icon}
                  {item.label}
                </Menu.Item>
              )
            )
          })}
        </Menu>
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
        >
          {breadCrumbItems.map((item) => (
            <Breadcrumb.Item
              key={item.key}
            >
              {item.label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>

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