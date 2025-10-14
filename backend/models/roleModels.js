import { DataTypes } from "sequelize";
import { sequelize } from "../database/supabaseClient.js";

export const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4, // auto-generate UUID v4
      primaryKey: true,
    },
    rolename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
//     console.log("✅ role Dummy data inserted successfully.")
// } catch (error) {
//     console.log('❌ Error syncing database:', error)
// }
// }

// syncDatabase()
