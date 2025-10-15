import { createMedicineController, editMedicineController, fetchMedicineController, deleteMedicineController } from "../controllers/medicine_controllers.js";
import express from "express"

const router = express.Router()

router.get('/',fetchMedicineController)
router.post('/',createMedicineController)
router.put('/:id',editMedicineController)
router.delete('/:id',deleteMedicineController)

export default router