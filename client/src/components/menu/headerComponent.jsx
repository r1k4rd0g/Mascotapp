import { Menu, Layout, theme } from 'antd';
import { topMenuItems } from '../../config/menuConfig.jsx'
import Logo from '../../assets/Logo2.png';
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
            height: 70,
            width: '100%',
            padding: '0 8px',
            zIndex: 20,

        }}>
            <div style={{ display: 'flex', alignItems: 'center', height: '80%' }}>
                <Link to='/'>
                    <img src={Logo} alt='Logo' style={{
                        width: '85px',
                        height: '50px',
                        marginTop: '16px'
                    }}></img>
                </Link>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                    style={{
                        flexGrow: 1,
                        backgroundColor: 'transparent',
                        overflow: 'visible',
                        minWidth: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                />
            </div>
        </Header>
    )
};