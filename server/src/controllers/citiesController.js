import Controllers from "./classController.js";
import {citiesService} from '../services/citiesService.js';
import logger from "../utils/logger/loggerWinston.js";
import httpResponse from "../utils/httpResponse.js";

class CitiesController extends Controllers {
    constructor() {
        super(citiesService)
    }
    createCity = async (req, res, next) => {
        try {
            const {name, stateId} = req.body;
            if(!name || !stateId) {
                return httpResponse.BadRequest(res, 'Name and State ID must be required', req.body)
            }
            const newItem = await this.service.createCity({name, stateId});
            if (!newItem) {
                return httpResponse.BadRequest(res, 'ERROR_TO_CREATE', newItem)
            }
            return httpResponse.Ok(res, newItem)
        } catch (error) {
            logger.error('Entró al catch en cityController create' + error)
            next(error);
        };
    }
}

export const citiesController = new CitiesController();