//Modules
import { DataTypes } from "sequelize";
import { applyCapitalizeSQL } from "../../../../../middlewares/applyCapitalize.js";


//Modelo
const StateModel = (sequelize) => {
    const State = sequelize.define(
        "State",
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
            countryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'countries',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        },
        {
            tableName: "states",
            timestamps: true,
            paranoid: true,
        },
    );
    //Middlewares
    applyCapitalizeSQL(State, ['name']);
    return State;
};

//exportamos el modelo
export default StateModel