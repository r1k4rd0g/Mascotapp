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
    updateNeighborhood = async (id, data) => {
        try {
            const searchId = id
            const itemSearch = await this.neighborhoodsDao.getById(searchId);
            if (!itemSearch) {
                throw { errorCode: 'COUNTRY_NOT_FOUND', message: `No se encontró el barrio con el ID: ${id}`, statusCode: 404 };
            }
            const name = capitalizeWords(data.name);
            if (!/^[a-zA-Z\s\-\']+$/.test(name)) {
                throw { errorCode: 'INVALID_COUNTRY_NAME', message: `The country name can only contain letters, spaces, hyphens, and apostrophes: ${name}`, statusCode: 400 };
            }
            const nameExist = await this.neighborhoodsDao.getByName(name);
            if (nameExist && nameExist.id !== itemSearch.dataValues.id) {
                throw { errorCode: 'COUNTRY_ALREADY_EXISTS', message: `There is already a neighborhoods with that name: ${name}`, statusCode: 409 };
            }
            const updatedItem = await this.neighborhoodsDao.update(id, data);
            if (!updatedItem) {
                throw { errorCode: 'ERROR_TO_UPDATE', message: `The item could not be updated ${data}`, statusCode: 500 };
            }
            return updatedItem;
        } catch (error) {
            logger.error('entró en el catch - neighborhoodsService - updateNeighborhood: ' + error);
            throw error;
        }
    }
}

export const neighborhoodsService = new NeighborhoodsService();
