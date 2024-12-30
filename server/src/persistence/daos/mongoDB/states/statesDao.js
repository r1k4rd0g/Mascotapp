import { StatesModel } from "../states/statesModel.js";
import MongoDBDao from "../mongoDBDao.js";


export default class StatesMongoDBDao extends MongoDBDao {
    constructor() {
        super(StatesModel);
    }
    //código específico...
}