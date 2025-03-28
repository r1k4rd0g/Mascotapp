import { NeighborhoodsModel } from "./neighborhoodsModel.js";
import MongoDBDao from "../../mongoDBDao.js";


export default class NeighborhoodMongoDBDao extends MongoDBDao {
    constructor() {
        super(NeighborhoodsModel);
    }
    //código específico...
}