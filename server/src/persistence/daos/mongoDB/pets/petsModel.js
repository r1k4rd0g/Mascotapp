// Modules

import { model, Schema } from 'mongoose'

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
  { timestamps: true }
)

// Model
const Model = model('Mascot', mascotSchema)

export default Model
