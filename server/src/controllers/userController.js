// Modules

// Imports
import { userService } from '#services'

// Variables

// Controller
const Controller = {
  add: async (rq, rs) => {
    try {
      const newUser = await userService.addUser(rq.body)
      rs.status(201).json({ success: true, user: newUser })
    } catch (err) {
      rs.status(400).json({ success: false, message: err.message })
    }
  },
  remove: async (rq, rs) => {
    try {
      const { id } = rq.params
      await userService.deleteUser(id)
      rs.status(200).json({
        success: true,
        message: 'User deleted successfully',
      })
    } catch (err) {
      rs.status(404).json({ success: false, message: err.message })
    }
  },
  all: async (rq, rs) => {
    try {
      const users = await userService.getAllUsers()
      rs.status(200).json({ success: true, users })
    } catch (err) {
      rs.status(500).json({ success: false, message: err.message })
    }
  },
  byId: async (rq, rs) => {
    try {
      const { id } = rq.params
      const user = await userService.getUserById(id)
      rs.status(200).json({ success: true, user })
    } catch (err) {
      rs.status(404).json({ success: false, message: err.message })
    }
  },
  update: async (rq, rs) => {
    try {
      const { id } = rq.params
      const updatedUser = await userService.updateUser(id, rq.body)
      rs.status(200).json({ success: true, user: updatedUser })
    } catch (err) {
      rs.status(404).json({ success: false, message: err.message })
    }
  },
}

export default Controller
