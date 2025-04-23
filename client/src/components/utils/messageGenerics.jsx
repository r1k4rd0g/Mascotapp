import { message } from "antd";
import PropTypes from "prop-types"
import { useEffect, useCallback } from "react";
import { useMessageHistory } from "../../hooks/useMessageHistory";


export const MessageGenerics = ({ messageContent, type, duration = 3 }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { addMessage } = useMessageHistory();

    const showMessage = useCallback(() => {
        if (messageContent && messageContent.message) {
            messageApi.open({
                type: type,
                content: messageContent.message,
                duration: duration,
            })
            addMessage(messageContent.message, type);
        }
    }, [messageApi, messageContent, type, duration, addMessage]);
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
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    duration: PropTypes.number,
    top: PropTypes.number,
};
