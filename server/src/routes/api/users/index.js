// Modules
import { Router } from 'express'

// Imports
import { auth } from '#middlewares'
import { userController } from '#controllers'

// Variables
const router = Router()

// Middlewares
router.use(auth)

// Methods
router.get('/', userController.all)
router.post('/', userController.add)
router.get('/:id', userController.byId)
router.put('/:id', userController.update)

export default router
