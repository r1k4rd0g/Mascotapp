//Modules
import config from "../../config/configEnv.js";
import logger from "../../utils/logger/loggerWinston.js";
import MongoConnection from "../../config/connection/mongoDBConnection.js";

//DAO de MongoDB
import UserMongoDBDao from "./mongoDB/users/usersDao.js";
import PetMongoDBDao from "./mongoDB/pets/petsDao.js";
import CountryMongoDBDao from "./mongoDB/countries/countriesDao.js";
import StatesMongoDBDao from "./mongoDB/states/statesDao.js";
import CitiesMongoDBDao from "./mongoDB/cities/citiesDao.js";
import NeighborhoodMongoDBDao from "./mongoDB/neighborhoods/neighborhoodsDao.js";


//Variables y Constantes
const persistence = config.PERSISTENCE
let usersDao;
let petsDao;
let countriesDao;
let statesDao;
let citiesDao;
let neighborhoodsDao;


switch (persistence) {
    case 'MONGO':
        await MongoConnection.getInstance();
        usersDao = new UserMongoDBDao();
        petsDao = new PetMongoDBDao();
        countriesDao = new CountryMongoDBDao();
        statesDao = new StatesMongoDBDao();
        citiesDao = new CitiesMongoDBDao();
        neighborhoodsDao = new NeighborhoodMongoDBDao();
        logger.info('factory - case: MONGO - use Mongo DB')
        break;
    case 'default':
        await MongoConnection.getInstance();
        usersDao = new UserMongoDBDao();
        petsDao = new PetMongoDBDao();
        countriesDao = new CountryMongoDBDao();
        statesDao = new StatesMongoDBDao();
        citiesDao = new CitiesMongoDBDao();
        neighborhoodsDao = new NeighborhoodMongoDBDao();
        logger.info('factory - case: default - use Mongo DB')
        break;
}

//se exporta como objeto
export default {
    usersDao,
    petsDao,
    countriesDao,
    statesDao,
    citiesDao,
    neighborhoodsDao,
}