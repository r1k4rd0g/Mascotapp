import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import { sideMenuItems } from '../config/menuConfig';


const { Sider } = Layout;

export const Sidebar = () => {
    const { token } = theme.useToken();
    return (
      <Sider width={200} style={{ background: token.colorBgContainer }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
            borderRight: 0,
            backgroundColor: "#f0f2f5",
          }}
        >
          {sideMenuItems.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>
                    <Link
                      to={`/${child.label.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      {child.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
    );
};