/*** Modules  ****/
import config from "../../config/configEnv";
import logger from "../../utils/logger/loggerWinston";
import MongoConnection from "../../config/connection/mongoDBConnection";

/*** DAO de MongoDB  ****/
import UserMongoDBDao from "./mongoDB/users/usersDao";
import PetMongoDBDao from "./mongoDB/pets/petsDao";
import CountryMongoDBDao from "./mongoDB/countries/countriesDao";
import StatesMongoDBDao from "./mongoDB/states/statesDao";
import CitiesMongoDBDao from "./mongoDB/cities/citiesDao";
import NeighborhoodMongoDBDao from "./mongoDB/neighborhoods/neighborhoodsDao";


/*** Variables y Constantes */
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

export default {
    usersDao,
    petsDao,
    countriesDao,
    statesDao,
    citiesDao,
    neighborhoodsDao,
}