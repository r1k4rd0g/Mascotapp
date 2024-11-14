import { Avatar, Typography, Space, Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const PetList = () => (
  <div style={{ width: "100%" }}>
    <Text strong style={{ fontSize: "18px" }}>
      Mis mascotas
    </Text>
    <Space style={{ marginTop: "16px" }} wrap>
      <Card
        cover={<Avatar size={100} src="url-a-la-imagen-de-la-mascota" />}
        style={{ width: 120, textAlign: "center" }}
      >
        <Text>Ramoncito</Text>
      </Card>
      <Card
        style={{
          width: 120,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
        <Text>Añadir mascota</Text>
      </Card>
    </Space>
  </div>
);
