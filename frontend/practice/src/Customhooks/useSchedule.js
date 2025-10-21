import { useEffect, useState } from "react";
import {createschedule, editschedule, deleteschedule, fetchschedule} from "../lib/ScheduleConfigration.js"

export default function useMedicine() {
  const [schedule,setschedule] = useState([]);

  useEffect(() => {
    fetchScheduleHook();
  }, []);

  //create medicine Hook
  const createScheduleHook = async (data) => {
    try {
      const result = await createschedule(data);
      console.log("Schedule Added Successfully");
      fetchScheduleHook();
      return result;
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  // fetch medicine
  const fetchScheduleHook = async () => {
    try {
      const result = await fetchschedule();
      console.log("Schedule fetched successfully in custom hook", result);
      setschedule(result?.data?.data);
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  //edit medicine
  const editScheduleHook = async (id, data) => {
    try {
      const result = await editschedule(id, data);
      console.log("Schedule updated successfully in custom hook");
      fetchScheduleHook();
      return result;
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  // delete medicine
  const deleteScheduleHook = async (id) => {
    try {
      const result = await deleteschedule(id);
      console.log("Schedule deleted successfully in custom hook");
      fetchScheduleHook();
      return { success: true, message: result.data.message };
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  return { schedule, setschedule, createScheduleHook, editScheduleHook, deleteScheduleHook };
}
