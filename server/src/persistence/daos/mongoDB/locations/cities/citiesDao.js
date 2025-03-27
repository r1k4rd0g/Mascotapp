<<<<<<< HEAD:server/src/persistence/daos/mongoDB/cities/citiesDao.js
import { CitiesModel } from "./citiesModel";
import MongoDBDao from "../mongoDBDao";
=======
import { CitiesModel } from "./citiesModel.js";
import MongoDBDao from "../../mongoDBDao.js";
>>>>>>> develop:server/src/persistence/daos/mongoDB/locations/cities/citiesDao.js


export default class CitiesMongoDBDao extends MongoDBDao {
    constructor() {
        super(CitiesModel);
    }
    //codigo específico...
}