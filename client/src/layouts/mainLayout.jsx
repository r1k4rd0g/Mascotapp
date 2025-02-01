import { Layout } from 'antd';
import { HeaderComponent } from '../components/menu/headerComponent';
import { Sidebar } from '../components/menu/sideBarAndContent';



export const MainLayout = () => {
  return (
    <Layout style={{ maxHeight: "1920", maxWidth: "1080", borderRadius: "58px" }}>
      <HeaderComponent />
      <Layout style={{ borderRadius: "18px" }}>
        <Sidebar />
      </Layout>
    </Layout>
  );
};
