import { where } from "sequelize";
import { Order } from "../models/Order_Models.js";

// create order
export const createOrderService = async (data) => {
  try {
    const result = await Order.create(data);
    console.log("Order added successfully in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// edit order
export const editOrderService = async (id, data) => {
  try {
    const user = await Order.findByPk(id);
    if (!user) {
      console.log("Order not found");
      return null;
    }
    const result = await user.update(data);
    console.log("Order updated in Service");
    return result;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// delete order
export const deleteOrderService = async (id) => {
  try {
    const deletedrow = await Order.destroy({ where: { id } });
    if (deletedrow === 0) {
      console.log("Order not found");
      return null;
    }
    console.log("Order deleted successfully in Service");
    return deletedrow;
  } catch (error) {
    console.log("Something went wrong in Service", error.message);
    throw new Error("Something went wrong in Service" || error.message);
  }
};

// fetch order
export const fetchOrderService = async () => {
  try {
    const result = await Order.findAll()
    console.log("Order fetched Successfully in Service")
    return result
  } catch (error) {
  console.log("Something went wrong in Service", error.message);
  throw new Error("Something went wrong in Service" || error.message);
  }
};
