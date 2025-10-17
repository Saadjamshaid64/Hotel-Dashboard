import { Model, where } from "sequelize";
import { Bundle } from "../models/bundle_Models.js";
import { BundleItems } from "../models/BundleItems_Models.js";
import { Medicine } from "../models/medicineModels.js";
import { Lab } from "../models/labModels.js";
import { sequelize } from "../database/supabaseClient.js";

// create bundle service
export const createbundleService = async (data) => {
  // try {
  //   const result = await Bundle.create(data);
  //   console.log("Bundle added successfully in Service");
  //   return result;
  // } catch (error) {
  //   console.log("Something went wrong in Service", error.message);
  //   throw new Error("Something went wrong in Service" || error.message);
  // }

  const transaction = await sequelize.transaction(); // start transaction
  try {
    // 1️⃣ Create the bundle first
    const bundle = await Bundle.create(
      {
        bundlename: data.bundlename,
        salesprice: data.salesprice,
        purchaseprice: data.purchaseprice,
        finalprice: data.finalprice,
      },
      { transaction }
    );

    // 2️⃣ Create bundle items
    const items = data.items.map((item) => ({
      bundleId: bundle.id, // reference to the created bundle
      itemId: item.id,
      itemType: item.itemType,
      // salesprice: item.salesprice,
      // purchaseprice: item.purchaseprice,
    }));

    await BundleItems.bulkCreate(items, { transaction });

    await transaction.commit(); // commit transaction
    console.log("Bundle and items added successfully in Service");
    return bundle;
  } catch (error) {
    await transaction.rollback(); // rollback if any error occurs
    console.log("Bundle not added in Service", error.message);
    throw new Error("Something went wrong in bundle service");
  }
};

// edit bundle service
export const editbundleService = async (id, data) => {
  const transaction = await sequelize.transaction(); // start transaction
  try {
    const bundle = await Bundle.findByPk(id);
    if (!bundle) {
      console.log("Bundle not found!");
      return null;
    }
    // update bundle
    await bundle.update(
      {
        bundlename: data.bundlename,
        salesprice: data.salesprice,
        purchaseprice: data.purchaseprice,
        finalprice: data.finalprice,
      },
      { transaction }
    );

    // 2️⃣ Remove old items
    await BundleItems.destroy({ where: { bundleId: id }, transaction });

    // 3️⃣ Insert new items
    const items = data.items.map((item) => ({
      bundleId: id,
      itemId: item.id,
      itemType: item.itemType,
    }));

    await BundleItems.bulkCreate(items, { transaction });

    await transaction.commit();

    console.log("Bundle updated in Service");
    return bundle;
  } catch (error) {
    await transaction.rollback();
    console.log("Bundle not updated successfully in Service");
    throw new Error("Something went wrong in bundle service");
  }
};

// delete bundle service
export const deletebundleService = async (id) => {
  try {
    const result = await Bundle.destroy({ where: { id } });
    // if (result === 0) {
    //   console.log("Bundle not found!");
    //   return null;
    // }
    if (!result) return null;
    console.log("Bundle and its items deleted successfully");
    return result;
    // console.log("Bundle deleted successfully in Service");
    // return result;
  } catch (error) {
    console.log("Bundle not deleted successfully in Service");
    throw new Error("Something went wrong in bundle service");
  }
};

// fetch bundle service
export const fetchbundleService = async () => {
  try {
    const result = await Bundle.findAll({
      include: [
        {
          model: BundleItems,
          include: [
            {
              model: Medicine,
              attributes: ["id", "medicinename", "salesprice", "purchaseprice"],
            },
            {
              model: Lab,
              attributes: ["id", "testname", "salesprice", "purchaseprice"],
            },
          ],
        },
      ],
    });

    // Manually attach Medicine/Lab details to each BundleItem
    for (const bundle of result) {
      for (const item of bundle.BundleItems) {
        if (item.itemType === "medicine") {
          const medicine = await Medicine.findByPk(item.itemId, {
            attributes: ["id", "medicinename", "salesprice", "purchaseprice"],
          });
          item.dataValues.Medicine = medicine;
        } else if (item.itemType === "lab") {
          const lab = await Lab.findByPk(item.itemId, {
            attributes: ["id", "testname", "salesprice", "purchaseprice"],
          });
          item.dataValues.Lab = lab;
        }
      }
    }

    console.log("Bundle fetched Successfully in Service");
    return result;
  } catch (error) {
    console.log("Bundle fetched successfully in Service");
    throw new Error("Something went wrong in bundle service");
  }
};
