//Modules
import Services from "./classService.js";
import factoryDao from "../persistence/daos/factoryDao.js";
import logger from "../utils/logger/loggerWinston.js";
import { capitalizeWords } from "../utils/capitalizeWords.js";

class NeighborhoodsService extends Services {
    constructor() {
        super(factoryDao.neighborhoodsDao);
        this.neighborhoodsDao = factoryDao.neighborhoodsDao;
        this.citiesDao = factoryDao.citiesDao;
    }

    //funciones especificas:
    createNeighborhood = async (data) => {
        try {
            const cityId = data.cityId;
            const name = capitalizeWords(data.name)
            if(!/^[a-zA-Z\s\-\']+$/.test(name)){
                throw new Error(`The neighborhood name can only contain letters, spaces, hyphens, and apostrophes: ${name}`);
            }
            const cityExist = await this.citiesDao.getById(cityId);
            if (!cityExist) {
                throw new Error(`There is no city with that id: ${cityId}`)
            }
            const neighborhoodExist = await this.neighborhoodsDao.getByName(name);
            if (neighborhoodExist) {
                throw new Error(`There is already a neighborhood with that name: ${name}`)
            }
            const newItem = await this.neighborhoodsDao.create({name, cityId});
            if (!newItem) {
                throw new Error(`The item could not be created ${data}`)
            }
            return newItem;

        } catch (error) {
            logger.error('entró en el catch - neighborhoodsService - create: ' + error);
            throw error;
        }
    };
    getNeighborhoodsByCityId = async (id) => {
        try {
            const itemSearch = await this.neighborhoodsDao.getByCityId(id);
            if (!itemSearch) {
                throw new Error(`no se encontró item buscado por id ${id}`);
            }
            return itemSearch;
        } catch (error) {
            logger.error('entró en el catch - neighborhoodsService - getNeighborhoodsByCityId: ' + error);
            throw error;
        }
    }
}

export const neighborhoodsService = new NeighborhoodsService();