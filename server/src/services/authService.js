import bcrypt from 'bcrypt'

import { userModel } from '#models'

const auth = async (email, pass) => {
  if (!email || !pass) throw new Error('All fields are required')

  const user = await userModel.findOne({ email })
  if (!user) throw new Error('Email or Password incorrect')

  const validPass = await bcrypt.compare(pass, user.password)
  if (!validPass) throw new Error('Email or Password incorrect')

  const token = await tkn.gen(user._id)

  const { password, ...userData } = user.toObject()

  return { token, user: userData }
}

export default auth
