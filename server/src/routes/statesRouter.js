//Modules
import { Router } from "express";
import { statesController } from "../controllers/statesController.js";
//Variables
const router = Router ();

router.get('/', statesController.getAll);
router.post('/', statesController.createState);
router.put('/:id', statesController.update);


export default router;