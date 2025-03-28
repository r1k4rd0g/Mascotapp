import { PetsModel } from "./petsModel.js";
import MongoDBDao from "../mongoDBDao.js";

export default class PetsMongoDBDao extends MongoDBDao {
    constructor() {
        super(PetsModel);
    }
    //código específico...
}