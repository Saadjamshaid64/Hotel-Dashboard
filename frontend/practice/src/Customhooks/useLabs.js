import { useEffect, useState } from "react";
import {
fetchLab, createLab, editLab, deleteLab
} from "../lib/labConfigration.js";

export default function roleRoles() {
  const [labs, setlabs] = useState([]);

  useEffect(() => {
    fetchLabs();
  }, []);


// fetch labs
  const fetchLabs = async () => {
    try {
      const result = await fetchLab();
      console.log("Lab fetched successfully in custom hook", result);
      setlabs(result?.data?.data || []);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  // create labs
  const addLabs = async (data) => {
    try {
      const result = await createLab(data);
      if (result?.data) {
        console.log("Lab created successfully in custom hook");
        fetchLabs();
        // setroles(prev => [...prev, result.data.data])
        return result
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  //edit labs
  const editLabs = async (id, data) => {
    try {
      const result = await editLab(id, data);
      console.log("Lab updated successfully in custom hook");
      fetchLabs();
      return result;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  //delete labs
  const removeLabs = async (id) => {
    try {
      const deletedrole = await deleteLab(id);
      console.log("Lab deleted successfully in custom hook");
      fetchLabs();
    //   return deletedrole
      return { success: true, message: deletedrole.data.message };
    } catch (error) {
      console.log("error", error);
       const message =
      error.response?.data?.message ||
      "Failed to delete role due to server error";
      return { success: false, message };
    }
  };

  return { labs, setlabs, fetchLabs, addLabs, editLabs, removeLabs };
}