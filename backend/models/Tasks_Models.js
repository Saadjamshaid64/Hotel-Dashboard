import { sequelize } from "../database/supabaseClient.js";
import { DataTypes } from "sequelize";
import {user} from "./userModels.js"
import {Patient} from "./Patient_Models.js"

export const Tasks = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true, // This enables createdAt and updatedAt
    tableName: "tasks"
  }
);

// model relation
user.hasMany(Tasks, {foreignKey: "UserId"})
Tasks.belongsTo(user, {foreignKey: "UserId"})

// model relation
Patient.hasMany(Tasks, {foreignKey: "patientId"})
Tasks.belongsTo(Patient, {foreignKey: "patientId"})

// sync + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync();

//     // 'alter: true' adjusts columns if needed (safe) // 'force: true' would drop and recreate the table (dangerous!)
//     console.log("✅ Database synced successfully.");

//     await Tasks.create({
//         message: 'send message', UserId: '522349dc-2550-4068-b5dd-409b88560280', patientId: 'b720789e-4405-47c4-9548-99490f692f39', status: 'open'
//     })
//     console.log("✅ tasks user data inserted successfully.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase();