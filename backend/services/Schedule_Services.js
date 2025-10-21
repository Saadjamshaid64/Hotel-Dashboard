import { where } from "sequelize";
import { Schedule } from "../models/Schedule_Models.js";

// create medicine
export const createScheduleService = async (data) => {
  try {
    const {date,
      time,
      patientId,
      providerId} = data

      console.log("error", {
      date,
      time,
      patientId,
      providerId,
    });

    const result = await Schedule.create(data);
    console.log("Schedule added successfully in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// edit medicine
export const editScheduleService = async (id, data) => {
  try {
    const user = await Schedule.findByPk(id);
    if (!user) {
      console.log("Schedule not found");
      return null;
    }
    const result = await user.update(data);
    console.log("Schedule updated in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// delete medicine
export const deleteScheduleService = async (id) => {
  try {
    const deletedrow = await Schedule.destroy({ where: { id } });
    if (deletedrow === 0) {
      console.log("Schedule not found");
      return null;
    }
    console.log("Schedule deleted successfully in Service");
    return deletedrow;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// fetch medicine
export const fetchScheduleService = async () => {
  try {
    const result = await Schedule.findAll();
    console.log("Schedule fetched Successfully in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};
