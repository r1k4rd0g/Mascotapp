// Modules
import { Schema, model } from 'mongoose'

// Schema
const userSchema = new Schema(
  {
    isActive:{
      type: Boolean,
      default: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    cdi: {
      type: Number,
      unique: true,
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
      match: /^[\d\+\-\(\)\s]*$/,//hay que agregar una estrategia de formato de guardado.
    },
    cellphone: {
      type: String,
      unique: true,
      match: /^[\d\+\-\(\)\s]*$/, //hay que agregar una estrategia de formato de guardado.
      required: true,
    },
    street: {
      type: String
    },
    hood: { type: String },
    city: { type: String },
    state: {
      type: String,
      enum:{
      }
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
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
    review: [{ type: String }],
  },
  { timestamps: true }
)

// Model
export const UserModel = model('User', userSchema)

