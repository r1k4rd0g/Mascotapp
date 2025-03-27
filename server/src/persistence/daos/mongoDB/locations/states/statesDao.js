<<<<<<< HEAD:server/src/persistence/daos/mongoDB/states/statesDao.js
import { StatesModel } from "../states/statesModel";
import MongoDBDao from "../mongoDBDao";
=======
import { StatesModel } from "../states/statesModel.js";
import MongoDBDao from "../../mongoDBDao.js";
>>>>>>> develop:server/src/persistence/daos/mongoDB/locations/states/statesDao.js


export default class StatesMongoDBDao extends MongoDBDao {
    constructor() {
        super(StatesModel);
    }
    //codigo específico...
}