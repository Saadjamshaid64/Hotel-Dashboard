import {
  createMedicineService,
  editMedicineService,
  deleteMedicineService,
  fetchMedicineService,
} from "../services/medicine_service.js";

// create medicine
export const createMedicineController = async (req, res) => {
  try {
    const newUser = await createMedicineService(req.body);
    res.status(201).json({
      succes: true,
      message: "Medicine created successfully in Controller",
      data: newUser,
    });
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    // throw new Error("Something went wrong in Service" || error.message)
    res.status(500).json({
      success: false,
      message: "Medicine not created successfully in Controller",
      error,
    });
  }
};

//edit medicine
export const editMedicineController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await editMedicineService(id, req.body);

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found in Controller",
      });
    }
    res.status(200).json({
      success: true,
      message: "Medicine updated successfully in Controller",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Medicine not updated successfully in Controller",
      error,
    });
  }
};

// fetch medicine
export const fetchMedicineController = async (req,res) => {
  try {
    const fetchuser = await fetchMedicineService();
    res.status(200).json({
      success: true,
      message: "Medicine find successfully in Controller",
      data: fetchuser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Medicine not found in Controller",
      error,
    });
  }
};


//delete medicine
export const deleteMedicineController = async(req,res)=>{
    try {
        const {id} = req.params
        const deletedrow = await deleteMedicineService(id)
        if(deletedrow === 0)
        {
            return res.status(404).json({
                success: false,
                message: "Medicine not found in Controller"
            })
        }

        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully in Controller"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Medicine not deleted successfully in Controller",
            error
        })
    }
}