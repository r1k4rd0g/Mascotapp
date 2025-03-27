import { Schema, model } from "mongoose";
<<<<<<< HEAD:server/src/persistence/daos/mongoDB/countries/countriesModel.js
<<<<<<< HEAD
import { applyCapitalizeMongoDB } from "../../../../middlewares/applyCapitalize.js";
=======
import { StatesModel } from "../states/statesModel";
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479
=======
import { applyCapitalizeMongoDB } from "../../../../../middlewares/applyCapitalize.js";
>>>>>>> develop:server/src/persistence/daos/mongoDB/locations/countries/countriesModel.js

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
<<<<<<< HEAD
        deletedAt: { //campo para borrado lógico
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
);

//Middlewares
applyCapitalizeMongoDB(countrySchema, ['name']);
=======
        state: {
            type: [{ type: Schema.Types.ObjectId, ref: StatesModel }]
        }
    }
)
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479

// Model
export const CountryModel = model('Country', countrySchema)