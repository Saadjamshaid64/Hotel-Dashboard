import { DataTypes } from "sequelize";
import { sequelize } from "../database/supabaseClient.js";
import { user } from "./userModels.js";

export const Provider = sequelize.define(
  "Provider",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    providername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    npinumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
    maximumpatients: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50,
    },
    statelicenses: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    currentpatients: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: user,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "providers",
  }
);

// define relation of user
user.hasOne(Provider, { foreignKey: "userId", onDelete: "CASCADE"});
Provider.belongsTo(user, { foreignKey: "userId"});

// sunc + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync();
//     console.log("✅ Database synced successfully.");

//     await Provider.create({
//       providername: "dr sam",
//       npinumber: 23,
//       phone: 45,
//       specialty: "dermatologist",
//       email: "drsam@example",
//       statelicenses: [
//         { state: "CA", licenseNumber: "CA12345", expirationDate: "2025-12-31" },
//         { state: "NY", licenseNumber: "NY98765", expirationDate: "2026-06-01" },
//       ],
//       userId: "85346096-050d-4a48-8875-71af90819110"
//     });
//     console.log("✅ provider Dummy data inserted successfully.")   
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase();
