import { useEffect, useState } from "react";
import {
  createTask,
  editTask,
  fetchTasks,
  deleteTask,
} from "../lib/taskConfigration.js";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasksHook();
  }, []);

  //create task Hook
  const createTaskHook = async (data) => {
    try {
      const result = await createTask(data);
      console.log("Task Added Successfully");
      fetchTasksHook();
      return result;
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  // fetch tasks
  const fetchTasksHook = async () => {
    try {
      const result = await fetchTasks();
      console.log("Tasks fetched successfully in custom hook", result);
      setTasks(result?.data?.data);
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  //edit task
  const editTaskHook = async (id, data) => {
    try {
      const result = await editTask(id, data);
      console.log("Task updated successfully in custom hook");
      fetchTasksHook();
      return result;
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  // delete task
  const deleteTaskHook = async (id) => {
    try {
      const result = await deleteTask(id);
      console.log("Task deleted successfully in custom hook");
      fetchTasksHook();
      return { success: true, message: result.data.message };
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  return {
    tasks,
    setTasks,
    createTaskHook,
    editTaskHook,
    deleteTaskHook,
  };
}