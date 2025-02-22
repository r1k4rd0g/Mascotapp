//Modules
import { Schema, model } from "mongoose";
import { StatesModel } from "../states/statesModel.js";
import { applyCapitalizeMongoDB } from "../../../../../middlewares/applyCapitalize.js";

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
        stateId: {
                type: Schema.Types.ObjectId,
                ref: StatesModel
        },
        deletedAt: { //campo para borrado lógico
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
)

//Middlewares
applyCapitalizeMongoDB(citiesSchema, ['name']);

// Model
export const CitiesModel = model('Cities', citiesSchema)