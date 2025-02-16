import { Layout, Menu, Breadcrumb, } from 'antd';
import { Link, Outlet, useLocation, useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import { sideMenuItems } from '../../config/menuConfig';
import { CollapseButton } from './collapseButton';
import { extendedThemeConfig } from '../../styles/theme';
import "./sideBar.css";

const { Sider, Content } = Layout;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
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
          defaultSelectedKeys={[sideMenuItems[0]?.items[0]?.key || "2"]}
          defaultOpenKeys={[sideMenuItems[0]?.key || "sub1"]}
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