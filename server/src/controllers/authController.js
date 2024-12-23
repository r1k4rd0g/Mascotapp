import { auth } from '#services'

const Controller = async (rq, rs) => {
  try {
    const { email, password: pass } = rq.body
    const { token, user } = await auth(email, pass)

    rs.status(200).json({
      success: true,
      status: 200,
      token: token,
      user: user,
      message: 'Logged successfully',
    })
  } catch (error) {
    rs.status(500).json({ success: false, status: 500, message: error.message })
  }
}

export default Controller
