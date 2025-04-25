import { Layout } from 'antd';
import { HeaderComponent } from '../components/menu/headerComponent';
import { SidebarAndContent } from '../components/menu/sideBarAndContent';
import { FooterComponent } from '../components/menu/footerComponent';



export const MainLayout = () => {
  return (
    <Layout style={{
      width: "clamp(600px, 99vw, 1920px)",
      borderRadius: "18px",
    }}>
      <HeaderComponent />
      <SidebarAndContent/>
      <FooterComponent />
    </Layout>
  );
};
