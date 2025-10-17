import { DataTypes } from "sequelize";
import { sequelize } from "../database/supabaseClient.js";

export const Medicine = sequelize.define(
  "Medicine",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    medicinename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchaseprice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salesprice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "medicines",
  }
);

// sync + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync();
//     console.log("✅ Database synced successfully.");

//     await Medicine.create({
//       medicinename: "brufen",
//       type: "oral",
//       dosage: "100ml",
//       frequency: "Daily",
//       purchaseprice: 12,
//       salesprice: 30
//     });

//     console.log("✅ provider Dummy data inserted successfully.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase()
