import { DataTypes } from "sequelize";
import { sequelize } from "../database/supabaseClient.js";
import { Bundle } from "./bundle_Models.js";
import { Medicine } from "./medicineModels.js";
import { Lab } from "./labModels.js";

export const BundleItems = sequelize.define(
  "BundleItems",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    bundleId: {
      allowNull: true,
      type: DataTypes.UUID,
      references: {
        model: Bundle,
        key: "id",
      },
      onDelete: 'CASCADE'
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    itemType: {
      type: DataTypes.ENUM("medicine", "lab"), // add more later if needed
      allowNull: true,
    },
  },
  { timestamps: true, tableName: "bundleitems" }
);

Bundle.hasMany(BundleItems, { foreignKey: "bundleId", onDelete: "CASCADE" });
BundleItems.belongsTo(Bundle, { foreignKey: "bundleId" });

Medicine.hasMany(BundleItems, { foreignKey: "medicineId" });
BundleItems.belongsTo(Medicine, { foreignKey: "medicineId" });

Lab.hasMany(BundleItems, { foreignKey: "labId" });
BundleItems.belongsTo(Lab, { foreignKey: "labId" });

// sync + dummy data
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync({alter: true});

//     // 'alter: true' adjusts columns if needed (safe) // 'force: true' would drop and recreate the table (dangerous!)
//     console.log("✅ Database synced successfully.");

//     // Optional: Insert one dummy data to test connection
//     await BundleItems.create({
//       bundleId: "04a4fce5-9693-462f-9569-fc32f8d41c1b",
//       itemId: "b35766c3-53da-4aae-bdba-57517499c794",
//       itemType: "medicine"
//     });

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
//     console.log("✅ Dummy bundle item data inserted successfully.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase();
