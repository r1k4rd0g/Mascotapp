//Modules
import { DataTypes } from "sequelize";
import { applyCapitalizeSQL } from "../../../../../middlewares/applyCapitalize.js";

//Modelo
const CityModel = (sequelize) => {
    const City = sequelize.define(
        "City",
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
            stateId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'states',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        },
        {
            tableName: "cities",
            timestamps: true,
            paranoid: true,
        },
    );
    //Middlewares
    applyCapitalizeSQL(City, ['name']);
    return City;
};

//exportamos el modelo
export default CityModel