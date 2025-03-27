import { Schema, model } from "mongoose";
<<<<<<< HEAD
import { CountryModel } from "../countries/countriesModel.js";
<<<<<<< HEAD:server/src/persistence/daos/mongoDB/states/statesModel.js
import { applyCapitalizeMongoDB } from "../../../../middlewares/applyCapitalize.js";
=======
import { CitiesModel } from "../cities/citiesModel";
import { CountryModel } from "../countries/countriesModel";
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479
=======
import { applyCapitalizeMongoDB } from "../../../../../middlewares/applyCapitalize.js";
>>>>>>> develop:server/src/persistence/daos/mongoDB/locations/states/statesModel.js

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
        countryId: { //referencia uno a uno
            type: Schema.Types.ObjectId,
            ref: CountryModel,
        },
        deletedAt: { //campo para borrado lógico
            type: Date,
            default: null,
        },
        city:{
            type: [{type: Schema.Types.ObjectId, ref: CitiesModel}],
        }
    }
)

//Middlewares
applyCapitalizeMongoDB(statesSchema, ['name']);

// Model
export const StatesModel = model('State', statesSchema)