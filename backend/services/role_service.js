import { Role } from "../models/roleModels.js";


// create role
export const createRoleServices = async (data)=>{
    try {
        const result = await Role.create(data);
        console.log("User created successfully")
        return result
    } catch (error) {
        console.log("Error occur: ",error.message)
        throw error
    }
}

//edit role
export const editRoleServices  =async (id, data)=>{
try {
    
        const user = await Role.findByPk(id)
        if (!user)
            {
            console.log('User not found')
            return null
        };
        
        const result = await user.update(data)
        console.log('User updated successfully');
        return result
} catch (error) {
    console.log('Error occur', error.message);
    throw error
    
}   
}


//delete role
export const deleteRoleServices  =async (id)=>{
try {
    const deletedrole = await Role.destroy({where: {id}})
    if(deletedrole ===0)
    {
        console.log("User not found")
    }
    console.log('User deleted successfully')
    return deletedrole;
} catch (error) {
    console.log('Error occur in services', error.message);
    throw error
}
}


// read (fetch users)
export const readRoleServices= async ()=>{
    try {
        const result = await Role.findAll()
        console.log('User fetched successfully');
        return result
    } catch (error) {
        console.log("Error occur", error.message);
        throw error
    }
}