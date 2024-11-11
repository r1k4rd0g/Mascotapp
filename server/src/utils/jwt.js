import jwt from 'jsonwebtoken'

const { SCRT_KEY } = process.env

if (!SCRT_KEY) {
  throw new Error(
    '> [App]  Error:The secret key is not provided in the environment variables'
  )
}

const tkn = {
  gen: (id, expiresIn = '7d') => {
    const token = jwt.sign({ uid: id }, SCRT_KEY, { expiresIn })
    return token
  },

  valid: token => {
    try {
      const decoded = jwt.verify(token, SCRT_KEY)
      return { isValid: true, data: decoded }
    } catch (err) {
      console.warn('Token invalid:', err.message)
      return { isValid: false, data: null }
    }
  },

  renew: token => {
    const { isValid, data } = tkn.valid(token)
    if (!isValid) return null
    return tkn.gen(data.uid)
  },
}

export default tkn
