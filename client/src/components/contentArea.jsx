import { Layout } from 'antd';
import { Breadcrumbs } from '../components/breadCrumbs';

const {Content} = Layout

export const ContentArea = () => {
    return (
        <Layout>
            <Breadcrumbs />
            <Content> Acá aparece el contenido de lo que tengamos que mostrar según el menú</Content>
        </Layout>
    );
}