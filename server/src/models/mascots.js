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
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

// Model
const Model = model('Mascot', mascotSchema)

export default Model
