// Modules
import { Schema, model } from 'mongoose'
import { CountryModel } from '../countries/countriesModel'
import { StatesModel } from '../states/statesModel'
import { CitiesModel } from '../cities/citiesModel'
import { NeighborhoodsModel } from '../neighborhoods/neighborhoodsModel'
import { PetsModel } from '../pets/petsModel'

// Schema
export const userSchema = new Schema(
  {
    isActive: {
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
    //Referencias a otros Modelos
    country: {
      type: [{ type: Schema.Types.ObjectId, ref: CountryModel }]
    },
    state: {
      type: [{ type: Schema.Types.ObjectId, ref: StatesModel }]
    },
    city: {
      type: [{ type: Schema.Types.ObjectId, ref: CitiesModel }]
    },
    neighborhoods: {
      type: [{ type: Schema.Types.ObjectId, ref: NeighborhoodsModel }]
    },
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pets',
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

