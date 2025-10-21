import {sequelize} from "../database/supabaseClient.js";
import { DataTypes, UUID } from "sequelize";
import {user} from "./userModels.js"

export const Patient = sequelize.define(
  "Patient",
  {
    id: {
      type: UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    First_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Last_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },
    Street_Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: user,
        key: "id"
      }
    }
  },
  { timestamps: true, tableName: "patients" }
);


user.hasOne(Patient, {foreignKey: "UserId", onUpdate: "CASCADE", })
Patient.belongsTo(user, {foreignKey: "UserId", onDelete: "CASCADE"})

// // sync + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync();

//     await Patient.create({
//       First_Name: "ali",
//       Last_Name: "Ahmed",
//       Email: "new@gmail.com",
//       Phone: 123456,
//       DOB: "2025-10-20",
//       Gender: "Male",
//       Street_Address: "Johar Town Lahore",
//       City: "Lahore",
//       State: "Punjab",
//       UserId: "53c8bbaa-6edd-47ff-a782-428e9c6e2e5b"
//     });

//     console.log("✅ patient Dummy data inserted successfully.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase()
