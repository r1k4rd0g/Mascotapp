import { Layout, Menu, Breadcrumb } from 'antd';
import { Outlet, useLocation, useNavigate, } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { sideMenuItems } from '../../config/menuConfig';
import { CollapseButton } from './collapseButton';
import { extendedThemeConfig } from '../../styles/theme';
import "./sideBar.css";

const { Sider, Content } = Layout;

export const SidebarAndContent = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [breadCrumbItems, setBreadCrumbItems] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialRender = useRef(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const path = location.pathname.split("/").filter((item) => item);

    //Generar dinamicamente la ruta:
    const items = [
      { key: "home", title: "Home", onClick: () => navigate("/") }, //Estático ruta de inicio
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
  const getOpenKeys = (pathname) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    let openKeys = [];
    let currentPath = '';
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const foundMenu = sideMenuItems.find(menu =>
        menu.items?.some(item => item.link === currentPath)
      );
      if (foundMenu) {
        openKeys.push(foundMenu.key);
      }
    }
    return openKeys;
  };

  useEffect(() => {
    //solo actualizar openKeys si collapsed es false y no es la carga inicial
    if (!isFirstRender.current && !collapsed) {
      const initialOpenKeys = getOpenKeys(location.pathname);
      setOpenKeys(initialOpenKeys);
    }
    // Forzar el cierre en el primer render después de la inicialización
    if (isInitialRender.current) {
      isInitialRender.current = false;
      setOpenKeys([]);
    }
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [location.pathname, collapsed]);

  // Manejar la navegación al hacer clic en un menú
  const handleMenuClick = (menuItem) => {
    if (menuItem?.link) {
      navigate(menuItem.link);
    }
    if (menuItem.parentKey) {
      setOpenKeys([menuItem.parentKey]);
    } else {
      setOpenKeys([]);
    }
  };
  const menuItems = sideMenuItems.map((item) => {
    if (item.items) {
      return {
        key: item.key,
        icon: item.icon,
        label: item.label,
        children: item.items.map((subItem) => {
          subItem.parentKey = item.key; // Pass the parent key
          return {
            key: subItem.key,
            label: subItem.label,
            onClick: () => handleMenuClick(subItem),
          }
        }),
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
        height: "83vh",
        width: "100%",
        bodyBg: extendedThemeConfig.bodyBg,
        padding: "4px 0px",
      }}
    >
      {/* Sidebar */}
      <Sider
        style={{
          background: extendedThemeConfig.colorBgSidebar,
          borderRadius: extendedThemeConfig.borderRadius,
          height: "100%",
          padding: "2px 0px",
          margin: "0px 8px 0px 0px",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
      >
        <CollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />
        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey(location.pathname)]}
          openKeys={openKeys}
          onOpenChange={(newOpenKeys) => setOpenKeys(newOpenKeys)}
          subMenuCloseDelay={0.3}
          style={{
            height: "auto",
            backgroundColor: 'transparent',
            colorBorder: extendedThemeConfig.colorBorder,
            alignItems: 'center',
            border: 'none',
          }}
          items={menuItems}
        />
      </Sider>
      {/* Main Content Area */}
      <Layout>
        {/* Breadcrumb */}
        <Breadcrumb
          style={{
            margin: "0px 0px 4px 0px",
            backgroundColor: extendedThemeConfig.backgroundColor,
            padding: "2px",
            borderRadius: extendedThemeConfig.borderRadius,
          }}
          items={breadCrumbItems}
        />
        {/* Content */}
        <Content
          style={{
            height: "85vh",
            textAlign: "center",
            padding: "4px",
            margin: "0px 0px",
            backgroundColor: extendedThemeConfig.backgroundColor,
            borderRadius: "8px",
          }}
        >
          <Outlet
            style={{
              backgroundColor: 'none',
            }} />
        </Content>
      </Layout>
    </Layout >
  );
};