import { sequelize } from "../database/supabaseClient.js";
import { DataTypes } from "sequelize";
import { Role } from "./roleModels.js";
// import dotenv from 'dotenv';
// dotenv.config();

export const user = sequelize.define(
  "User",
  {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4, // auto-generate UUID v4
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    tableName: "users", // optional — fixes table name
  }
);

//define relation
Role.hasMany(user, { foreignKey: "roleId", onDelete: "RESTRICT", onUpdate: "CASCADE"});
user.belongsTo(Role, { foreignKey: "roleId" });

// // sync + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync();

//     // 'alter: true' adjusts columns if needed (safe) // 'force: true' would drop and recreate the table (dangerous!)
//     console.log("✅ Database synced successfully.");

//     // Optional: Insert one dummy data to test connection
//     await user.create({
//         firstname: 'John', lastname: 'Doe', email: 'john@example.com', roleId: '94349c7e-2734-499c-9121-2d33319cf150', password: '123456',
//     })

//     // Optional: Insert multiple dummy data to test connection
//     // await user.bulkCreate([
//     //     {firstname: "John",
//     //     lastname: "Doe",
//     //     email: "john@example.com",
//     //     roleId: "00b9c9e1-74e4-494f-b0a0-9b2f92ec9283",
//     //     password: "123456"},
//     //     {firstname: "adam",
//     //     lastname: "lee",
//     //     email: "adam@exa909mple.com",
//     //     roleId: "18557561-b6c0-4030-a620-01337fa4f17e",
//     //     password: "11223344"}
//     // ]);
//     console.log("✅ Dummy user data inserted successfully.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase();
