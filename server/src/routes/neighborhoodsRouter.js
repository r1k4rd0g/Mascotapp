//Modules
import { Router } from "express";
import { neighborhoodsController } from "../controllers/neighborhoodsController.js";
//Variables
const router = Router ();

router.get('/', neighborhoodsController.getAll);
router.post('/', neighborhoodsController.createNeighborhood);
router.put('/:id', neighborhoodsController.update);

export default router;