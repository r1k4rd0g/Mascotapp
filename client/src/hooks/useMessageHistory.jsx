import { useContext } from "react";
import MessageHistoryContext from "../context/messageHistory/messageHistoryContext";

export const useMessageHistory = () => {
    return useContext(MessageHistoryContext);
}
