import { sequelize } from "../database/supabaseClient.js";
import { DataTypes } from "sequelize";
import { Role } from "./roleModels.js";
// import dotenv from 'dotenv';
// dotenv.config();

export const user = sequelize.define(
  "User",
  {
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
      type: DataTypes.INTEGER,
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
Role.hasMany(user, { foreignKey: "roleId" });
user.belongsTo(Role, { foreignKey: "roleId" });

// // sync + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync();

//     // 'alter: true' adjusts columns if needed (safe) // 'force: true' would drop and recreate the table (dangerous!)
//     console.log("✅ Database synced successfully.");

//     // Optional: Insert one dummy data to test connection
//     // await user.create({
//     //     firstname: 'John', lastname: 'Doe', email: 'john@example.com', role: 'admin', password: '123456',
//     //     firstname: 'aaatrtr', lastname: 'Doe', email: 'john@exa909mple.com', role: 'admin', password: '123456',
//     // })

//     // Optional: Insert multiple dummy data to test connection
//     // await user.bulkCreate([
//     //     {firstname: "John",
//     //     lastname: "Doe",
//     //     email: "john@example.com",
//     //     roleId: 1,
//     //     password: "123456"},
//     //     {firstname: "adam",
//     //     lastname: "lee",
//     //     email: "adam@exa909mple.com",
//     //     roleId: 2,
//     //     password: "11223344"}
//     // ]);
//     console.log("✅ Dummy data inserted successfully.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase();
