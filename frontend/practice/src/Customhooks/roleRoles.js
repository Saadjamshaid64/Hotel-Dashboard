import { useEffect, useState } from 'react'
import {createRoles, updateRoles, deleteRoles, getRoles} from '../lib/roleConfigration.js'

export default function roleRoles(){
    const [roles, setroles] = useState([])

    useEffect(()=>{
        fetchRoles();
    },[])

    const fetchRoles = async()=>{
        try {
            const result = await getRoles()
            console.log('User fetched successfully in custom hook', result);
            setroles(result?.data?.data)
        } catch (error) {
            console.log('error', error);
            throw error
        }
    }

    // create roles
    const addRoles = async (data)=>{
        try {
            const result = await createRoles(data)
            if(result?.data)
            {
                console.log('User created successfully in custom hook');
                fetchRoles()
            }
        } catch (error) {
            console.log("error", error)
            throw error
        }
    }

    //edit roles
    const editRoles = async (id, data)=>{
        try {
            const result = await updateRoles(id, data)
            console.log('User updated successfully in custom hook');
            fetchRoles()
            return result
        } catch (error) {
            console.log('error', error);
            throw error
        }
    }

    //delete roles
    const removeRoles = async (id) =>{
        try {
            const deletedrole = await deleteRoles(id)
                console.log('user deleted successfully in custom hook');
                fetchRoles()
                return deletedrole
        } catch (error) {
            console.log('error', error);
            throw error
        }
    }

    return {roles, setroles, fetchRoles, addRoles, editRoles, removeRoles}
}

// export default roleRoles