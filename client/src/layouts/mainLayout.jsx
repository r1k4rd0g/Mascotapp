import { Layout } from 'antd';
import { HeaderComponent } from '../components/menu/headerComponent';
import { Sidebar } from '../components/menu/sideBarAndContent';



export const MainLayout = () => {
  return (
    <Layout style={{
      maxWidth: "1920",
      maxHeight: "1080",
      borderRadius: "18px" }}>
      <HeaderComponent />
      <Layout style={{ borderRadius: "18px" }}>
        <Sidebar />
      </Layout>
    </Layout>
  );
};
