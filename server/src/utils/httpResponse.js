import { errorsDictionary } from "./errorDictionary.js";

const HttpStatus = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}

class HttpResponse {
    Ok (res, data){
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "Success",
            detail: data,
        });
    }
    BadRequest (res, errorKey, data){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: errorsDictionary[errorKey],
            detail: data,
        });
    }
    Unauthorized (res, data){
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: "Unauthorized",
            detail: data
        });
    }
    Forbidden (res, data){
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message: "Forbidden",
            detail: data
        });
    }
    NotFound (res, errorKey, data){
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: errorsDictionary[errorKey] || "Unknown Error",
            detail: data || null,
        });
    }
    ServerError (res, errorKey, data){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: errorsDictionary[errorKey] || "Unknown Error",
            detail: data || null,
        });
    }
}

const httpResponse = new HttpResponse();
export default httpResponse;