import { createTaskController, editTaskController, fetchTaskController, deleteTaskController } from "../controllers/task_controllers.js";
import express from "express"

const router = express.Router()

router.get('/', fetchTaskController)
router.post('/', createTaskController)
router.put('/:id', editTaskController)
router.delete('/:id', deleteTaskController)

export default router