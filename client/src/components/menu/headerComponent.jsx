import { Menu, Layout } from 'antd';
import { topMenuItems } from '../../config/menuConfig.jsx'
import Logo from '../../assets/Logo2.png';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { extendedThemeConfig } from '../../styles/theme.js';
import './headerBar.css'


const { Header } = Layout;
export const HeaderComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuClick = (menuItem) => {
        if (menuItem?.link) {
            navigate(menuItem.link);
        }
    };
    const menuItems = topMenuItems.map((item) => ({
        ...item,
        onClick: () => handleMenuClick(item),
    }));

    const selectedKeys = menuItems.reduce((acc, item) => {
        if (location.pathname.startsWith(item.link) && item.link !== '/') {
            acc.push(item.key);
        }
        return acc;
    }, []);


    const menuStyle = {
        flexGrow: 1,
        backgroundColor: 'transparent',
        borderRadius: extendedThemeConfig.borderRadius,
        width: 'auto',
        overflowX: 'auto',
        overflowY: 'hidden',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        whiteSpace: 'nowrap',
        borderBottom: 'none',
        margin: '0px 2px 0px 2px',
        padding: '0px 2px 0px 2px',


    }
    return (
        <Header style={{
            backgroundColor: extendedThemeConfig.colorBgHeader,
            borderRadius: extendedThemeConfig.borderRadius,
            display: 'flex',
            alignItems: 'center',
            height: 'clamp(3em, 5vh, 7vh)',
            width: 'auto',
            padding: '0 2px',
            marginTop: '1px',
            lineHeight: '30px',
            borderBottom: 'none',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                width: 'auto',
                height: 'clamp(3em, 5vh, 7vh)',
            }}>
                <Link to='/'>
                    <img src={Logo} alt='Logo' style={{
                        width: 'clamp(40px, 15vw, 80px)',
                        height: 'auto',
                        maxHeight: '100%',
                        marginTop: '10px',
                    }}></img>
                </Link>
                <Menu
                    selectedKeys={selectedKeys}
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                    style={menuStyle}
                    className="custom-header-menu"
                    border={false}
                />
            </div>
        </Header>
    )
};
