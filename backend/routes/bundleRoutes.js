import express from "express"
import { createbundleController, editbundleController, deletebundleController, fetchbundleController } from "../controllers/bundle_controllers.js"

const router = express.Router()

router.post("/",createbundleController)
router.get("/",fetchbundleController)
router.put("/:id",editbundleController)
router.delete("/:id",deletebundleController)

export default router