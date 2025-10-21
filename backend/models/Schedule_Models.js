import { sequelize } from "../database/supabaseClient.js";
import { DataTypes } from "sequelize";
import {Provider} from "./providerModels.js";
import {Patient} from "./Patient_Models.js"

export const Schedule = sequelize.define(
  "Schedule",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATEONLY
    },
    time:{
      type: DataTypes.STRING
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Patient,
        key: "id",
      },
    },
    providerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Provider,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "schedules",
  }
);

// patient relationship
Patient.hasMany(Schedule, {foreignKey: "patientId"})
Schedule.belongsTo(Patient, {foreignKey: "patientId"})

// provider relationship
Provider.hasMany(Schedule, {foreignKey: "providerId"})
Schedule.belongsTo(Provider, {foreignKey: "providerId"})

// sync db + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync({ alter: true });

//     console.log("✅ Database synced successfully.");

//     await Schedule.create({
//       date: "2025-10-05",
//       time: "8:00 AM",
//       patientId: "5e0a9847-eee0-41fe-b80b-eda8a41b9b2e",
//       providerId: "5f6c23fc-eddb-4093-a395-c7bd38a40a71"
//     });
//     console.log("✅ schedule Dummy data inserted successfully.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase()
