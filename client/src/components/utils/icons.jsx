import PropTypes from "prop-types";
import {
    /* Out Lined */
    CalendarOutlined,
    CloseOutlined,
    EllipsisOutlined,
    EnvironmentOutlined,
    FieldTimeOutlined,
    FilterOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
    RedoOutlined,
    SearchOutlined,
    SettingOutlined,
    ToolOutlined,
    UserOutlined,
    /* Two Tones */
    DeleteTwoTone,
    EditTwoTone,
    PlusCircleTwoTone
} from "@ant-design/icons";

import {
    /* Out Lined */
    MdOutlinePets,
    MdOutlineAccountBalance,
    MdLocationCity,
    MdOutlineMyLocation,
    MdOutlineMap,
} from "react-icons/md";

import {
    FaEarthAmericas
} from "react-icons/fa6";

const iconsMap = {
    PetsOutlined: MdOutlinePets,
    State: MdOutlineAccountBalance,
    City: MdLocationCity,
    Neigh: MdOutlineMyLocation,
    Map: MdOutlineMap,
    CalendarOutlined: CalendarOutlined,
    CloseOutlined: CloseOutlined,
    EllipsisOutlined: EllipsisOutlined,
    EnvironmentOutlined: EnvironmentOutlined,
    FieldTimeOutlined: FieldTimeOutlined,
    FilterOutlined:FilterOutlined,
    HomeOutlined: HomeOutlined,
    MenuFoldOutlined: MenuFoldOutlined,
    MenuUnfoldOutlined: MenuUnfoldOutlined,
    MessageOutlined: MessageOutlined,
    RedoOutlined: RedoOutlined,
    SearchOutlined: SearchOutlined,
    SettingOutlined: SettingOutlined,
    ToolOutlined: ToolOutlined,
    UserOutlined: UserOutlined,
    EditTwoTone: EditTwoTone,
    DeleteTwoTone: DeleteTwoTone,
    PlusCircleTwoTone: PlusCircleTwoTone,
    EarthPlanet : FaEarthAmericas ,
}

export const Icons = ({name, ...props})=>{
    const IconComponent = iconsMap[name];
    return IconComponent ? <IconComponent {...props} /> : null;
}

Icons.propTypes = {
    name: PropTypes.string.isRequired,
}
