//Modules
import NeighborhoodModel from "./neighborhoodsModel.js";
import MySQLDao from "../mySQLDao.js";

export default class NeighborhoodMySQLDao extends MySQLDao {
    constructor(sequelize) {
        const neighborhoodModel = NeighborhoodModel(sequelize);
        super(neighborhoodModel);
    }
    //código específico...
}