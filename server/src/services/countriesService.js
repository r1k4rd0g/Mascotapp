//Modules
import Services from "./classService.js";
import factoryDao from "../persistence/daos/factoryDao.js";
import logger from "../utils/logger/loggerWinston.js";

class CountriesService extends Services {
    constructor() {
        super(factoryDao.countriesDao);
        this.countriesDao = factoryDao.countriesDao;
    }

    //funciones especificas:
    countryCreate = async (data) => {
        try {
            const name = data.name;
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
            logger.error('entró en el catch - countriesService - create: ' + error)
        }
    };
}

export const countriesService = new CountriesService();
