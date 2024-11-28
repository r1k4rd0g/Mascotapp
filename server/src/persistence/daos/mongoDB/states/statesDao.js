import { StatesModel } from "../states/statesModel";
import MongoDBDao from "../mongoDBDao";


export default class StatesMongoDBDao extends MongoDBDao {
    constructor() {
        super(StatesModel);
    }
    //codigo específico...
}