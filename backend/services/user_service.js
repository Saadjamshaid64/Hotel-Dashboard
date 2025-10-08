











// // import {pool} from '../database/supabaseClient.js'



// // table check
// const tableCheck = async ()=>{
//     const query = `
//     CREATE TABLE IF NOT EXISTS users(
//     id SERIAL PRIMARY KEY,
//     firstname VARCHAR(255) NOT NULL,
//     lastname VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     role VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )`
//     const result = await pool.query(query)
//     if(result){
//           console.log("✅ Users table synced successfully");
//     }
// }

// // 2️⃣ Insert Fake Data to Test Connection
// export const insertFakeUser = async () => {
//   await syncUsersTable(); // ensure table exists

//   const fakeUser = {
//     firstname: "John",
//     lastname: "Doe",
//     email: "john@example.com",
//     role: "admin",
//     password: "mypassword",
//   };

//   const query = `
//     INSERT INTO users (firstname, lastname, email, role, password)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING *;
//   `;
//   const values = [fakeUser.firstname, fakeUser.lastname, fakeUser.email, fakeUser.role, fakeUser.password];

//   const { rows } = await pool.query(query, values);
//   console.log("✅ Fake user inserted:", rows[0]);
// };

// // Create User
// export const createUser = async (userdata)=>{
//     await tableCheck();
// try {
//     const {firstname, lastname, email, role, password} = userdata;
//     const query = `
//     INSERT INTO users(firstname, lastname, email ,role, password)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING *`;
    
//     const values = [firstname,lastname, email, role, password]
    
//     const {rows} = await pool.query(query, values)
//     return rows[0]
// } catch (error) {
//     console.log(error)
//     throw new Error(error.message)
// }
// }


// //Update User
// export const updateUser = async (id, userdata)=>{
// await tableCheck()
// try {
//     const {firstname, lastname, email, role, password} = userdata
//     const query = `
//     UPDATE users
//     SET firstname = $1, lastname = $2, email = $3, role = $4, password = $5,
//     updated_at = NOW()
//     WHERE id = $6
//     RETURNING *;
//     `

//     const values = [firstname, lastname, email, role, password, id]

//     const result = await pool.query(query, values)
//     return result.rows
    

// } catch (error) {
//     console.log(error)
//     throw new Error(error.message)
// }
// }


// // Delete User
// export const deleteuser = async(id)=>{  
//     await tableCheck()
//     try {
//         const query = `
//         DELETE FROM users WHERE id = $1
//         RETURNING *`

//         const {rows} = await pool.query(query, [id])
//         return rows[0]
//     } catch (error) {
//         console.log(error)
//         throw new Error(error.message)
//     }
// }


// // Fetch User
// export const fetchUser = async()=>{
//     await tableCheck()
//     const query  = `
//     SELECT * FROM users`
//     const {rows} = await pool.query(query)
//     return rows
// }

import {user as User} from "../models/userModels.js"

// create user
export const createUser = async (data)=>{
    try {
        const newUser = await User.create(data)
        console.log("✅ User created successfully:",newUser.toJSON())
        return newUser
    } catch (error) {
        console.log("Error: ",error)
        console.log("added user",[]);
        throw error
    }
}


// update user
export const updateUser = async (id, newdata)=>{
    try {
        const user = await User.findByPk(id)
        if(!user)
        {
            console.log("User not found");
            return null;
        }

        const editUser = await user.update(newdata)
        console.log("✅ User updated successfully.", editUser.toJSON())
        return editUser
    } catch (error) {
        console.log("uError: ",error)
        throw error
    }
}



// delete user
export const deleteUser  = async (id)=>{
    try {
        const deletedUser = await User.destroy({where: {id}})
        if (deletedUser === 0) console.log("⚠️ User not found")
        else console.log(console.log("✅ User deleted successfully"))
        return deletedUser
    } catch (error) {
        console.log("Error: ", error)
    }
}


// READ (fetch users)
export const fetchUser = async ()=>{
    try {
        const showUser = await User.findAll()
        // return showUser
        console.log("user fetched successfully from backend")
        return showUser.map(u => u.toJSON());   // convert Sequelize objects to plain JSON
    } catch (error) {
        console.log("Error: ",error.message)
        return [];
    }
}