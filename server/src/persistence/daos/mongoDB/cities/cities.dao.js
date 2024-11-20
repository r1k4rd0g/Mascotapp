import { CitiesModel } from "../cities/cities.model";
import MongoDBDao from "../mongoDB.dao";


export default class CitiesMongoDBDao extends MongoDBDao {
    constructor() {
        super(CitiesModel);
    }
    //codigo específico...
}