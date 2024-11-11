import { Layout} from 'antd';
import { HeaderComponent } from '../components/headerComponent';
import { Sidebar } from '../components/siderBar';
import { ContentArea } from '../components/contentArea';




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
