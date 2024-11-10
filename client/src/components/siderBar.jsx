import { Layout, Menu, theme } from 'antd';
import { sideMenuItems } from '../config/menuConfig';

const { Sider } = Layout

export const Sidebar = () => {
    const {token} = theme.useToken();
    return (
        <Sider width={200} style={{ background: token.colorBgContainer }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={sideMenuItems}
                style={{
                    height: '100%',
                    borderRight: 0,
                    backgroundColor: '#f0f2f5',
                }}
            />
        </Sider>
    )
};