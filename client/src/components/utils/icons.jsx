import PropTypes from "prop-types";
import {
    CalendarOutlined,
    UserOutlined,
    HomeOutlined,
    BaiduOutlined,
    EnvironmentOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    EllipsisOutlined,
    FieldTimeOutlined,
    EditTwoTone,
    DeleteTwoTone,
    PlusCircleTwoTone
} from "@ant-design/icons";


const iconsMap = {
    HomeOutlined: HomeOutlined,
    UserOutlined: UserOutlined,
    BaiduOutlined: BaiduOutlined,
    SettingOutlined: SettingOutlined,
    CalendarOutlined: CalendarOutlined,
    EnvironmentOutlined: EnvironmentOutlined,
    MenuFoldOutlined: MenuFoldOutlined,
    MenuUnfoldOutlined: MenuUnfoldOutlined,
    EllipsisOutlined: EllipsisOutlined,
    FieldTimeOutlined: FieldTimeOutlined,
    EditTwoTone: EditTwoTone,
    DeleteTwoTone: DeleteTwoTone,
    PlusCircleTwoTone: PlusCircleTwoTone
}

export const Icons = ({name, ...props})=>{
    const IconComponent = iconsMap[name];
    return IconComponent ? <IconComponent {...props} /> : null;
}

Icons.propTypes = {
    name: PropTypes.string.isRequired,
}