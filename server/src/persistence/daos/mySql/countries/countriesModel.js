//Modules
import { DataTypes } from "sequelize";
import { applyCapitalizeSQL } from "../../../../middlewares/applyCapitalize.js";


//Modelo
const CountryModel = (sequelize) => {
    const Country = sequelize.define(
        "Country",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        },
        {
            tableName: "countries",
            timestamps: true,
            paranoid: true,
        },
    );
    //Middlewares
    applyCapitalizeSQL(Country, ['name']);
    return Country;
};



// exportamos el modelo
export default CountryModel