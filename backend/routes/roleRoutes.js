import express from "express";
import { createRoleController, editRoleController, deleteRoleController, fetchRoleController } from "../controllers/rolecontrollers.js";

const router = express.Router()

router.get('/',fetchRoleController)
router.post('/',createRoleController)
router.put('/:id',editRoleController)
router.delete('/:id',deleteRoleController)

export default router