import { useEffect, useState } from 'react';
import {getUsers, createUsers, updateUser, deleteUser} from '../lib/Configration.js'

export function useUsers(){

    const [users, setUsers] = useState([])

useEffect(()=>{
    fetchUsers();
},[])

// useEffect(()=>{
//     console.log("current users array:",users);
// },[users])

// fetch user
const fetchUsers = async ()=>{
    try {
        const result = await getUsers()
        console.log(result) // <--- check structure
        // console.log("API result: ", result)
        setUsers(result.data.data)
    } catch (error) {
        console.log("error", error)
}
}

// create user
const addUsers = async (data)=> {
    try {
        const result = await createUsers(data)
        // setUsers((prev) =>[...prev, result.data.data])
        await fetchUsers()
        return result
    } catch (error) {
        console.log("error", error)
        throw error.response?.data || error
    }
}

// update user
const editUser = async(id, data)=>{
    try {
        const result = await updateUser(id, data)
        await fetchUsers()
        return result        
    } catch (error) {
        console.log("error", error)
        throw error.response?.data || error
    }
}

// delete user
const removeUser = async (id)=>{
    try {
        const result = await deleteUser(id)
        return result
    } catch (error) {
        console.log("error", error)
    } 
}

return {users,setUsers, addUsers, editUser, removeUser}
}

// export UseUsers;