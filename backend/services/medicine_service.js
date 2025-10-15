import { where } from "sequelize";
import { Medicine } from "../models/medicineModels.js";

// create medicine
export const createMedicineService = async (data) => {
  try {
    const result = await Medicine.create(data);
    console.log("User added successfully in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// edit medicine
export const editMedicineService = async (id, data) => {
  try {
    const user = await Medicine.findByPk(id);
    if (!user) {
      console.log("USer not found");
      return null;
    }
    const result = await user.update(data);
    console.log("User updated in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// delete medicine
export const deleteMedicineService = async (id) => {
  try {
    const deletedrow = await Medicine.destroy({ where: { id } });
    if (deletedrow === 0) {
      console.log("User not found");
      return null;
    }
    console.log("User deleted successfully in Service");
    return deletedrow;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// fetch medicine
export const fetchMedicineService = async () => {
  try {
    const result = await Medicine.findAll()
    console.log("User fetched Successfully in Service")
    return result
  } catch (error) {
  console.log("Something went wrong in Service", error.message);
  throw new Error("Something went wrong in Service" || error.message);
  }
};
