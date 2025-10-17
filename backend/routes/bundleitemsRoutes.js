import express from "express"
import { createbundleitemsController, editbundleitemsController, deletbundleitemsController, fetchbundleitemsController } from "../controllers/bundleitems_controller.js"

const router = express.Router()

router.post("/",createbundleitemsController)
router.get("/",fetchbundleitemsController)
router.put("/",editbundleitemsController)
router.delete("/",deletbundleitemsController)

export default router