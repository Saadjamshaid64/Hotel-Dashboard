import { DataTypes } from "sequelize";
import { sequelize } from "../database/supabaseClient.js";

export const Lab = sequelize.define(
  "Lab",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    testname: {
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
    tableName: "labs",
  }
);

// sync + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync();

//     await Lab.create({
//       testname: "Complete Blood Count",
//       purchaseprice: 30,
//       salesprice: 50,
//     });
//     console.log("✅ provider Dummy data inserted successfully.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase();
