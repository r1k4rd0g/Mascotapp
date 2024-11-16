import { mascotService } from '#services'

const Controller = {
  add: async (rq, rs) => {
    const { name, id } = rq.body

    if (!name || !id)
      return rs
        .status(400)
        .json({
          success: false,
          status: 400,
          message: 'Se requieren todos los campos',
        })

    const response = await mascotService.add(name, id)

    if (!response)
      return rs
        .status(500)
        .json({ success: false, status: 500, message: 'Ha ocurrido un error' })

    rs.status(200).json({
      success: true,
      status: 200,
      message: 'se agrego mascota',
    })
  },
}

export default Controller
