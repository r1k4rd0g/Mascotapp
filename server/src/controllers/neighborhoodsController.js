//Modules
import Controllers from "./classController.js";
import {neighborhoodsService} from '../services/neighborhoodsService.js';
import logger from "../utils/logger/loggerWinston.js";
import httpResponse from "../utils/httpResponse.js";

class NeighborhoodsController extends Controllers {
    constructor() {
        super(neighborhoodsService)
    }
    createNeighborhood = async (req, res, next) => {
        try {
            const {name, cityId} = req.body;
            if(!name || !cityId) {
                return httpResponse.BadRequest(res, 'Name and City ID must be required', req.body)
            }
            const newItem = await this.service.createNeighborhood({name, cityId});
            if (!newItem) {
                return httpResponse.BadRequest(res, 'ERROR_TO_CREATE', newItem)
            }
            return httpResponse.Ok(res, newItem)
        } catch (error) {
            logger.error('Entró al catch en neighborhoodController create' + error)
            next(error);
        };
    }
    updateNeighborhood = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            if(!id || !data) {
                return httpResponse.BadRequest(res, 'ID and data must be required', req.body, req.params)
            }
            const updatedItem = await this.service.updateNeighborhood(id, data);
            if (!updatedItem) {
                return httpResponse.BadRequest(res, 'ERROR_TO_UPDATE', updatedItem)
            }
            return httpResponse.Ok(res, updatedItem)
        } catch (error) {
            logger.error('Entró al catch en neighborhoodController update' + error)
            next(error);
        }
    }
}

export const neighborhoodsController = new NeighborhoodsController();
