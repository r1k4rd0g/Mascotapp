import { Menu, Layout } from 'antd';
import { topMenuItems } from '../config/menuConfig';

const { Header } = Layout;
export const HeaderComponent = () => {
    return (
        <Header style={{ backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={topMenuItems}
                    style={{ flex: 1, }}
                />
            </div>
        </Header>
    )
};