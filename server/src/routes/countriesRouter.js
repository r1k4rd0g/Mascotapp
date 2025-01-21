// Modules
import { Router } from "express";
import { countriesController } from "../controllers/countriesController.js";
//Variables
const router = Router ();

router.get('/', countriesController.getAll);
router.get('/:id', countriesController.getById);
router.post('/', countriesController.createCountry);
router.put('/:id', countriesController.update)

export default router;