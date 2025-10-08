import express from 'express'
import { createUserController, deleteUserController, fetchUserController, updateUserController } from '../controllers/userControllers.js'

const router = express.Router()
    
    router.get('/',fetchUserController)
    router.post('/',createUserController)
    router.put('/:id',updateUserController)
    router.delete('/:id',deleteUserController)
    
export default router
