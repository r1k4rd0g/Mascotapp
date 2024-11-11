// Modules
import mongoose, { Schema, model } from 'mongoose'

// Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    telephone: {
      type: String,
      unique: true,
      match: /^[\d\+\-\(\)\s]*$/,
    },
    address: {
      street: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    mascots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mascot',
      },
    ],
    userType: {
      type: String,
      default: 'user',
      enum: ['admin', 'client', 'user'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

// Model
const Model = model('User', userSchema)

export default Model
