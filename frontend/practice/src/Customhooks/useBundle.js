import {
  createbundle,
  editbundle,
  deletebundle,
  fetchbundle,
} from "../lib/bundleConfigration.js";
import { useState, useEffect } from "react";

export default function useBundle() {
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    fetchbundleHook();
  }, []);

  //fetch bundle
  const fetchbundleHook = async () => {
    try {
      const res = await fetchbundle();
      console.log("Bundle fetched successfully in custom hook", res);
      setBundles(res?.data?.data);
    } catch (error) {
      console.log("Bundle not fetched successfully in custom hook", error);
      throw new Error("Something wrong in hook", error);
    }
  };

  // create bundle
  const addbundlehook = async (data) => {
    try {
      const result = await createbundle(data);
      if (result?.data) {
        console.log("Bundle created successfully in custom hook");
        fetchbundleHook();
        return result;
      }
    } catch (error) {
      console.log("Bundle not created successfully in custom hook", error);
      throw new Error("Something wrong in hook", error);
    }
  };

  // edit bundle
  const editbundlehook = async (id, data) => {
    try {
      const result = await editbundle(id, data);
      if (result?.data) {
        console.log("Bundle edit successfully in custom hook");
        fetchbundleHook();
        return result;
      }
    } catch (error) {
      console.log("Bundle not edit in custom hook", error);
      throw new Error("Something wrong in hook", error);
    }
  };

  // delete bundle
  const deletebundlehook = async (id) => {
    try {
      const result = await deletebundle(id);
      if (result?.data) {
        console.log("Bundle deleted successfully in custom hook");
        fetchbundleHook();
        return result;
      }
    } catch (error) {
      console.log("Bundle not deleted successfully in custom hook", error);
      throw new Error("Something wrong in hook", error);
    }
  };

  return { bundles, editbundlehook, addbundlehook, deletebundlehook};
}
