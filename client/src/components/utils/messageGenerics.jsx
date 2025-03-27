import { message } from "antd";
import PropTypes from "prop-types"
import { useEffect, useCallback } from "react";

export const MessageGenerics = ({ messageContent, type, duration = 3 }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const showMessage = useCallback(() => {
        if (messageContent && messageContent.message) {
            messageApi.open({
                type: type,
                content: messageContent.message,
                duration: duration,
            })
        }
    }, [messageApi, messageContent, type, duration]);
    useEffect(() => {
        showMessage();
    }, [showMessage]);

    return (
        <>{contextHolder}</>
    );
};

MessageGenerics.propTypes = {
    messageContent: PropTypes.shape({ // PropType para el objeto
        message: PropTypes.string,
        counter: PropTypes.number,
    }),
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
    duration: PropTypes.number,
};