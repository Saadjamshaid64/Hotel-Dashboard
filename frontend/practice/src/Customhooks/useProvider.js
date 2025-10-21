import { useEffect, useState } from "react";
import {
  createProvider,
  editProvider,
  deleteProvider,
  fetchProvider,
} from "../lib/providerConfigration.js";

export function useProviders() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    showProvider();
  }, []);

  // fetch provider
  const showProvider = async () => {
    try {
      const result = await fetchProvider();
      console.log("User fetched successfully in custom hook", result);
      setUser(result?.data.data);
    } catch (error) {
      console.log("User not fetched Successfully in custom hook");
      throw new Error("Something went wrong");
    }
  };

  // create Provider
  const makeProvider = async (data) => {
    try {
      const result = await createProvider(data);
      console.log("User created successfully in custom hook");
      showProvider();
      return result;
    } catch (error) {
      console.log(
        "User not created Successfully in custom hook",
        error?.response?.data || error
      );
      throw new Error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // edit Provider
  const changeProvider = async (id, data) => {
    try {
      const result = await editProvider(id, data);
      if (result?.data) {
        console.log("User created successfully in custom hook");
        showProvider();
        return result;
      }
    } catch (error) {
      console.log("User not created Successfullt in custom hook");
      throw new Error("Something went wrong");
    }
  };

  // delete Provider
  const removeProvider = async (id) => {
    try {
      const deleterow = await deleteProvider(id);
      console.log("user deleted successfully in custom hook");
      showProvider();
      return deleterow;
    } catch (error) {
      console.log("User not deleted Successfully in custom hook");
      throw new Error("Something went wrong");
    }
  };

  return { user, setUser, makeProvider, changeProvider, removeProvider };
}
