import { errorsDictionary } from "./errorDictionary.js";

const HttpStatus = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
}
const setCoresHeaders = (res) => {
    res.header("Access-Control-Allow-Origin", res.req.headers.origin || "*");
    res.header("Access-control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
}

class HttpResponse {
    Ok (res, data){
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "Success",
            detail: data,
        });
    }
    BadRequest (res, errorCode, data){
        const message = errorsDictionary[errorCode];
        setCoresHeaders(res);
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: message,
            detail: data,
        });
    }
    Unauthorized (res, data){
        setCoresHeaders(res);
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
    NotFound (res, errorCode, data){
        const message = errorsDictionary[errorCode];
        setCoresHeaders(res);
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: message,
            detail: data,
        });
    }
    Conflict (res, errorCode, data){
        const message = errorsDictionary[errorCode];
        setCoresHeaders(res);
        return res.status(HttpStatus.CONFLICT).json({
            status: HttpStatus.CONFLICT,
            message: message,
            detail: data,
        });
    }
    ServerError (res, errorCode, data){
        const message = errorsDictionary[errorCode];
        setCoresHeaders(res);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: message,
            detail: data,
        });
    }
}

const httpResponse = new HttpResponse();
export default httpResponse;