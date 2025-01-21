//Modules
import { Schema, model } from "mongoose";
import { CitiesModel } from "../cities/citiesModel.js";
import { applyCapitalizeMongoDB } from "../../../../middlewares/applyCapitalize.js";

//Schema
export const neighborhoodSchema = new Schema(
    {
        isActive: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        cityId: {
                type: Schema.Types.ObjectId,
                ref: CitiesModel
        },
        deletedAt: { //campo para borrado lógico
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
)
//Middlewares
applyCapitalizeMongoDB(neighborhoodSchema, ['name']);

// Model
export const NeighborhoodsModel = model('Neighborhood', neighborhoodSchema)