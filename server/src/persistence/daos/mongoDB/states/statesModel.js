//Modules
import { Schema, model } from "mongoose";
import { CountryModel } from "../countries/countriesModel.js";

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
        country: {
            type:[{type: Schema.Types.ObjectId, ref: CountryModel}],
        },
    },
    { timestamps: true },
)

// Model
export const StatesModel = model('State', statesSchema)