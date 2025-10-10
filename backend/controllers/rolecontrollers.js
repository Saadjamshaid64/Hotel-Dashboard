import {createRoleServices, editRoleServices, readRoleServices, deleteRoleServices} from "../services/role_service.js";

// create role
export const createRoleController = async (req, res) => {
    try {
        const newRole = await createRoleServices(req.body)
        res.status(201).json({
            success: true,
            message: "User added Successfully",
            data: newRole
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role not added successfully",
            error
        })
    }
}


//edit role
export const editRoleController = async (req, res) => {
    try {
        const {id} = req.params
        const editRole = await editRoleServices(id, req.body)

        if(!editRole){
           res.status(404).json({
            success: false,
            message: "User not found"
           })
        }

        res.status(200).json({
            success: true,
            message: "Role updated successfully",
            data: editRole
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role not updated successfully",
            error
        })
    }
}



// delete role
export const deleteRoleController = async (req,res) =>{
    try {
        const {id} = req.params
        const deletedRole = await deleteRoleServices(id)
        if(!deletedRole===0){
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Role deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role not deleted successfully",
            error
        })
    }
}


//fetch role
export const fetchRoleController = async (req,res) =>{
    try {
        const fetchedRole = await readRoleServices()
        res.status(200).json({
            success: true,
            message: "Role fetched successfully",
            data: fetchedRole
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role not fetched successfully",
            error
        })
    }
}