import { CountryMode } from "../countries/countries.model";
import MongoDBDao from "../mongoDB.dao";


export default class CountryMongoDBDao extends MongoDBDao {
    constructor() {
        super(CountryMode);
    }
    //codigo específico...
}