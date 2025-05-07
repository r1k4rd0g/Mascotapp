import Controllers from "./classController.js";
import {statesService} from '../services/statesService.js';
import logger from "../utils/logger/loggerWinston.js";
import httpResponse from "../utils/httpResponse.js";

class StatesController extends Controllers {
    constructor() {
        super(statesService)
    }
    createState = async (req, res, next) => {
        try {
            const {name, countryId} = req.body;
            if(!name || !countryId) {
                return httpResponse.BadRequest(res, 'name and countryId must be required')
            }
            const newItem = await this.service.createState({name, countryId});
            if (!newItem) {
                return httpResponse.BadRequest(res, 'ERROR_TO_CREATE', newItem)
            }
            return httpResponse.Ok(res, newItem)
        } catch (error) {
            logger.error('Entró al catch en stateController create' + error)
            next(error);
        };
    }
    updateState = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            if(!id || !data) {
                return httpResponse.BadRequest(res, 'ID and data must be required', req.body, req.params)
            }
            const updatedItem = await this.service.updateState(id, data);
            if (!updatedItem) {
                return httpResponse.BadRequest(res, 'ERROR_TO_UPDATE', updatedItem)
            }
            return httpResponse.Ok(res, updatedItem)
        } catch (error) {
            logger.error('Entró al catch en stateController update' + error)
            next(error);
        }
    }
}

export const statesController = new StatesController();
