//Modules
import { Schema, model } from "mongoose";
import { CountryModel } from "../countries/countriesModel.js";
import { applyCapitalizeMongoDB } from "../../../../../middlewares/applyCapitalize.js";

//Schema
export const statesSchema = new Schema(
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
        countryId: { //referencia uno a uno
            type: Schema.Types.ObjectId,
            ref: CountryModel,
        },
        deletedAt: { //campo para borrado lógico
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
)

//Middlewares
applyCapitalizeMongoDB(statesSchema, ['name']);

// Model
export const StatesModel = model('State', statesSchema)