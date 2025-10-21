import {createScheduleController, editScheduleController, deleteScheduleController, fetchScheduleController} from "../controllers/Schedule_Controllers.js"
import express from "express"

const router = express.Router()

router.get('/',fetchScheduleController)
router.post('/',createScheduleController)
router.put('/:id',editScheduleController)
router.delete('/:id',deleteScheduleController)

export default router