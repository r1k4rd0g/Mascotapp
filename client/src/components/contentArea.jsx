import { Layout, theme } from 'antd';
import { Breadcrumbs } from '../components/breadCrumbs';

const { Content } = Layout

export const ContentArea = () => {
    const { token } = theme.useToken();
    return (
        <Layout>
            <Breadcrumbs />
            <Content style={{ background: token.colorBgContent }}>
                {" "}
                Acá aparece el contenido de lo que tengamos que mostrar según el menú
            </Content>
        </Layout>
    );
}