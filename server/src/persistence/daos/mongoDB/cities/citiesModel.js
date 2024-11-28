import { Schema, model } from "mongoose";
import { NeighborhoodsModel } from "../neighborhoods/neighborhoodsModel";
import { StatesModel } from "../states/statesModel";

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