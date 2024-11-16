import { model } from 'mongoose'

const Service = {
  add: async (name, id) => {
    model.add(name, id)
  },
  getAll: async () => {
    model.get(name, id)
  },
}

export default Service
