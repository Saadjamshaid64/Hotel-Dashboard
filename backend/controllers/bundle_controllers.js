import {
  createbundleService,
  editbundleService,
  deletebundleService,
  fetchbundleService,
} from "../services/bundle_service.js";

// create bundle controller
export const createbundleController = async (req, res) => {
  try {
    const result = await createbundleService(req.body);
    res.status(201).json({
      success: true,
      message: "Bundle created successfully in Controller",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bundle not created successfully in Controller",
      error,
    });
  }
};

// edit bundle Service
export const editbundleController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await editbundleService(id, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Bundle not found in Controller",
      });
    }
    res.status(200).json({
      success: true,
      message: "Bundle edit successfully in Controller",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bundle not edit successfully in Controller",
      error,
    });
  }
};

// delete bundle Service
export const deletebundleController = async (req,res) => {
  try {
    const { id } = req.params;
    const result = await deletebundleService(id);
    if (result === 0) {
      return res.status(404).json({
        success: false,
        message: "Bundle not found in Controller",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bundle deleted successfully in Controller",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bundle not deleted successfully in Controller",
      error,
    });
  }
};

// fetch bundle Controller
export const fetchbundleController = async (req,res) => {
  try {
    const result = await fetchbundleService();
    res.status(200).json({
      success: true,
      message: "Bundle fetch successfully in Controller",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Bundle not fetch successfully in Controller",
      error,
    });
  }
};
