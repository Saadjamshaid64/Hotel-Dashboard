import { sequelize } from "../database/supabaseClient.js";
import { DataTypes } from "sequelize";

export const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    Medicines: {
      type: DataTypes.JSON
    },
    Finalprice:{
      type:DataTypes.STRING
    }
  },
  {
    timestamps: true,
    tableName: "orders",
  }
);


// sync + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync();

//     // 'alter: true' adjusts columns if needed (safe) // 'force: true' would drop and recreate the table (dangerous!)
//     console.log("✅ Database synced successfully.");

//     // Optional: Insert one dummy data to test connection
//     await Order.create({
//       Medicines: [{
//         name: "advantda", salesprice: 120, quantity: 2
//       }],
//       Finalprice: 120
//     });

//     console.log("✅ order data inserted successfully.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase();