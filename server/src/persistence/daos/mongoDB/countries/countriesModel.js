import { Schema, model } from "mongoose";
import { StatesModel } from "../states/statesModel";

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
        },
        state: {
            type: [{ type: Schema.Types.ObjectId, ref: StatesModel }]
        }
    }
)

// Model
export const CountryModel = model('Country', countrySchema)