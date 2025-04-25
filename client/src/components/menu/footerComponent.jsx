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
            padding: "0px 0px 0px 0px",
            height: 'clamp(4em, 4vh, 6vh)',
            backgroundColor: extendedThemeConfig.colorBgFooter,
            borderRadius: extendedThemeConfig.borderRadius
        }}>
            <div
                style={{
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    height: 'clamp(4vh, 4vh, 7vh)',
                    width: '100%',
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
                            width: 'clamp(30px, 12vw, 90px',
                            height: 'clamp(20px, 5vh, 100%)',
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
