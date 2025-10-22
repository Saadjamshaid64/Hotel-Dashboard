import {
  createTaskService,
  editTaskService,
  deleteTaskService,
  fetchTaskService,
} from "../services/task_service.js";

// create task
export const createTaskController = async (req, res) => {
  try {
    const newTask = await createTaskService(req.body);
    res.status(201).json({
      success: true,
      message: "Task created successfully in Controller",
      data: newTask,
    });
  } catch (error) {
    console.log("Something went wrong in Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Task not created successfully in Controller",
      error,
    });
  }
};

//edit task
export const editTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTask = await editTaskService(id, req.body);

    if (!updateTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found in Controller",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task updated successfully in Controller",
      data: updateTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task not updated successfully in Controller",
      error,
    });
  }
};

// delete task
export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await deleteTaskService(id);

    if (deletedTask==0) {
      return res.status(404).json({
        success: false,
        message: "Task not found in Controller",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully in Controller",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Task not deleted successfully in Controller",
      error,
    });
  }
};

// fetch tasks
export const fetchTaskController = async (req, res) => {
  try {
    const tasks = await fetchTaskService();
    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully in Controller",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Tasks not fetched successfully in Controller",
      error,
    });
  }
};