import { CitiesModel } from "./citiesModel";
import MongoDBDao from "../mongoDBDao";


export default class CitiesMongoDBDao extends MongoDBDao {
    constructor() {
        super(CitiesModel);
    }
    //codigo específico...
}