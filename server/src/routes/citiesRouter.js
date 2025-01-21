//Modules
import { Router } from "express";
import { citiesController } from "../controllers/citiesController.js";
//Variables
const router = Router ();

router.get('/', citiesController.getAll);
router.post('/', citiesController.createCity);
router.put('/:id', citiesController.update);

export default router;