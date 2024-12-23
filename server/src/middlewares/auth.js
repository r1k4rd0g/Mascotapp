// Imports
import { tkn } from '#utils'

const authMiddleware = async (rq, rs, nxt) => {
  const token = rq.headers['authorization']?.split(' ')[1]
  if (!token) {
    return rs
      .status(401)
      .send({ success: false, status: 401, message: 'Token not provided' })
  }
  const { isValid, data } = await tkn.valid(token)
  if (!isValid) {
    return rs
      .status(403)
      .send({ success: false, status: 403, message: 'Invalid token' })
  }
  rq.user = data
  nxt()
}

export default authMiddleware
