//Modules
import { Schema, model } from "mongoose";
import { applyCapitalizeMongoDB } from "../../../../../utils/applyCapitalize.js";

//Schema
export const countrySchema = new Schema(
    {
        isActive: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            collation: { locale: 'es', strength: 2 },
        },
        deletedAt: { //campo para borrado lógico
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
);

//Middlewares
applyCapitalizeMongoDB(countrySchema, ['name']);

// Model
export const CountryModel = model('Country', countrySchema)
