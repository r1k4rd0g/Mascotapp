import { Button } from "antd";
import { Icons } from "../icons";
import PropTypes from "prop-types";

export const CollapseButton = ({ collapsed, setCollapsed }) => {
    return (
        <Button
            type="text"
            size="large"
            icon={collapsed ? <Icons name="MenuUnfoldOutlined" /> : <Icons name="MenuFoldOutlined" />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
                fontSize: '16px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        />
    );
}

CollapseButton.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
}