// Modules
import { Router } from 'express'

const router = Router()

router.get('/', (rq, rs) => {
  rs.status(200).send({ data: "api index route" })
})

export default router
