<<<<<<< HEAD
import {CountryModel} from "../countries/countriesModel.js";
import MongoDBDao from "../mongoDBDao.js";
=======
import { CountryMode } from "../countries/countriesModel";
import MongoDBDao from "../mongoDBDao";
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479


export default class CountryMongoDBDao extends MongoDBDao {
    constructor() {
        super(CountryMode);
    }
    //codigo específico...
}