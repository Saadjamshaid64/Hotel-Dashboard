import { where } from "sequelize";
import { Tasks } from "../models/Tasks_Models.js";
import {user} from "../models/userModels.js"
import { Patient } from "../models/Patient_Models.js";

// create task
export const createTaskService = async (data) => {
  try {
    const result = await Tasks.create(data);
    console.log("Task added successfully in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// edit task
export const editTaskService = async (id, data) => {
  try {
    const task = await Tasks.findByPk(id);
    if (!task) {
      console.log("Task not found");
      return null;
    }
    const result = await task.update(data);
    console.log("Task updated in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// delete task
export const deleteTaskService = async (id) => {
  try {
    const deletedrow = await Tasks.destroy({ where: { id } });
    if (deletedrow === 0) {
      console.log("Task not found");
      return null;
    }
    console.log("Task deleted successfully in Service");
    return deletedrow;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// fetch tasks
export const fetchTaskService = async () => {
  try {
    const result = await Tasks.findAll({
        include: [
            {
                model: user,
                attributes: ["id","firstname","lastname"]
            },
            {
                model: Patient,
                attributes: ["id","First_Name", "Last_Name"],
                required: false
            }
        ]
    })
    console.log("Tasks fetched Successfully in Service")
    return result
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};