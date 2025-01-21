import {CountryModel} from "../countries/countriesModel.js";
import MongoDBDao from "../mongoDBDao.js";


export default class CountryMongoDBDao extends MongoDBDao {
    constructor() {
        super(CountryModel);
    }
    //código específico...
}