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
            console.log('name: ', name);
            const cityExist = await this.countriesDao.getByName(name);
            if (cityExist) {
                throw new Error(`There is already a country with that name: ${name}`)
            } if (!cityExist) {
                const newItem = await this.countriesDao.create(data);
                if (!newItem) {
                    throw new Error(`The item could not be created ${data}`)
                }
                return newItem;
            }
        } catch (error) {
            logger.error('entró en el catch - countriesService - countryCreate: ' + error);
            throw error;
        }
    };

    getCountryById = async (id) => {
        try {
            const itemSearch = await this.countriesDao.getById(id);
            if (!itemSearch) {
                throw new Error(`no se encontró item buscado por id ${id}`);
            }
            return itemSearch;
        } catch (error) {
            logger.error('entró en el catch - countriesService - getCountryById: ' + error);
            throw error;
        }
    }
}

export const countriesService = new CountriesService();
