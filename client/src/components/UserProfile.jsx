import { Avatar, Typography, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const UserProfile = () => (
  <Space direction="vertical" align="center" style={{ width: "100%" }}>
    <Avatar size={100} src="url-a-la-imagen-del-avatar" />
    <Text strong style={{ fontSize: "18px" }}>
      Martin Flores
    </Text>
    <Space>
      <Text>martinflores@gmail.com</Text>
      <MailOutlined />
    </Space>
    <div
      style={{
        backgroundColor: "#FFFACD",
        padding: "20px",
        width: "80%",
        borderRadius: "8px",
      }}
    ></div>
  </Space>
);
