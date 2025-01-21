import { Schema, model } from "mongoose";
<<<<<<< HEAD
import { CitiesModel } from "../cities/citiesModel.js";
import { applyCapitalizeMongoDB } from "../../../../middlewares/applyCapitalize.js";
=======
import { CitiesModel } from "../cities/citiesModel";
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479

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
<<<<<<< HEAD
        cityId: {
                type: Schema.Types.ObjectId,
                ref: CitiesModel
        },
        deletedAt: { //campo para borrado lógico
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
=======
        city:{
            type: [{type: Schema.Types.ObjectId, ref: CitiesModel}],
        }
    }
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479
)
//Middlewares
applyCapitalizeMongoDB(neighborhoodSchema, ['name']);

// Model
export const NeighborhoodsModel = model('Neighborhood', neighborhoodSchema)