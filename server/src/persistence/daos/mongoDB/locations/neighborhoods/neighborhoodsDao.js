<<<<<<< HEAD:server/src/persistence/daos/mongoDB/neighborhoods/neighborhoodsDao.js
import { NeighborhoodsModel } from "./neighborhoodsModel";
import MongoDBDao from "../mongoDBDao";
=======
import { NeighborhoodsModel } from "./neighborhoodsModel.js";
import MongoDBDao from "../../mongoDBDao.js";
>>>>>>> develop:server/src/persistence/daos/mongoDB/locations/neighborhoods/neighborhoodsDao.js


export default class NeighborhoodMongoDBDao extends MongoDBDao {
    constructor() {
        super(NeighborhoodsModel);
    }
    //código específico...
}