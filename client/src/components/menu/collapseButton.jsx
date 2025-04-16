import { Button } from "antd";
import { Icons } from "../utils/icons";
import PropTypes from "prop-types";
import { extendedThemeConfig } from "../../styles/theme";

export const CollapseButton = ({ collapsed, setCollapsed }) => {
    return (
        <Button
            type="default"
            size="large"
            icon={collapsed ? <Icons name="MenuUnfoldOutlined" /> : <Icons name="MenuFoldOutlined" />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
                fontSize: '16px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                colorBorder: extendedThemeConfig.colorBorder,
            }}
        />
    );
}

CollapseButton.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
}