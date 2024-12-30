//Modules
import Services from "./classService.js";
import factoryDao from "../persistence/daos/factoryDao.js";
import logger from "../utils/logger/loggerWinston.js";

class CountriesService extends Services {
    constructor(){
        super(factoryDao.countriesDao);
        this.countriesDao = factoryDao.countriesDao;
    }

    //funciones especificas:
    countryCreate = async (data) => {
        try {
            const name = data.name;
            const cityExist = await this.countriesDao.getByName(name);
            if (cityExist) throw new Error('ya existe un país con ese nombre');
            const newItem = await this.countriesDao.create(data);
            if (!newItem) {
                throw new Error(`no se pudo crear el item ${data}`)
            }
            return newItem;
        } catch (error) {
            logger.error('entró en el catch - class.service - create: ' + error)
        }
    };
}

export const countriesService = new CountriesService();
