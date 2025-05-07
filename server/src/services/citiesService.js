//Modules
import Services from "./classService.js";
import factoryDao from "../persistence/daos/factoryDao.js";
import logger from "../utils/logger/loggerWinston.js";
import { capitalizeWords } from "../utils/capitalizeWords.js";

class CitiesService extends Services {
    constructor() {
        super(factoryDao.citiesDao);
        this.citiesDao = factoryDao.citiesDao;
        this.statesDao = factoryDao.statesDao;
    }

    //funciones especificas:
    createCity = async (data) => {
        try {
            const stateId = data.stateId;
            const name = capitalizeWords(data.name)
            if(!/^[a-zA-Z\s\-\']+$/.test(name)){
                throw new Error(`The city name can only contain letters, spaces, hyphens, and apostrophes: ${name}`);
            }
            const stateExist = await this.statesDao.getById(stateId);
            if (!stateExist) {
                throw new Error(`There is no state with that id: ${stateId}`)
            }
            const cityExist = await this.citiesDao.getByName(name);
            if (cityExist) {
                throw new Error(`There is already a city with that name: ${name}`)
            }
            const newItem = await this.citiesDao.create({name, stateId});
            if (!newItem) {
                throw new Error(`The item could not be created ${data}`)
            }
            return newItem;

        } catch (error) {
            logger.error('entró en el catch - citiesService - create: ' + error);
            throw error;
        }
    };
    /*getCitiesByStateId = async (id) => {
        try {
            const itemSearch = await this.citiesDao.getByStateId(id);
            if (!itemSearch) {
                throw new Error(`no se encontró item buscado por id ${id}`);
            }
            return itemSearch;
        } catch (error) {
            logger.error('entró en el catch - citiesService - getCitiesByStateId: ' + error);
            throw error;
        }
    }*/
    updateCity = async (id, data) => {
        try {
            const searchId = id
            const itemSearch = await this.citiesDao.getById(searchId);
            if (!itemSearch) {
                throw { errorCode: 'COUNTRY_NOT_FOUND', message: `No se encontró la ciudad con el ID: ${id}`, statusCode: 404 };
            }
            const name = capitalizeWords(data.name);
            if (!/^[a-zA-Z\s\-\']+$/.test(name)) {
                throw { errorCode: 'INVALID_COUNTRY_NAME', message: `The country name can only contain letters, spaces, hyphens, and apostrophes: ${name}`, statusCode: 400 };
            }
            const nameExist = await this.citiesDao.getByName(name);
            if (nameExist && nameExist.id !== itemSearch.dataValues.id) {
                throw { errorCode: 'COUNTRY_ALREADY_EXISTS', message: `There is already a city with that name: ${name}`, statusCode: 409 };
            }
            const updatedItem = await this.citiesDao.update(id, data);
            if (!updatedItem) {
                throw { errorCode: 'ERROR_TO_UPDATE', message: `The item could not be updated ${data}`, statusCode: 500 };
            }
            return updatedItem;
        } catch (error) {
            logger.error('entró en el catch - citiesService - updateCities: ' + error);
            throw error;
        }
    }
}

export const citiesService = new CitiesService();
