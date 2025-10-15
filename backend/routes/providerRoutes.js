import express from "express";
import {createProvideController, deleteProviderController, editProviderController, fetchProviderController} from "../controllers/provider_controllers.js"

const router = express.Router()

router.get('/',fetchProviderController)
router.post('/',createProvideController)
router.put('/:id',editProviderController)
router.delete('/:id',deleteProviderController)

export default router