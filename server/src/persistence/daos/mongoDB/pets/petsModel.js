// Modules

import { model, Schema } from 'mongoose'
import { applyCapitalizeMongoDB } from '../../../../middlewares/applyCapitalize.js'


// Schema
const petsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specie: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true
    },
    birthdate: {
      type: Date,
      required: true,
    },
    registerDate: {
      type: Date,
    },
    comments: [
      { type: String }
    ],
    diagnostic: [],
  },
  { timestamps: true },
);

//Middlewares
applyCapitalizeMongoDB(petsSchema, ['name', 'specie', 'breed']);

// Model
export const PetsModel = model('Pets', petsSchema);


