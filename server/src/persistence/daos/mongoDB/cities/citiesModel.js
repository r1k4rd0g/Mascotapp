import { Schema, model } from "mongoose";
<<<<<<< HEAD
import { StatesModel } from "../states/statesModel.js";
import { applyCapitalizeMongoDB } from "../../../../middlewares/applyCapitalize.js";
=======
import { NeighborhoodsModel } from "../neighborhoods/neighborhoodsModel";
import { StatesModel } from "../states/statesModel";
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479

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
<<<<<<< HEAD
        stateId: {
                type: Schema.Types.ObjectId,
                ref: StatesModel
        },
        deletedAt: { //campo para borrado lógico
            type: Date,
            default: null,
=======
        state:{
            type: [{type: Schema.Types.ObjectId, ref: StatesModel}],
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479
        },
        neighborhood: {
            type: [{type: Schema.Types.ObjectId, ref: NeighborhoodsModel}],
        },
    }
)

//Middlewares
applyCapitalizeMongoDB(citiesSchema, ['name']);

// Model
export const CitiesModel = model('Cities', citiesSchema)