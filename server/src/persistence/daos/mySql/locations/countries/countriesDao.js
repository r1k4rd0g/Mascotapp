//Modules
import CountryModel from "../countries/countriesModel.js";
import MySQLDao from "../../mySQLDao.js";


export default class CountryMySQLDao extends MySQLDao {
    constructor(sequelize) {
        const countryModel = CountryModel(sequelize);
        super(countryModel, sequelize);
    }
    //código específico...
}