//Modules
import logger from "../utils/logger/loggerWinston.js";
import httpResponse from "../utils/httpResponse.js";

export default class Controllers {
    constructor(service) {
        this.service = service
    }

    getAll = async (req, res, next) => {
        try {
            const items = await this.service.getAll();
            if (!items || items.length === 0) {
                const error = new Error("recurso no encontrado");
                error.status = 404;
                throw error;
            };
            return httpResponse.Ok(res, items);
        } catch (error) {
            logger.error('Entró al catch en class.controller getAll ' + error)
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const item = await this.service.getById(id);
            if (!item) {
                return httpResponse.NotFound(res, "ERROR_TO_FIND", { id: id });
            };
            return httpResponse.Ok(res, item);
        } catch (error) {
            logger.error('Entró al catch en classController getById ' + error)
            next(error);
        };
    };

    create = async (req, res, next) => {
        try {
            const data = req.body;
            const newItem = await this.service.create(data)
            if (!newItem) {
                return httpResponse.BadRequest(res, 'ERROR_TO_CREATE', newItem)
            }
            return httpResponse.Ok(res, newItem)
        } catch (error) {
            logger.error('Entró al catch en classController create ' + error)
            next(error);
        };
    };

    update = async (req, res, next) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const itemSearch = await this.service.getById(id);
            if (!itemSearch) {
                return httpResponse.NotFound(res, 'ERROR_TO_FIND', { id: id });
            } else {
                const itemUpdate = await this.service.update(id, data);
                return httpResponse.Ok(res, itemUpdate);
            }
        } catch (error) {
            logger.error('Entró al catch en classController update ' + error)
            next(error);
        }
    }
    delete = async (req, res, next) =>{
        try {
            const id = req.params.id
            const itemSearch = await this.service.getById(id)
            if (!itemSearch) {
                return httpResponse.NotFound(res, 'ERROR_TO_FIND', { id: id });
            }else {
                const itemDelete = await this.service.delete(id)
                return httpResponse.Ok(res, itemDelete)
            }
        } catch (error) {
            logger.error('Entró al catch en classController delete ' + error)
            next (error);
        }
    }
}