import { createPatientController, editPatientController, deletePatientController, fetchPatientController } from "../controllers/Patient_Controllers.js";
import express from "express"

const router = express.Router()

router.get("/",fetchPatientController)
router.post("/",createPatientController)
router.put("/:id",editPatientController)
router.delete("/:id",deletePatientController)

export default router