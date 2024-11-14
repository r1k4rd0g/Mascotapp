// Modules

// Imports

// Variables

// Controller
const Controller = {
  add: async (rq, rs) => {
    rs.status(200).send({ data: " Se ha agregado un usuario " })
  },
  remove: async (rq, rs) => {},
  getAll: async (rq, rs) => {},
  getById: async (rq, rs) => {},
  update: async (rq, rs) => {},
}

export default Controller