import {
  createLabService,
  editLabService,
  fetchLabService,
  deleteLabService,
} from "../services/lab_service.js";

// create medicine
export const createLabController = async (req, res) => {
  try {
    const newUser = await createLabService(req.body);
    res.status(201).json({
      succes: true,
      message: "Lab created successfully in Controller",
      data: newUser,
    });
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    // throw new Error("Something went wrong in Service" || error.message)
    res.status(500).json({
      success: false,
      message: "Lab not created successfully in Controller",
      error,
    });
  }
};

//edit medicine
export const editLabController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await editLabService(id, req.body);

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "Lab not found in Controller",
      });
    }
    res.status(200).json({
      success: true,
      message: "Lab updated successfully in Controller",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lab not updated successfully in Controller",
      error,
    });
  }
};

// fetch medicine
export const fetchLabController = async (req, res) => {
  try {
    const fetchuser = await fetchLabService();
    res.status(200).json({
      success: true,
      message: "Lab find successfully in Controller",
      data: fetchuser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lab not found in Controller",
      error,
    });
  }
};

//delete medicine
export const deleteLabController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedrow = await deleteLabService(id);
    if (deletedrow === 0) {
      return res.status(404).json({
        success: false,
        message: "Lab not found in Controller",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lab deleted successfully in Controller",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lab not deleted successfully in Controller",
      error,
    });
  }
};
