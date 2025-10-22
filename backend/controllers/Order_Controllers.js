import { createOrderService, editOrderService, deleteOrderService, fetchOrderService } from "../services/Order_Service.js";

// create medicine
export const createOrderController = async (req, res) => {
  try {
    const newUser = await createOrderService(req.body);
    res.status(201).json({
      succes: true,
      message: "Order created successfully in Controller",
      data: newUser,
    });
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    // throw new Error("Something went wrong in Service" || error.message)
    res.status(500).json({
      success: false,
      message: "Order not created successfully in Controller",
      error,
    });
  }
};

//edit medicine
export const editOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await editOrderService(id, req.body);

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "Order not found in Controller",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order updated successfully in Controller",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order not updated successfully in Controller",
      error,
    });
  }
};

// fetch medicine
export const fetchOrderController = async (req,res) => {
  try {
    const fetchuser = await fetchOrderService();
    res.status(200).json({
      success: true,
      message: "Order find successfully in Controller",
      data: fetchuser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order not found in Controller",
      error,
    });
  }
};


//delete medicine
export const deleteOrderController = async(req,res)=>{
    try {
        const {id} = req.params
        const deletedrow = await deleteOrderService(id)
        if(deletedrow === 0)
        {
            return res.status(404).json({
                success: false,
                message: "Order not found in Controller"
            })
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully in Controller"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Order not deleted successfully in Controller",
            error
        })
    }
}