import { Schema, model } from "mongoose";
import { CitiesModel } from "../cities/citiesModel";
import { CountryModel } from "../countries/countriesModel";

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
        city:{
            type: [{type: Schema.Types.ObjectId, ref: CitiesModel}],
        }
    }
)

// Model
export const StatesModel = model('State', statesSchema)