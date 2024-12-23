import { CountryMode } from "../countries/countriesModel";
import MongoDBDao from "../mongoDBDao";


export default class CountryMongoDBDao extends MongoDBDao {
    constructor() {
        super(CountryMode);
    }
    //codigo específico...
}