//Modules
import Controllers from "./classController.js";
import {countriesService} from '../services/countriesService.js';
import logger from "../utils/logger/loggerWinston.js";
import httpResponse from "../utils/httpResponse.js";

class CountriesController extends Controllers {
    constructor() {
        super(countriesService)
    }
    countryCreate = async (req, res, next) => {
        try {
            const data = req.body;
            const newItem = await this.service.countryCreate(data);
            if (!newItem) {
                return httpResponse.BadRequest(res, 'ERROR_TO_CREATE', newItem)
            }
            return httpResponse.Ok(res, newItem)
        } catch (error) {
            logger.error('Entró al catch en countryController create' + error)
            next(error);
        };
    }
}

export const countriesController = new CountriesController();
