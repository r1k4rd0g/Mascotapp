import { NeighborhoodsModel } from "./neighborhoodsModel";
import MongoDBDao from "../mongoDBDao";


export default class NeighborhoodMongoDBDao extends MongoDBDao {
    constructor() {
        super(NeighborhoodsModel);
    }
    //código específico...
}