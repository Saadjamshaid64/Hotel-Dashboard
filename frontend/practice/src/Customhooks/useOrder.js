import { useEffect, useState } from "react";
import {createOrder, editOrder, deleteOrder, fetchOrder} from "../lib/OrderConfigration.js"

export default function useMedicine() {
  const [order, setorder] = useState([]);

  useEffect(() => {
    fetchOrderHook();
  }, []);

  //create order
  const createOrderHook = async (data) => {
    try {
      const result = await createOrder(data);
      console.log("Medicine Added Successfully");
      fetchOrderHook();
      return result;
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  // fetch order
  const fetchOrderHook = async () => {
    try {
      const result = await fetchOrder();
      console.log("Medicine fetched successfully in custom hook", result);
      setorder(result?.data?.data);
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  // edit order
  const editOrderHook = async (id, data) => {
    try {
      const result = await editOrder(id, data);
      console.log("Medicine updated successfully in custom hook");
      fetchOrderHook();
      return result;
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  // delete order
  const deleteOrderHook = async (id) => {
    try {
      const result = await deleteOrder(id);
      console.log("Medicine deleted successfully in custom hook");
      fetchOrderHook();
      return { success: true, message: result.data.message };
    } catch (error) {
      console.log("Something wrong in hook", error.message);
      throw new Error("Something wrong in hook" || error.message);
    }
  };

  return {
    order,
    setorder,
    createOrderHook,
    editOrderHook,
    deleteOrderHook,
  };
}
