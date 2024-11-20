import { NeighborhoodsModel } from "../neighborhoods/neighborhoods.model";
import MongoDBDao from "../mongoDB.dao";


export default class NeighborhoodMongoDBDao extends MongoDBDao {
    constructor() {
        super(NeighborhoodsModel);
    }
    //codigo específico...
}