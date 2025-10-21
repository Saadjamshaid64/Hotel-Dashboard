import { createScheduleService, editScheduleService, deleteScheduleService, fetchScheduleService } from "../services/Schedule_Services.js";

// create medicine
export const createScheduleController = async (req, res) => {
  try {
    const newUser = await createScheduleService(req.body);
    res.status(201).json({
      succes: true,
      message: "Schedule created successfully in Controller",
      data: newUser,
    });
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    // throw new Error("Something went wrong in Service" || error.message)
    res.status(500).json({
      success: false,
      message: "Schedule not created successfully in Controller",
      error,
    });
  }
};

//edit medicine
export const editScheduleController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await editScheduleService(id, req.body);

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found in Controller",
      });
    }
    res.status(200).json({
      success: true,
      message: "Schedule updated successfully in Controller",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Schedule not updated successfully in Controller",
      error,
    });
  }
};

// fetch medicine
export const fetchScheduleController = async (req,res) => {
  try {
    const fetchuser = await fetchScheduleService();
    res.status(200).json({
      success: true,
      message: "Schedule find successfully in Controller",
      data: fetchuser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Schedule not found in Controller",
      error,
    });
  }
};


//delete medicine
export const deleteScheduleController = async(req,res)=>{
    try {
        const {id} = req.params
        const deletedrow = await deleteScheduleService(id)
        if(deletedrow === 0)
        {
            return res.status(404).json({
                success: false,
                message: "Schedule not found in Controller"
            })
        }

        res.status(200).json({
            success: true,
            message: "Schedule deleted successfully in Controller"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Schedule not deleted successfully in Controller",
            error
        })
    }
}