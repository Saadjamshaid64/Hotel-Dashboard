import {
  createPatientService,
  editPatientService,
  deletePatientService,
  fetchPatientService,
} from "../services/Patient_Services.js";

// create patient controller
export const createPatientController = async (req, res) => {
  try {
    const result = await createPatientService(req.body);
    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: result,
    });
  } catch (error) {
    console.log("Something wrong in controller", error.message);
    res.status(500).json({
      success: false,
      message: "Patient not created successfully",
      error,
    });
  }
};

// edit patient controller
export const editPatientController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await editPatientService(id, req.body);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Patient not found in Controller",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully in Controller",
      data: result,
    });
  } catch (error) {
    console.log("Something wrong in controller", error.message);
    res.status(500).json({
      success: false,
      message: "Patient not updated successfully",
      error,
    });
  }
};

// delete patient controller
export const deletePatientController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletePatientService(id);
    if (result === 0) {
      return res.status(404).json({
        success: false,
        message: "Patient not found in Controller",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully in Controller",
    });
  } catch (error) {
    console.log("Something wrong in controller", error.message);
    res.status(500).json({
      success: false,
      message: "Patient not deleted successfully",
      error,
    });
  }
};

// fetch patient controller
export const fetchPatientController = async (req, res) => {
  try {
    const result = await fetchPatientService();
    res.status(200).json({
      success: true,
      message: "Patient fetched successfully in Controller",
      data: result,
    });
  } catch (error) {
    console.log("Something wrong in controller", error.message);
    res.status(500).json({
      success: false,
      message: "Patient not fetched successfully",
      error,
    });
  }
};
