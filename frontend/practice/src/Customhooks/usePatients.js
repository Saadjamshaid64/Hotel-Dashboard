import {
  createPatient,
  editPatient,
  deletePatient,
  getPatient,
} from "../lib/PatientConfigration.js";
import { useState, useEffect } from "react";

export default function usePatient() {
  const [patients, setpatients] = useState([]);

  useEffect(() => {
    fetchPatientHook();
  }, []);

  //create patient hook
  const createPatientHook = async (data) => {
    try {
      const result = await createPatient(data);
      if (result?.data) {
        console.log("Patient added successfully");
        fetchPatientHook();
        return result;
      }
    } catch (error) {
      console.log("Patient not created in Controller", error.message);
      throw new Error("Patient not created in Controller", error.message);
    }
  };

  // edit patient hook
  const editPatientHook = async (id, data) => {
    try {
      const res = await editPatient(id, data);
      console.log("Patient edit successfully in Controller");
      fetchPatientHook();
      return res;
    } catch (error) {
      console.log("Patient not edited in Controller", error.message);
      throw new Error("Patient not edited in Controller", error.message);
    }
  };

  // delete patient hook
  const deletePatientHook = async (id) => {
    try {
      const res = await deletePatient(id);
      console.log("Patient deleted successfully in custom hook");
      fetchPatientHook();
      return res;
    } catch (error) {
      console.log("Patient not deleted in Controller", error.message);
      throw new Error("Patient not deleted in Controller", error.message);
    }
  };

  // fetch patient hook
  const fetchPatientHook = async () => {
    try {
      const res = await getPatient();
      console.log("Patient Fetched Successfully");
      setpatients(res?.data?.data);
    } catch (error) {
      console.log("Patient not fetch in Controller", error.message);
      throw new Error("Patient not fetch in Controller", error.message);
    }
  };

  return {
    createPatientHook,
    editPatientHook,
    deletePatientHook,
    patients,
    setpatients,
  };
}
