














import {createUser, deleteUser, fetchUser, updateUser} from "../services/user_service.js"


// create User
export const createUserController = async (req, res) => {
    try {
        const newUser = await createUser(req.body)
        res.status(201).json({
            success: true,
            message: "user created successfully, Congratulations",
            data: newUser
        })
    } catch (error) {
        if(error.name === "SequelizeUniqueConstraintError")
        {
            return res.status(400).json({
                success: false,
                message: "User already exists",
                field: "email",
            })
        }
            res.status(500).json({
            success: false,
            message: "User not created successfully",
            error: error
        })
    }
}


// update user
export const updateUserController = async (req,res)=>{
    try {
        const {id} = req.params

        const updateduser = await updateUser(id, req.body)
        if(!updateduser )
        {
            createUser.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "User successfully updated",
            data: updateduser
        })
    } catch (error) {
        if(error.name === "SequelizeUniqueConstraintError")
        {
            res.status(400).json({
                success: false,
                message: "Email already Exists",
                field: "email"
        })
        }
        res.status(500).json({
            success: false,
            message: "User not updated successfully",
            error: error
        })
    }
}


//delete user
export const deleteUserController = async (req, res)=>{
try {
    const {id} = req.params
    const deleteduser = await deleteUser(id)
    if(deleteduser ==0)
    {
        res.status(404).json({
            success: false,
            message: "User not found",
        })
    }
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    })

} catch (error) {
    res.status(500).json({
        success: false,
        message: "User not deleted successfully",
        error: error
    })
}
}


// fetch user
export const fetchUserController = async (req,res)=>{
    try {
        const fetcheduser = await fetchUser();
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: fetcheduser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User not fetched successfully",
            error: error
        })
    }
}