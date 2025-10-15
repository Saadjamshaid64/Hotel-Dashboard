import { useEffect, useState } from "react";
import {
  createMedicine,
  editMedicine,
  fetchMedicine,
  deleteMedicine,
} from "../lib/medicineConfigration.js";

export default function useMedicine() {
  const [medicine, setmedicine] = useState([]);

  useEffect(() => {
    fetchMedicineHook();
  }, []);

  //create medicine Hook
  const createMedicineHook = async (data) => {
    try {
      const result = await createMedicine(data);
      console.log("Medicine Added Successfully");
      fetchMedicineHook();
      return result;
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  // fetch medicine
  const fetchMedicineHook = async () => {
    try {
      const result = await fetchMedicine();
      console.log("Medicine fetched successfully in custom hook", result);
      setmedicine(result?.data?.data);
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  //edit medicine
  const editMedicineHook = async (id, data) => {
    try {
      const result = await editMedicine(id, data);
      console.log("Medicine updated successfully in custom hook");
      fetchMedicineHook();
      return result;
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  // delete medicine
  const deleteMedicinehook = async (id) => {
    try {
      const result = await deleteMedicine(id);
      console.log("Medicine deleted successfully in custom hook");
      fetchMedicineHook();
      return { success: true, message: result.data.message };
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  return {
    medicine,
    setmedicine,
    createMedicineHook,
    fetchMedicineHook,
    editMedicineHook,
    deleteMedicinehook,
  };
}
