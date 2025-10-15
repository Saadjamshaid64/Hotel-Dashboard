import { where } from "sequelize";
import { Lab } from "../models/labModels.js";

// create medicine
export const createLabService = async (data) => {
  try {
    const result = await Lab.create(data);
    console.log("User added successfully in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// edit medicine
export const editLabService = async (id, data) => {
  try {
    const user = await Lab.findByPk(id);
    if (!user) {
      console.log("User not found");
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
export const deleteLabService = async (id) => {
  try {
    const deletedrow = await Lab.destroy({ where: { id } });
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
export const fetchLabService = async () => {
  try {
    const result = await Lab.findAll()
    console.log("User fetched Successfully in Service")
    return result
  } catch (error) {
  console.log("Something went wrong in Service", error.message);
  throw new Error("Something went wrong in Service" || error.message);
  }
};
