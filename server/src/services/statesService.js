//Modules
import Services from "./classService.js";
import factoryDao from "../persistence/daos/factoryDao.js";
import logger from "../utils/logger/loggerWinston.js";
import { capitalizeWords } from "../utils/capitalizeWords.js";

class StatesService extends Services {
    constructor() {
        super(factoryDao.statesDao);
        this.statesDao = factoryDao.statesDao;
        this.countriesDao = factoryDao.countriesDao;
    }

    //funciones especificas:
    createState = async (data) => {
        try {
            const countryId = data.countryId;
            const name = capitalizeWords(data.name)
            if (!/^[a-zA-Z\s\-\']+$/.test(name)) {
                throw new Error(`The state name can only contain letters, spaces, hyphens, and apostrophes: ${name}`);
            }
            const countryExist = await this.countriesDao.getById(countryId);
            if (!countryExist) {
                throw new Error(`There is no country with that id: ${countryId}`)
            }
            const stateExist = await this.statesDao.getByName(name);
            if (stateExist) {
                throw new Error(`There is already a state with that name: ${name}`)
            }
            const newItem = await this.statesDao.create({ name, countryId });
            if (!newItem) {
                throw new Error(`The item could not be created ${data}`)
            }
            return newItem;

        } catch (error) {
            logger.error('entró en el catch - statesService - create: ' + error);
            throw error;
        }
    };
    getStateById = async (id) => {
        try {
            const itemSearch = await this.statesDao.getById(id);
            if (!itemSearch) {
                throw new Error(`no se encontró item buscado por id ${id}`);
            }
            return itemSearch;
        } catch (error) {
            logger.error('entró en el catch - statesService - getStateById: ' + error);
            throw error;
        }
    }
    updateState = async (id, data) => {
        try {
            const searchId = id
            const itemSearch = await this.statesDao.getById(searchId);
            if (!itemSearch) {
                throw { errorCode: 'COUNTRY_NOT_FOUND', message: `No se encontró el estado/departamento con el ID: ${id}`, statusCode: 404 };
            }
            const name = capitalizeWords(data.name);
            if (!/^[a-zA-Z\s\-\']+$/.test(name)) {
                throw { errorCode: 'INVALID_COUNTRY_NAME', message: `The country name can only contain letters, spaces, hyphens, and apostrophes: ${name}`, statusCode: 400 };
            }
            const nameExist = await this.statesDao.getByName(name);
            if (nameExist && nameExist.id !== itemSearch.dataValues.id) {
                throw { errorCode: 'COUNTRY_ALREADY_EXISTS', message: `There is already a state with that name: ${name}`, statusCode: 409 };
            }
            const updatedItem = await this.statesDao.update(id, data);
            if (!updatedItem) {
                throw { errorCode: 'ERROR_TO_UPDATE', message: `The item could not be updated ${data}`, statusCode: 500 };
            }
            return updatedItem;
        } catch (error) {
            logger.error('entró en el catch - statesService - updateState: ' + error);
            throw error;
        }
    }
}

export const statesService = new StatesService();
