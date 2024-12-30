//Modules
import { Schema, model } from "mongoose";
import { CitiesModel } from "../cities/citiesModel.js";

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
        city:{
            type: [{type: Schema.Types.ObjectId, ref: CitiesModel}],
        },
    },
    { timestamps: true },
)

// Model
export const NeighborhoodsModel = model('Neighborhood', neighborhoodSchema)