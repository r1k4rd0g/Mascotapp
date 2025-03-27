import { Tooltip } from "antd";
import PropTypes from "prop-types";

export const TooltipGenerics = ({ title, children, placement = "top", ...props }) => {
    return (
        <Tooltip title={title} placement={placement} {...props}>
            {children}
        </Tooltip>
    );
}

TooltipGenerics.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    placement: PropTypes.oneOf([
        "top",
        "left",
        "right",
        "bottom",
        "topLeft",
        "topRight",
        "bottomLeft",
        "bottomRight",
        "leftTop",
        "leftBottom",
        "rightTop",
        "rightBottom"
    ])
}