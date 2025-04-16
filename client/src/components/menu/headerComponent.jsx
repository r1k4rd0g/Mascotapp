import { Menu, Layout } from 'antd';
import { topMenuItems } from '../../config/menuConfig.jsx'
import Logo from '../../assets/Logo2.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { extendedThemeConfig } from '../../styles/theme.js';
import './headerBar.css'

const { Header } = Layout;
export const HeaderComponent = () => {
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

    const menuStyle = {
        flexGrow: 1,
        backgroundColor: 'transparent',
        width: '40vw',
        overflow: 'visible',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        colorBorder: extendedThemeConfig.colorBorder,
    }
    return (
        <Header style={{
            backgroundColor: extendedThemeConfig.colorBgHeader,
            borderRadius: extendedThemeConfig.borderRadius,
            display: 'flex',
            alignItems: 'center',
            height: '6vh',
            width: '100%',
            padding: '0 4px',
        }}>
            <div style={{
                display: 'flex',
            }}>
                <Link to='/'>
                    <img src={Logo} alt='Logo' style={{
                        width: '90px',
                        height: '100px',
                        margin: '30px 0px 0px 0px',
                    }}></img>
                </Link>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                    style={menuStyle}
                    className="custom-header-menu"
                />
            </div>
        </Header>
    )
};