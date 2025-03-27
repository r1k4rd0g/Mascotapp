import PropTypes from "prop-types";
import {
    /* Out Lined */
    BaiduOutlined,
    CalendarOutlined,
    CloseOutlined,
    EllipsisOutlined,
    EnvironmentOutlined,
    FieldTimeOutlined,
    FilterOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    RedoOutlined,
    SearchOutlined,
    SettingOutlined,
    UserOutlined,
    /* Two Tones */
    DeleteTwoTone,
    EditTwoTone,
    PlusCircleTwoTone
} from "@ant-design/icons";


const iconsMap = {
    BaiduOutlined: BaiduOutlined,
    CalendarOutlined: CalendarOutlined,
    CloseOutlined: CloseOutlined,
    EllipsisOutlined: EllipsisOutlined,
    EnvironmentOutlined: EnvironmentOutlined,
    FieldTimeOutlined: FieldTimeOutlined,
    FilterOutlined:FilterOutlined,
    HomeOutlined: HomeOutlined,
    MenuFoldOutlined: MenuFoldOutlined,
    MenuUnfoldOutlined: MenuUnfoldOutlined,
    RedoOutlined: RedoOutlined,
    SearchOutlined: SearchOutlined,
    SettingOutlined: SettingOutlined,
    UserOutlined: UserOutlined,
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