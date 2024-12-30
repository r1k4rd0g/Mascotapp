import { CitiesModel } from "./citiesModel.js";
import MongoDBDao from "../mongoDBDao.js";


export default class CitiesMongoDBDao extends MongoDBDao {
    constructor() {
        super(CitiesModel);
    }
    //código específico...
}