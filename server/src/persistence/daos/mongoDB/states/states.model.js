import { Schema, model } from "mongoose";
import { CitiesModel } from "../cities/cities.model";
import { CountryModel } from "../countries/countries.model";

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