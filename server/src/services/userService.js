import { userModel } from '#models'

const userService = {
  getAllUsers: async () => {
    return await userModel.find().populate('mascots')
  },
  getUserById: async id => {
    const user = await userModel.findById(id).populate('mascots')
    if (!user) throw new Error('User not found')
    return user
  },
  addUser: async userData => {
    const newUser = new User(userData)
    return await newUser.save()
  },
  updateUser: async (id, updatedData) => {
    const user = await userModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
    if (!user) throw new Error('User not found')
    return user
  },
  deleteUser: async id => {
    const user = await userModel.findByIdAndDelete(id)
    if (!user) throw new Error('User not found')
    return user
  },
}

export default userService
