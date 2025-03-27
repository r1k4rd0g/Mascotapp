//Modules
import StateModel from "./statesModel.js";
import MySQLDao from "../../mySQLDao.js";

export default class StateMySQLDao extends MySQLDao {
    constructor(sequelize) {
        const stateModel = StateModel(sequelize);
        super(stateModel);
    }
    //código específico...
}