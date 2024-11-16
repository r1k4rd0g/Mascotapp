import { Router } from 'express'

import { authController } from '#controllers'

const router = Router()

router.get('/', (rq, rs) => {
  rs.status(200).json({ data: 1 })
})
router.post('/login', authController)

export default router
