<<<<<<< HEAD
import {CountryModel} from "../countries/countriesModel.js";
<<<<<<< HEAD:server/src/persistence/daos/mongoDB/countries/countriesDao.js
import MongoDBDao from "../mongoDBDao.js";
=======
import { CountryMode } from "../countries/countriesModel";
import MongoDBDao from "../mongoDBDao";
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479
=======
import MongoDBDao from "../../mongoDBDao.js";
>>>>>>> develop:server/src/persistence/daos/mongoDB/locations/countries/countriesDao.js


export default class CountryMongoDBDao extends MongoDBDao {
    constructor() {
        super(CountryMode);
    }
    //codigo específico...
}