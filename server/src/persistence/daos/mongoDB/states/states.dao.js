import { StatesModel } from "../states/states.model";
import MongoDBDao from "../mongoDB.dao";


export default class StatesMongoDBDao extends MongoDBDao {
    constructor() {
        super(StatesModel);
    }
    //codigo específico...
}