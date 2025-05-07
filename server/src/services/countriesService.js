//Modules
import Services from "./classService.js";
import factoryDao from "../persistence/daos/factoryDao.js";
import logger from "../utils/logger/loggerWinston.js";
import { capitalizeWords } from "../utils/capitalizeWords.js";

class CountriesService extends Services {
    constructor() {
        super(factoryDao.countriesDao);
        this.countriesDao = factoryDao.countriesDao;
    }

    //funciones especificas:
    createCountry = async (data) => {
        try {
            const name = capitalizeWords(data.name);
            if (!/^[a-zA-Z\s\-\']+$/.test(name)) {
                throw { errorCode: 'INVALID_COUNTRY_NAME', message: `The country name can only contain letters, spaces, hyphens, and apostrophes: ${name}`, statusCode: 400 };
            }
            const cityExist = await this.countriesDao.getByName(name);
            if (cityExist) {
                throw { errorCode: 'COUNTRY_ALREADY_EXISTS', message: `There is already a country with that name: ${name}`, statusCode: 409 };
            } if (!cityExist) {
                const newItem = await this.countriesDao.create(data);
                if (!newItem) {
                    throw { errorCode: 'ERROR_TO_CREATE', message: `The item could not be created ${data}`, statusCode: 500 };
                }
            }
            return newItem;
        } catch (error) {
            logger.error('entró en el catch - countriesService - countryCreate: ' + error);
            throw error;
        }
    };

    getCountryById = async (id) => {
        try {
            const itemSearch = await this.countriesDao.getById(id);
            if (!itemSearch) {
                throw { errorCode: 'COUNTRY_NOT_FOUND', message: `No se encontró el país con el ID: ${id}`, statusCode: 404 };
            }
            return itemSearch;
        } catch (error) {
            logger.error('entró en el catch - countriesService - getCountryById: ' + error);
            throw error;
        }
    }
    updateCountry = async (id, data) => {
        try {
            const searchId = id
            const itemSearch = await this.countriesDao.getById(searchId);
            if (!itemSearch) {
                throw { errorCode: 'COUNTRY_NOT_FOUND', message: `No se encontró el país con el ID: ${id}`, statusCode: 404 };
            }
            const name = capitalizeWords(data.name);
            if (!/^[a-zA-Z\s\-\']+$/.test(name)) {
                throw { errorCode: 'INVALID_COUNTRY_NAME', message: `The country name can only contain letters, spaces, hyphens, and apostrophes: ${name}`, statusCode: 400 };
            }
            const nameExist = await this.countriesDao.getByName(name);
            if (nameExist && nameExist.id !== itemSearch.dataValues.id) {
                throw { errorCode: 'COUNTRY_ALREADY_EXISTS', message: `There is already a country with that name: ${name}`, statusCode: 409 };
            }
            const updatedItem = await this.countriesDao.update(id, data);
            if (!updatedItem) {
                throw { errorCode: 'ERROR_TO_UPDATE', message: `The item could not be updated ${data}`, statusCode: 500 };
            }
            return updatedItem;
        } catch (error) {
            logger.error('entró en el catch - countriesService - updateCountry: ' + error);
            throw error;
        }
    }
}
export const countriesService = new CountriesService();
