//Modules
import logger from "../utils/logger/loggerWinston.js"
import httpResponse from "../utils/httpResponse.js";
import { errorsDictionary } from "../utils/errorDictionary.js";


export const errorHandler = (error, req, res, next) => {
    logger.error(`Error capturado en Handler: ${error.message} || "No message provided"|| Stack: ${error.stack}`);
    const statusCode = error.statusCode || 500;
    const errorCode = error.errorCode
    let response;
    switch (statusCode) {
        case 400:
            response = httpResponse.BadRequest(res, errorCode, { originalError: error.message });
            break;
        case 401:
            response = httpResponse.Unauthorized(res, errorCode, { originalError: error.message });
            break;
        case 403:
            response = httpResponse.Forbidden(res, errorCode, { originalError: error.message });
            break;
        case 404:
            response = httpResponse.NotFound(res, errorCode, { originalError: error.message });
            break;
        case 409:
            response = httpResponse.Conflict(res, errorCode, { originalError: error.message });
            break;
        case 500:
        default:
            response = httpResponse.ServerError(res, errorsDictionary[errorCode] || 'ERROR_INTERNAL_SERVER', { originalError: error.message });
            break;
    }
    return response;
};
