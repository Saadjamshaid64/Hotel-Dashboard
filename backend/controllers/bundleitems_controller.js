import {
  createbundleitemsService,
  editbundleitemService,
  deletebundleitemService,
  fetchbundleitemsService,
} from "../services/bundleItems_service.js";

// create bundle controller
export const createbundleitemsController = async (req, res) => {
  try {
    const result = await createbundleitemsService(req.body);
    res.status(201).json({
      success: true,
      message: "BundleItems created successfully in Controller",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "BundleItems not created successfully in Controller",
      error,
    });
  }
};

// edit bundle Service
export const editbundleitemsController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await editbundleitemService(id, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "BundleItems not found in Controller",
      });
    }
    res.status(200).json({
      success: true,
      message: "BundleItems updated successfully in Controller",
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
export const deletbundleitemsController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deletebundleitemService(id);
    if (result === 0) {
      return res.status(404).json({
        success: false,
        message: "BundleItems not found in Controller",
      });
    }

    res.status(200).json({
      success: true,
      message: "BundleItems deleted successfully in Controller",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "BundleItems not edit successfully in Controller",
      error,
    });
  }
};

// fetch bundle Controller
export const fetchbundleitemsController = async (req, res) => {
  try {
    const result = await fetchbundleitemsService();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Bundle item not found in Controller",
      });
    }
    res.status(200).json({
      success: true,
      message: "BundleItems fetch successfully in Controller",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "BundleItems not fetch successfully in Controller",
      error,
    });
  }
};
