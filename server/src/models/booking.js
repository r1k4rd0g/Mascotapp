import mongoose, { Schema, model } from 'mongoose'

const bookingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    mascot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mascot',
      required: true,
    },
    vet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    clinicalHistory: {
      type: String,
      default: '',
    },
    report: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

// Modelo de Booking (Cita)
const Model = model('Booking', bookingSchema)

export default Model