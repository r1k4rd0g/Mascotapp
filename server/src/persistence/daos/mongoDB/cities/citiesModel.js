//Modules
import { Schema, model } from "mongoose";
import { StatesModel } from "../states/statesModel.js";

//Schema
export const citiesSchema = new Schema(
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
            type: [{ type: Schema.Types.ObjectId, ref: StatesModel }],
        },
    },
    { timestamps: true },
)

// Model
export const CitiesModel = model('Cities', citiesSchema)