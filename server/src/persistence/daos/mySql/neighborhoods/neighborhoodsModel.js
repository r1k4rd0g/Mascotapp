//Modules
import { DataTypes } from "sequelize";
import { applyCapitalizeSQL } from "../../../../middlewares/applyCapitalize.js";

//Modelo
const NeighborhoodModel = (sequelize) => {
    const Neighborhood = sequelize.define(
        "Neighborhood",
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
            cityId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'cities',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
        },
        {
            tableName: "neighborhoods",
            timestamps: true,
            paranoid: true,
        },
    );
    //Middlewares
    applyCapitalizeSQL(Neighborhood, ['name']);
    return Neighborhood;
};4

//exportamos el modelo
export default NeighborhoodModel