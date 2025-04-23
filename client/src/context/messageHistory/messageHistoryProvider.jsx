import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import MessageHistoryContext from "./messageHistoryContext";

const MESSAGE_HISTORY_KEY = 'app_message_history';
const MessageHistoryProvider = ({ children }) => {
    const [history, setHistory] = useState(() => {
        const storedHistory = localStorage.getItem(MESSAGE_HISTORY_KEY);
        if (storedHistory) {
            try {
                const parsedHistory = JSON.parse(storedHistory);
                // Convertir la cadena timestamp a objeto Date
                return parsedHistory.map(item => ({ ...item, timestamp: new Date(item.timestamp) }));
            } catch (error) {
                console.error("Error parsing history from Local Storage:", error);
                return [];
            }
        }
        return [];
    });
    const addMessage = useCallback((content, type) => {
        const now = new Date();
        const timestampUTC = now.toISOString(); // Guardar la fecha en formato UTC
        const newMessage = { content, type, timestamp:timestampUTC };
        setHistory((prevHistory) => {
            const updateHistory = [...prevHistory, newMessage];
            localStorage.setItem(MESSAGE_HISTORY_KEY, JSON.stringify(updateHistory));
            return updateHistory;
        });
    }, []);
    useEffect(() => {
        if (history.length > 100) {
            const cutHistory = history.slice(history.length - 100);
            setHistory(cutHistory);
            localStorage.setItem(MESSAGE_HISTORY_KEY, JSON.stringify(history));
        }
    }, [history]);

    return (
        <MessageHistoryContext.Provider value={{ history, addMessage }}>
            {children}
        </MessageHistoryContext.Provider>
    );
}
MessageHistoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


export default MessageHistoryProvider;
