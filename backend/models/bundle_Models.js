import { DataTypes } from "sequelize";
import { sequelize } from "../database/supabaseClient.js";

export const Bundle = sequelize.define(
  "Bundle",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    bundlename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salesprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    purchaseprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    finalprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "bundles" }
);

// // sync + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync({force: true});

//     await Bundle.create({
//     bundlename: "temp",
//     salesprice: 10,
//     purchaseprice: 5,
//     finalprice: 8
//     })

//     console.log("✅ provider Dummy data inserted successfully in bundle.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase()
