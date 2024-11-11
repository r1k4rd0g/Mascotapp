// Modules
import { Router } from 'express'

const router = Router()

router.get('/', (rq, rs) => {
  rs.status(200).send({ data: 1 })
})

export default router
