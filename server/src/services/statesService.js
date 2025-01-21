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
            const countryId= data.countryId;
            console.log('country: ' + countryId)
            const name = capitalizeWords(data.name)
            const countryExist = await this.countriesDao.getById(countryId);
            if (!countryExist) {
                throw new Error(`There is no country with that id: ${countryId}`)
            }
            const stateExist = await this.statesDao.getByName(name);
            if (stateExist) {
                throw new Error(`There is already a state with that name: ${name}`)
            }
            const newItem = await this.statesDao.create({name, countryId});
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
}

export const statesService = new StatesService();