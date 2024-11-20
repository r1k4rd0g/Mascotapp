import { Schema, model } from "mongoose";
import { CitiesModel } from "../cities/cities.model";

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
        }
    }
)

// Model
export const NeighborhoodsModel = model('Neighborhood', neighborhoodSchema)