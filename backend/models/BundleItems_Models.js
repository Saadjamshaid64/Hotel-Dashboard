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
    // medicineId: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model: Medicine,
    //     key: "id",
    //   },
    // },
    // labId: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model: Lab,
    //     key: "id",
    //   },
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
//       bundleId: "338fd8f1-9c93-4b74-8c50-7599000b8de4",
//       itemId: "0e3c99c1-8474-4668-839a-244b96c84cec",
//       itemType: "lab"
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
//     console.log("✅ Dummy user data inserted successfully.");
//   } catch (error) {
//     console.log("❌ Error syncing database:", error);
//   }
// };

// syncDatabase();
