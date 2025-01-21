import { Schema, model } from "mongoose";
<<<<<<< HEAD
import { applyCapitalizeMongoDB } from "../../../../middlewares/applyCapitalize.js";
=======
import { StatesModel } from "../states/statesModel";
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479

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