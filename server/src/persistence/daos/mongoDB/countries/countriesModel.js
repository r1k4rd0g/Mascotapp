//Modules
import { Schema, model } from "mongoose";
import { capitalizeWords } from "../../../../utils/capitalizeWords.js";

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
    },
    { timestamps: true },
);

//Middlewares
capitalizeWords(countrySchema, ['name']);

// Model
export const CountryModel = model('Country', countrySchema)