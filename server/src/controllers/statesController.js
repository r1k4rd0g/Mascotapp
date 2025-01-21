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
                return httpResponse.BadRequest(res, 'Name and Country ID must be required', req.body)
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
}

export const statesController = new StatesController();