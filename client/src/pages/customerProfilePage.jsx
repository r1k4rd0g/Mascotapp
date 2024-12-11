import { Layout } from "antd";
import { UserProfileSection } from "../components/userProfileSections";

const { Content } = Layout;

export const CustomerProfilePage = () => (
  <Layout
    style={{ padding: "24px", minHeight: "100vh", backgroundColor: "#f0f2f5" }}
  >
    <Content
      style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px" }}
    >
      <UserProfileSection />
    </Content>
  </Layout>
);
