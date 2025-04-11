//Modules
import { DataTypes } from "sequelize";
import { applyCapitalizeSQL } from "../../../../../middlewares/applyCapitalize.js";

//Modelo

const UserModel = (sequelize) => {
    const User = sequelize.define(
        "User",
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
            },
            lastName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },
            telephone: {
                type: DataTypes.STRING(20),
                unique: true,
                validate: {
                    isNumeric: true
                }
            },
            cellphone: {
                type: DataTypes.STRING(20),
                unique: true,
                allowNull: false,
                validate: {
                    isNumeric: true
                }
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            userType:{
                type: DataTypes.ENUM('admin', 'client', 'user'),
                defaultValue:'client'
            }
        },
        {
            tableName: "users",
            timestamps: true,
            paranoid:true
        },
    );

    //Middlewares
    applyCapitalizeSQL(User, ['name', 'lastName']);
    return User;
}


//exportamos el modelo
export default UserModel