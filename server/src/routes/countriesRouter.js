// Modules
import { Router } from "express";
import { countriesController } from "../controllers/countriesController.js";
//Variables
const router = Router ();

router.get('/', countriesController.getAll);
router.post('/', countriesController.countryCreate);
router.put('/:id', countriesController.update)

export default router;