import { Divider, Space } from "antd";
import { UserProfile } from "./userProfile";
import { PetList } from "./petList";

export const UserProfileSection = () => (
  <Space direction="vertical" style={{ width: "100%" }}>
    <UserProfile />
    <Divider />
    <PetList />
  </Space>
);
