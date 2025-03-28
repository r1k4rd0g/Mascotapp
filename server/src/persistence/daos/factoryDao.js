//Modules
import config from "../../config/configEnv.js";
import logger from "../../utils/logger/loggerWinston.js";
import MongoConnection from "../../config/connection/mongoDBConnection.js";
import MySQLConnection from "../../config/connection/mySqlDBConnection.js";

//DAO de MongoDB
import UserMongoDBDao from "./mongoDB/users/usersDao.js";
import PetMongoDBDao from "./mongoDB/pets/petsDao.js";
import CountryMongoDBDao from "./mongoDB/locations/countries/countriesDao.js";
import StatesMongoDBDao from "./mongoDB/locations/states/statesDao.js";
import CitiesMongoDBDao from "./mongoDB/locations/cities/citiesDao.js";
import NeighborhoodMongoDBDao from "./mongoDB/locations/neighborhoods/neighborhoodsDao.js";

//DAO de MySQL
//import UserMySQLDao from "./mySql/users/usersDao.js";
//import PetMySQLDao from "./mySql/pets/petsDao.js";
import CountryMySQLDao from "./mySql/locations/countries/countriesDao.js";
import StateMySQLDao from "./mySql/locations/states/statesDao.js";
import CitiesMySQLDao from "./mySql/locations/cities/citiesDao.js";
import NeighborhoodMySQLDao from "./mySql/locations/neighborhoods/neighborhoodsDao.js";




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
        try {
            await MongoConnection.getInstance();
            usersDao = new UserMongoDBDao();
            petsDao = new PetMongoDBDao();
            countriesDao = new CountryMongoDBDao();
            statesDao = new StatesMongoDBDao();
            citiesDao = new CitiesMongoDBDao();
            neighborhoodsDao = new NeighborhoodMongoDBDao();
            logger.info('factory - case: MONGO - use Mongo DB')
        } catch (error) {
            logger.error(`Error en la conexión a la base de datos: ${error}`)
            throw error;
        }
        break;
    case 'MYSQL':
        try {
            const connection = await MySQLConnection.getInstance();
            const sequelize = connection.getSequelize();
            //usersDao = new UserMongoDBDao();
            //petsDao = new PetMongoDBDao();
            countriesDao = new CountryMySQLDao(sequelize);
            statesDao = new StateMySQLDao(sequelize);
            citiesDao = new CitiesMySQLDao(sequelize);
            neighborhoodsDao = new NeighborhoodMySQLDao(sequelize);
            logger.info('factory - case: MYSQL - use MYSQL')
        } catch (error) {
            logger.error(`Error en la conexión a la base de datos: ${error}`)
            throw error;
        }
        break;
    default:
        logger.error('Error en la conexión a la base de datos');
        throw new Error('Error en la conexión a la base de datos');
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