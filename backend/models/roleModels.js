import { DataTypes } from "sequelize";
import { sequelize } from "../database/supabaseClient.js";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export const Role = sequelize.define(
  "Role",
  {
    rolename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roletemplate: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, tableName: "roles" }
);

// sync db + dummy data

// const syncDatabase = async () =>{
// try {
//     await sequelize.sync()

//     console.log('✅ Database synced successfully.')

//     await Role.create({
//         rolename: 'admin',
//         // roletemplate: 'custom no template',
//     })
//     console.log("✅ Dummy data inserted successfully.")
// } catch (error) {
//     console.log('❌ Error syncing database:', error)
// }
// }

// syncDatabase()