//Modules
import logger from "../utils/logger/loggerWinston.js"
import httpResponse from "../utils/httpResponse.js";
import { errorsDictionary } from "../utils/errorDictionary.js";


export const errorHandler = (error, req, res, next) => {
    logger.error(`Error Handler: ${error.message} || "No message provided"`);
    if (error.status) {
        const message = error.message || errorsDictionary.ERROR_INTERNAL_SERVER || "An error occurred";
        return res.status(error.status).json({
            status: error.status,
            message: message,
        });
    };
    const defaultErrorMessage = errorHandler.ERROR_INTERNAL_SERVER
    return httpResponse.ServerError(res, defaultErrorMessage, {
        originalError: error.message || "No message provided"
    });
};
