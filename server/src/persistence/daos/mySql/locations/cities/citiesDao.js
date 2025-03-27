//Modules
import CityModel from "./citiesModel.js";
import MySQLDao from "../../mySQLDao.js";

export default class CityMySQLDao extends MySQLDao {
    constructor(sequelize) {
        const cityModel = CityModel(sequelize);
        super(cityModel);
    }
    //código específico...
}
