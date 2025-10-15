import { createLabController, editLabController, fetchLabController, deleteLabController } from "../controllers/lab_controllers.js";
import express from "express"

const router = express.Router()

router.get('/',fetchLabController)
router.post('/',createLabController)
router.put('/:id',editLabController)
router.delete('/:id',deleteLabController)

export default router