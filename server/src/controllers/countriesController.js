//Modules
import Controllers from "./classController.js";
import { countriesService } from '../services/countriesService.js';
import logger from "../utils/logger/loggerWinston.js";
import httpResponse from "../utils/httpResponse.js";

class CountriesController extends Controllers {
    constructor() {
        super(countriesService)
    }
    createCountry = async (req, res, next) => {
        try {
            const data = req.body;
            const newItem = await this.service.createCountry(data);
            if (!newItem) {
                return httpResponse.BadRequest(res, 'ERROR_TO_CREATE', newItem)
            }
            return httpResponse.Ok(res, newItem)
        } catch (error) {
            logger.error('Entró al catch en countryController create' + error)
            next(error);
        };
    }
    updateCountry = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            if(!id || !data) {
                return httpResponse.BadRequest(res, 'ID and data must be required', req.body, req.params)
            }
            const updatedItem = await this.service.updateCountry(id, data);
            if (!updatedItem) {
                return httpResponse.BadRequest(res, 'ERROR_TO_UPDATE', updatedItem)
            }
            return httpResponse.Ok(res, updatedItem)
        } catch (error) {
            logger.error('Entró al catch en countryController update' + error)
            next(error);
        }
    }
}

export const countriesController = new CountriesController();
