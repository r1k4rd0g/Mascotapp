import { Layout, theme } from 'antd';
import { HeaderComponent } from '../components/headerComponent';
import { Sidebar } from '../components/siderBar';
import { ContentArea } from '../components/contentArea';
import { Breadcrumbs } from '../components/breadCrumbs';
import { themeConfig } from '../styles/theme.js';



export const MainLayout = () => (
    <Layout style={{ maxHeight: '1920', maxWidth: '1080' }}>
        <HeaderComponent />
        <Layout>
            <Sidebar />
            <Layout style={{ padding: 24 }}>
                <ContentArea />
            </Layout>
        </Layout>
    </Layout>

);
