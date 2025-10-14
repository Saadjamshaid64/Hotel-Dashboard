import {
  createProviderService,
  editProviderService,
  deleteProviderService,
  fetchProviderService,
} from "../services/provider_service.js";

// create Provider
export const createProvideController = async (req, res) => {
  try {
    const newProvider = await createProviderService(req.body);
    res.status(201).json({
      success: true,
      message: "Provider created Successfully in controller",
      data: newProvider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Provider not created successfully in controller",
      error,
    });
  }
};

// edit Provider
export const editProviderController = async (req, res) => {
  try {
    const { id } = req.params;
    const editProvider = await editProviderService(id, req.body);
    if (!editProvider) {
      res.status(404).json({
        success: false,
        message: "Provider not found in controller",
      });
    }
    res.status(200).json({
      success: true,
      message: "Provider updated successfully in controller",
      data: editProvider,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Provider not updated successfully in controller",
      error,
    });
  }
};

// delete Provider
export const deleteProviderController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProvider = await deleteProviderService(id);
    if (!deleteProvider.success) {
      return res.status(404).json({
        success: false,
        message: "Provider not found in controller",
      });
    }
    res.status(200).json({
      success: true,
      message: "Provider deleted successfully in controller",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Provider not deleted successfully in controller",
      error,
    });
  }
};

// fetch Provider
export const fetchProviderController = async (req, res) => {
  try {
    const result = await fetchProviderService();
    res.status(200).json({
      success: true,
      message: "Provider fetched successfully in controller",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Provider not fetched successfully in controller",
      error,
    });
  }
};
