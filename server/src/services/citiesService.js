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
    getCitiesByStateId = async (id) => {
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
    }
}

export const citiesService = new CitiesService();