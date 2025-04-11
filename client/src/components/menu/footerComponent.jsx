import { Layout } from "antd";
import Logo from '../../assets/Logo2.png';
import { extendedThemeConfig } from "../../styles/theme";


const { Footer } = Layout;

export const FooterComponent = () => {
    return (

        <Footer style={{
            width: '100%',
            textAlign: 'center',
            padding: "0 8px",
            backgroundColor: extendedThemeConfig.colorBgFooter,
            borderRadius: extendedThemeConfig.borderRadius
        }}>
            <div
                style={{ display: 'inline-flex', textAlign: 'center', alignItems: 'center' }}
            >
                <h4>
                    Desarrollado por {' '}
                </h4>
                <a
                    href='https:/www.linkatic.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                >
                    <img
                        src={Logo}
                        alt="Linkatic Logo"
                        style={{ width: '100px', height: 'auto' }}
                    />
                </a>
                <h4>
                    - by Ricardo Graña
                </h4>
            </div>
            <div>
                <h4>
                    ©{new Date().getFullYear()} Mascotapp. Todos los derechos reservados.
                </h4>
            </div>
        </Footer>
    )
}