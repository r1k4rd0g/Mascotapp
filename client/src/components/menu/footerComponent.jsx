import { Layout } from "antd";
import Logo from '../../assets/Logo2.png';
import { extendedThemeConfig } from "../../styles/theme";


const { Footer } = Layout;

export const FooterComponent = () => {
    return (

        <Footer style={{
            width: '100%',
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            padding: "0px 0px 8px 0px",
            height: '6vh',
            backgroundColor: extendedThemeConfig.colorBgFooter,
            borderRadius: extendedThemeConfig.borderRadius
        }}>
            <div
                style={{
                    display: 'inline-flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: '90%',
                    margin: '0px 0px 0px 0px',
                }}
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
                        style={{
                            width: '90px',
                            height: '100%',
                            margin: '4px 0px 0px 0px',
                        }}
                    />
                </a>
                <h4>
                    - by Ricardo Graña - © {new Date().getFullYear()} Mascotapp. Todos los derechos reservados.
                </h4>
            </div>
        </Footer>
    )
}