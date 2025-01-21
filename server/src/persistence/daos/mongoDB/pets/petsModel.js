// Modules

import { model, Schema } from 'mongoose'
<<<<<<< HEAD
import { applyCapitalizeMongoDB } from '../../../../middlewares/applyCapitalize.js'
=======
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479

// imports

// Variables

// Schema
const mascotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    specie: {
      type: String,
      required: true,
    },
    born: {
      type: Date,
      required: true,
    },
    regisDate: {
      type: Date,
    },
    reviews: [],
    diagnostic: [],
  },
<<<<<<< HEAD
  { timestamps: true },
);

//Middlewares
applyCapitalizeMongoDB(petsSchema, ['name', 'specie', 'breed']);
=======
  { timestamps: true }
)
>>>>>>> 2a099d6139b39928a394870e1264031cdaa87479

// Model
const Model = model('Mascot', mascotSchema)

export default Model
