// Modules
import { Router } from "express";
import { countriesController } from "../controllers/countriesController.js";
//Variables
const router = Router ();

router.get('/allCountries', countriesController.getAll)

export default router;