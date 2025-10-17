import { BundleItems } from "../models/BundleItems_Models.js";
import { where } from "sequelize";

// Create bundleitems service
export const createbundleitemsService = async (items) => {
  try {
    const result = await BundleItems.create(items);
    console.log("Bundle items added successfully in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in BundleItems Service", error.message);
    throw new Error("Something went wrong in BundleItems Service" || error.message);
  }
};

// edit bundleitem service
export const editbundleitemService = async (id, data) => {
  try {
    const item = await BundleItems.findByPk(id);
    if (!item) {
      console.log("Bundle item not found!");
      return null;
    }
    const result = await item.update(data);
    console.log("Bundle item updated in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in BundleItems Service", error.message);
    throw new Error(error.message);
  }
};

// delete bundleitem service
export const deletebundleitemService = async (id) => {
  try {
    const result = await BundleItems.destroy({ where: { id } });
    if (result === 0) {
      console.log("Bundle item not found!");
      return null;
    }
    console.log("Bundle item deleted successfully in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in BundleItems Service", error.message);
    throw new Error(error.message);
  }
};

// fetch bundleitem service
export const fetchbundleitemsService = async () => {
  try {
    const result = await BundleItems.findAll();
    console.log("Bundle items fetched successfully");
    return result;
  } catch (error) {
    console.log("Something went wrong in fetching BundleItems", error.message);
    throw new Error(error.message);
  }
};
