import { Menu, Layout, theme } from 'antd';
import { topMenuItems } from '../../config/menuConfig.jsx'
import Logo from '../../assets/logo.png';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
export const HeaderComponent = () => {
    const { token } = theme.useToken();
    const navigate = useNavigate();

    const handleMenuClick = (menuItem) => {
        if (menuItem?.link) {
            navigate(menuItem.link);
        }
    };
    const menuItems = topMenuItems.map((item) => ({
        ...item,
        onClick: () => handleMenuClick(item),
    }));
    return (
        <Header style={{
            backgroundColor: token.colorBgHeader,
            borderRadius: token.borderRadius,
            display: 'flex',
            alignItems: 'center',
            height: '64',
            padding: '0 16px',
            zIndex: 10,

        }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '80%' }}>
                <Link to='/'>
                    <img src={Logo} alt='Logo' style={{
                        width: '65px',
                        height: '60px',
                        marginTop: '16px'
                    }}></img>
                </Link>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                />
            </div>
        </Header>
    )
};