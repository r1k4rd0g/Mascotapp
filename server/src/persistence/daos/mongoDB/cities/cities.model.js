import { Schema, model } from "mongoose";
import { NeighborhoodsModel } from "../neighborhoods/neighborhoods.model";
import { StatesModel } from "../states/states.model";

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
        state:{
            type: [{type: Schema.Types.ObjectId, ref: StatesModel}],
        },
        neighborhood: {
            type: [{type: Schema.Types.ObjectId, ref: NeighborhoodsModel}],
        },
    }
)

// Model
export const CitiesModel = model('Cities', citiesSchema)