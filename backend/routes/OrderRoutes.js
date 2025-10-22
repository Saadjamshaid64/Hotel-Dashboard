import { createOrderController, editOrderController, deleteOrderController, fetchOrderController } from "../controllers/Order_Controllers.js"
import express from "express"

const router = express.Router()

router.get('/',fetchOrderController)
router.post('/',createOrderController)
router.put('/:id',editOrderController)
router.delete('/:id',deleteOrderController)

export default router