import { Dialog } from "@headlessui/react";
import {
  Pill,
  Stethoscope,
  Package,
  DollarSign,
  Search,
  Plus,
} from "lucide-react";
import { useState } from "react";
import useMedicine from "../../Customhooks/useMedicine.js";
import useLabs from "../../Customhooks/useLabs.js";
import useBundle from "../../Customhooks/useBundle.js";

function Service() {
  const {
    medicine,
    setmedicine,
    createMedicineHook,
    editMedicineHook,
    deleteMedicinehook,
  } = useMedicine();
  const {
    bundles,
    setBundles,
    editbundlehook,
    addbundlehook,
    deletebundlehook,
  } = useBundle();
  const { labs, setlabs, addLabs, editLabs, removeLabs } = useLabs();
  const [activetab, setactivetab] = useState("overview");
  const [setopen, setisopen] = useState(false);
  const [editopen, seteditopen] = useState(false);
  const [editlabopen, seteditlabopen] = useState(false);
  const [editindex, seteditindex] = useState(null);
  const [editlabindex, seteditlabindex] = useState(null);
  const [labopen, setlabopen] = useState(false);
  const [medlab, setmedlab] = useState([]);
  const [editbundleopen, seteditbundleopen] = useState(false);
  const [bundleopen, setbundleopen] = useState(false);
  const [errors, seterrors] = useState([]);
  const [laberrors, setlaberrors] = useState([]);
  const [editbundleindex, seteditbundleindex] = useState(null);
  const [bundleerrors, setbundleerrors] = useState([]);
  const [insidertab, setinsidertab] = useState("overview");
  const [labsData, setlabsData] = useState({
    testname: "",
    purchaseprice: "",
    salesprice: "",
  });
  const [formData, setformData] = useState({
    medicinename: "",
    type: "",
    dosage: "",
    frequency: "",
    purchaseprice: "",
    salesprice: "",
  });
  const [bundleData, setbundleData] = useState({
    bundlename: "",
    discount: "",
  });

  // change functionality for lab
  const handleChangelab = (e) => {
    const { name, value } = e.target;
    setlabsData((prev) => ({ ...prev, [name]: value }));
  };

  // change functionality
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  // change functionality for bundle
  const handleChangebundle = (e) => {
    // const { name, value } = e.target;
    // setbundleData((prev)=>({...prev, [name]: value}))
    setbundleData({
      ...bundleData,
      [e.target.name]: e.target.value,
    });
  };

  // submit functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];
    if (!formData.medicinename) newErrors.push("Medicine name is required!");
    if (!formData.type) newErrors.push("Type is required!");
    if (!formData.dosage) newErrors.push("Dosage is required!");
    if (!formData.frequency) newErrors.push("Frequency is required!");
    seterrors(newErrors);

    if (newErrors.length > 0) return;

    try {
      const result = await createMedicineHook(formData);
      if (result?.data) {
        console.log("User added:", result.data);
        resetForm();
        setisopen(false);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      seterrors([error.message || "Failed to create user"]);
    }
  };

  // submit functionality for lab
  const handleSubmitLab = async (e) => {
    e.preventDefault();
    const newErrors = [];
    if (!labsData.testname) newErrors.push("testname name is required!");
    if (!labsData.purchaseprice) newErrors.push("purchaseprice is required!");
    if (!labsData.salesprice) newErrors.push("salesprice is required!");
    setlaberrors(newErrors);

    if (newErrors.length > 0) return;

    try {
      const result = await addLabs(labsData);
      if (result?.data) {
        console.log("Labs added:", result.data);
        setlabopen(false);
        resetFormlab();
      }
    } catch (error) {
      console.error("Error creating user:", error);
      seterrors([error.message || "Failed to create user"]);
    }
  };

  // submit functionality for bundle
  const handleSubmitBundle = async (e) => {
    e.preventDefault();
    const newErrors = [];
    if (!bundleData.bundlename) newErrors.push("Bundle name is required");
    setbundleerrors(newErrors);

    if (newErrors.length > 0) return;

    const totalSalesPrice = medlab.reduce(
      (total, item) => total + (item.salesprice || 0),
      0
    );

    const totalPurchasePrice = medlab.reduce(
      (total, item) => total + (item.purchaseprice || 0),
      0
    );

    // 🧮 Step 2: Calculate discount and final price
    const discountPercent = parseFloat(bundleData.discount) || 0; // e.g. 10 for 10%
    const finalPrice = totalSalesPrice * (1 - discountPercent / 100);

    try {
      const payload = {
        bundlename: bundleData.bundlename,
        salesprice: totalSalesPrice || 0,
        purchaseprice: totalPurchasePrice || 0,
        discount: bundleData.discount || 0,
        finalprice: finalPrice || 0,
        items: medlab, // array of selected medicines and labs
      };

      await addbundlehook(payload); // call your custom hook
      setbundleopen(false);
      resetFormbundle();
      setmedlab([]); // clear selected items
    } catch (error) {
      console.error("Error creating bundle:", error);
      setbundleerrors([error.message || "Failed to create bundle"]);
    }
  };

  // submit functionality for screen
  const toggleItem = (item, type) => {
    setmedlab((prev) => {
      const exists = prev.find((i) => i.id === item.id && i.itemType === type);
      if (exists) {
        // Item already selected → do nothing
        return prev;
      }
      // add item
      return [
        ...prev,
        {
          id: item.id,
          itemType: type,
          name: item.medicinename || item.testname, // store display name
          salesprice: item.salesprice,
          purchaseprice: item.purchaseprice,
        },
      ];
    });
  };

  // const handleAdditem = () => {
  //   setmedlab((prev) => ({ ...prev }));
  // };

  // reset form

  const resetForm = () => {
    setformData({
      medicinename: "",
      type: "",
      dosage: "",
      frequency: "",
      purchaseprice: "",
      salesprice: "",
    });
  };

  // reset form for lab
  const resetFormlab = () => {
    setlabsData({
      testname: "",
      purchaseprice: "",
      salesprice: "",
    });
  };

  // reset from for bundle
  const resetFormbundle = () => {
    setbundleData({
      bundlename: "",
      discount: "",
    });
    setmedlab([]);
  };

  // delete functionality
  const handleDelete = async (id) => {
    try {
      const result = await deleteMedicinehook(id);
      if (result?.data) {
        setmedicine((prev) => prev.filter((user) => user.id !== id));
        console.log("user deleted successfully");
      }
    } catch (error) {
      console.log("Error occur", error);
    }
  };

  // delete functionality for lab
  const handleDeletelab = async (id) => {
    try {
      const result = await removeLabs(id);
      if (result?.data) {
        setlabs((prev) => prev.filter((user) => user.id !== id));
        console.log("Labs deleted successfully");
      }
    } catch (error) {
      console.log("Error occur", error);
    }
  };

  // delete functionality for bundle
  const handleDeletebundle = async (id) => {
    try {
      const result = await deletebundlehook(id);
      if (result?.data) {
        setBundles((prev) => prev.filter((user) => user.id !== id));
        console.log("Bundle deleted successfully");
      }
    } catch (error) {
      console.log("Error occur", error);
    }
  };

  // edit functionality
  const handelEditClick = (user, index) => {
    try {
      setformData(user);
      seteditopen(true);
      seteditindex(index);
    } catch (error) {
      console.log("Error occur", error);
      setErrors([error.message || "Failed to update user"]);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = medicine[editindex].id;
      const result = await editMedicineHook(id, formData);
      if (result) {
        console.log("user edited successfully");
        resetForm();
        seteditopen(false);
      }
    } catch (error) {
      console.log("Error updating user:", error);
      seterrors([error.message || "Failed to update user"]);
    }
  };

  // edit functionality for lab
  const handelEditClicklab = (user, index) => {
    try {
      setlabsData(user);
      seteditlabopen(true);
      seteditlabindex(index);
    } catch (error) {
      console.log("Error occur", error);
      setErrors([error.message || "Failed to update user"]);
    }
  };

  const handleEditSubmitlab = async (e) => {
    e.preventDefault();
    try {
      const id = labs[editlabindex].id;
      const result = await editLabs(id, labsData);
      if (result) {
        console.log("user edited successfully");
        resetFormlab();
        seteditlabopen(false);
      }
    } catch (error) {
      console.log("Error updating user:", error);
      setbundleerrors([error.message || "Failed to update user"]);
    }
  };

  // edit functionality for bundle
  const handelEditClickbundle = (bundle, index) => {
    try {
      setbundleData(bundle);
      // setmedlab(bundle.items  || [])

      const selectedItems = bundle.BundleItems.map((item) => ({
        id: item.itemId,
        itemType: item.itemType,
        name:
          item.itemType === "medicine"
            ? item.Medicine?.medicinename
            : item.Lab?.testname,
        salesprice: item.Medicine?.salesprice || item.Lab?.salesprice || 0,
        purchaseprice:
          item.Medicine?.purchaseprice || item.Lab?.purchaseprice || 0,
      }));

      console.log(
        "Bundle items:",
        bundle.BundleItems,
        "Mapped items:",
        selectedItems
      );
      setmedlab(selectedItems);
      seteditbundleopen(true);
      seteditbundleindex(index);
    } catch (error) {
      console.log("Error occur", error);
      setbundleerrors([error.message || "Failed to update user"]);
    }
  };

  const handleEditSubmitbundle = async (e) => {
    e.preventDefault();
    try {
      const id = bundles[editbundleindex].id;

      // 🧮 Step 1: Calculate totals
      const totalSalesPrice = medlab.reduce(
        (total, item) => total + (item.salesprice || 0),
        0
      );

      // 🧮 Step 2: Calculate discount and final price
      const discountPercent = parseFloat(bundleData.discount) || 0; // e.g. 10 for 10%
      const finalPrice = totalSalesPrice * (1 - discountPercent / 100);

      const payload = {
        ...bundleData,
        discount: bundleData.discount,
        items: medlab,
        finalprice: finalPrice,
      };
      const result = await editbundlehook(id, payload);
      if (result) {
        console.log("user edited successfully");
        resetFormbundle();
        seteditbundleopen(false);
      }
    } catch (error) {
      console.log("Error updating user:", error);
      setbundleerrors([error.message || "Failed to update user"]);
    }
  };

  return (
    <>
      {/* title + desc */}
      <div className="mt-5">
        <h2 className="text-md font-medium">Service Catalog</h2>
        <p className="text-gray-500 text-sm">
          Manage medications, lab tests, and bundles
        </p>
      </div>

      {/* action card*/}
      <div className="flex flex-wrap items-start mt-5 gap-4">
        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Medications</p>
            <p className="text-lg font-bold">{medicine.length}</p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <Pill className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Lab Tests</p>
            <p className="text-lg font-bold">{labs.length}</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <Stethoscope className="w-5 h-5 text-green-600" />
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Bundles</p>
            <p className="text-lg font-bold">{bundles.length}</p>
          </div>
          <div className="p-2 bg-purple-100 rounded-lg">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Items</p>
            <p className="text-lg font-bold">23</p>
          </div>
          <div className="p-2 bg-orange-100 rounded-lg">
            <DollarSign className="w-5 h-5 text-orange-600" />
          </div>
        </div>
      </div>

      {/* white box  */}
      <div className="bg-white mt-5 py-6 px-3 rounded-xl border border-gray-300 flex items-center flex-1 gap-3">
        <div className="flex items-center bg-white rounded-xl px-2 py-1 border border-gray-300 border-lg">
          <div>
            <Search className="h-4 w-4 text-gray-300" />
          </div>
          <div>
            <input
              type="search"
              name="search"
              className="px-3 py-2 text-sm"
              placeholder="Search products..."
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white px-7 rounded-xl py-1 border border-gray-300 border-lg flex-1">
          <select name="dropdown1" className="py-2 text-sm">
            <option>All Types</option>
            <option>Medications</option>
            <option>Lab Tests</option>
            <option>Bundles</option>
          </select>
        </div>

        <div className="flex items-center bg-white rounded-xl px-2 py-1 border border-gray-300 border-lg flex-1">
          <div>
            <input
              type="number"
              name="search"
              className="px-3 py-2 text-sm"
              placeholder="Min Price"
            />
          </div>
        </div>

        <div className="flex items-center bg-white rounded-xl px-2 py-1 border border-gray-300 border-lg flex-1">
          <div>
            <input
              type="number"
              name="search"
              className="px-3 py-2 text-sm"
              placeholder="Max Price"
            />
          </div>
        </div>

        <div className="flex items-center justify-between bg-white px-7 rounded-xl py-1 border border-gray-300 border-lg flex-1">
          <select name="dropdown2" className="py-2 text-sm">
            <option>All Pharmacies</option>
            <option>Empower Pharmacy</option>
            <option>Hallandale Pharmacy</option>
            <option>Village Fertility Pharmacy</option>
          </select>
        </div>
      </div>

      {/* tab and buttons */}
      <div className="mt-4 flex items-center justify-between">
        <div className="mt-1 flex bg-gray-100 rounded-md shadow-sm px-2 py-1 w-xl">
          <button
            onClick={() => setactivetab("overview")}
            className={`flex-1 px-4 py-2 text-sm rounded-md transition cursor-pointer ${
              activetab === "overview"
                ? "bg-white text-700 font-semibold shadow-sm"
                : "text-gray-600 font-normal"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              setactivetab("medications");
              setinsidertab("medications");
            }}
            className={`flex-1  px-4 py-2 text-sm rounded-md transition cursor-pointer ${
              activetab === "medications"
                ? "bg-white text-700 font-semibold shadow-sm"
                : "text-gray-600 font-normal"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill size={16} />
                <p>Medications</p>
              </div>
              <p className="ml-3">{medicine.length}</p>
            </div>
          </button>
          <button
            onClick={() => {
              setactivetab("labs");
              setinsidertab("labs");
            }}
            className={`flex-1  px-4 py-2 text-sm rounded-md transition cursor-pointer ${
              activetab === "labs"
                ? "bg-white text-700 font-semibold shadow-sm"
                : "text-gray-600 font-normal"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stethoscope size={16} />
                <p>Labs</p>
              </div>
              <p className="ml-3">{labs.length}</p>
            </div>
          </button>
          <button
            onClick={() => {
              setactivetab("bundles");
              setinsidertab("bundles");
            }}
            className={`flex-1 px-4 py-2 text-sm rounded-md transition cursor-pointer ${
              activetab === "bundles"
                ? "bg-white text-700 font-semibold shadow-sm"
                : "text-gray-600 font-normal"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package size={16} />
                <p>Bundles</p>
              </div>
              <p className="ml-3">{bundles.length}</p>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-3 justify-end ">
          <button
            onClick={() => setisopen(true)}
            className="flex items-center gap-2 bg-blue-700 text-white text-sm rounded-md px-3 py-3 font-semibold cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Plus size={16} />
              <p>Add Medication</p>
            </div>
          </button>
          <button
            className="flex items-center gap-2 border border-gray-300 text-sm rounded-md px-5 py-3 font-semibold cursor-pointer"
            onClick={() => setlabopen(true)}
          >
            <Plus size={16} />
            <p>Add Lab</p>
          </button>
          <button
            className="flex items-center text-white bg-blue-600 gap-2 border border-gray-300 text-sm rounded-md px-5 py-3 font-semibold cursor-pointer"
            onClick={() => setbundleopen(true)}
          >
            <Plus className="h-4 w-4" />
            <p>Add Bundle</p>
          </button>
        </div>
      </div>

      {/* Add user model */}
      <Dialog
        open={setopen}
        onClose={() => setisopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl h-[450px] rounded-lg bg-white p-6 shadow-lg">
            <Dialog.Title className="text-base font-semibold mb-2">
              Create Enhanced Medication
            </Dialog.Title>
            {errors.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm">
                <ul className="list-disc list-inside">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 border border-gray-300 px-4 py-5 rounded-lg">
                <div className="col-span-2 font-bold text-md">
                  Basic Information
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Medication Name *
                  </label>
                  <input
                    type="text"
                    name="medicinename"
                    value={formData.medicinename}
                    onChange={handleChange}
                    placeholder="e.g., Testosterone Cypionate"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Type *
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Select administration type"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={handleChange}
                    name="dosage"
                    placeholder="Select Dosage 100ml"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Frequency *
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={handleChange}
                    name="frequency"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  >
                    <option>Select Frequency</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Purchase Price *
                  </label>
                  <input
                    type="text"
                    value={formData.purchaseprice}
                    onChange={handleChange}
                    name="purchaseprice"
                    placeholder="$ 0.00"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Sales Price *
                  </label>
                  <input
                    type="text"
                    value={formData.salesprice}
                    onChange={handleChange}
                    name="salesprice"
                    placeholder="$ 0.00"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-5 text-sm font-medium">
                <button
                  type="button"
                  className="w-60 px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer"
                  onClick={() => {
                    setisopen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-60 flex items-center justify-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-blue-600 text-white"
                >
                  Create Enhanced Medications
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Add user model for labs*/}
      <Dialog
        open={labopen}
        onClose={() => setlabopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl h-[310px] rounded-lg bg-white p-6 shadow-lg">
            <Dialog.Title className="text-base font-semibold mb-2">
              Add New Lab Test
            </Dialog.Title>
            {laberrors.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm">
                <ul className="list-disc list-inside">
                  {laberrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmitLab}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
                <p className="col-span-2 text-sm text-gray-500 p-0">
                  Add a new lab test to your catalog with pricing information.
                </p>
                <div className="col-span-2">
                  <label className="text-sm font-semibold mb-2 block">
                    Test Name *
                  </label>
                  <input
                    type="text"
                    name="testname"
                    value={labsData.testname}
                    onChange={handleChangelab}
                    placeholder="e.g., Testosterone Total, Complete BLood Count"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Purchase Price *
                  </label>
                  <input
                    type="text"
                    name="purchaseprice"
                    value={labsData.purchaseprice}
                    onChange={handleChangelab}
                    placeholder="$ 0.00"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Sales Price *
                  </label>
                  <input
                    type="text"
                    value={labsData.salesprice}
                    onChange={handleChangelab}
                    name="salesprice"
                    placeholder="$ 0.00"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-5 text-sm font-medium">
                <button
                  type="button"
                  className="w-60 px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer"
                  onClick={() => {
                    setlabopen(false);
                    resetFormlab();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-60 flex items-center justify-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-blue-600 text-white"
                >
                  Add Lab Test
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Add user model for bundle*/}
      <Dialog
        open={bundleopen}
        onClose={() => setbundleopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl h-[720px] rounded-lg bg-white p-6 shadow-lg overflow-y-auto">
            <Dialog.Title className="text-base font-semibold mb-2">
              Create New Bundle
            </Dialog.Title>
            {bundleerrors.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm">
                <ul className="list-disc list-inside">
                  {bundleerrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmitBundle}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
                <p className="col-span-2 text-sm text-gray-500 p-0">
                  Create a bundle by combining medications and lab tests with
                  special pricing.
                </p>
                <div className="col-span-2">
                  <label className="text-sm font-semibold mb-2 block">
                    Bundle Name *
                  </label>
                  <input
                    type="text"
                    name="bundlename"
                    value={bundleData.bundlename}
                    onChange={handleChangebundle}
                    placeholder="e.g., TRT Starter Pack, Hormone Panel Bundle"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    autoFocus
                  />
                </div>
                <div className="text-sm mb-3">
                  <h1 className="font-semibold">Add Items to Bundle</h1>
                  <p className="text-gray-400 text-xs">
                    Search and select medications or lab tests to include
                  </p>
                </div>
                <div className="col-span-2 border border-gray-300 rounded-md p-3 max-h-50 overflow-y-auto">
                  {medicine?.map((med) => (
                    <div
                      key={med.id}
                      className="w-full flex justify-between items-center mb-2 p-2 hover:bg-gray-50 rounded-md border border-gray-200"
                    >
                      <div className="bg-blue-200 flex text-xs items-center gap-2 rounded-md px-2 py-1">
                        <Pill className="text-blue-700" size={14} />
                        <p className="text-blue-700 font-semibold">
                          Enhanced Medication
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">{med.medicinename}</p>
                        <p className="text-gray-500 text-sm">
                          ${med.salesprice}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-md text-white bg-blue-600 cursor-pointer"
                        onClick={() => toggleItem(med, "medicine")}
                      >
                        +
                      </button>
                    </div>
                  ))}
                  {labs?.map((lab) => (
                    <div
                      key={lab.id}
                      className="w-full flex justify-between items-center mb-2 p-2 hover:bg-gray-50 rounded-md border border-gray-200"
                    >
                      <div className="bg-green-200 flex text-xs items-center gap-2 rounded-md px-2 py-1">
                        <Stethoscope className="text-green-700" size={14} />
                        <p className="text-green-700 font-semibold">Lab Test</p>
                      </div>
                      <div>
                        <p className="font-semibold">{lab.testname}</p>
                        <p className="text-gray-500 text-sm">
                          ${lab.salesprice}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-md text-white bg-blue-600 cursor-pointer"
                        onClick={() => toggleItem(lab, "lab")}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>

                {/* the selected item */}
                <div className="col-span-2 mt-1">
                  <h3 className="font-semibold mb-2">Selected Items</h3>
                  {medlab.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                      No items selected yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {medlab.map((item) => (
                        <div
                          key={`${item.itemType}-${item.id}`}
                          className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <p className="font-semibold text-base mb-1">
                            {item.itemType === "medicine"
                              ? item.medicinename
                              : item.testname}
                          </p>
                          <p className="text-gray-600 text-sm mb-1">
                            Type: {item.itemType}
                          </p>
                          <p className="text-gray-600 text-sm mb-1">
                            Name: {item.name}
                          </p>
                          <p className="text-gray-700 text-sm mb-1">
                            Sales Price: ${item.salesprice}
                          </p>
                          <p className="text-gray-700 text-sm">
                            Purchase Price: ${item.purchaseprice}
                          </p>
                          <button
                            type="button"
                            className="mt-2 px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-xs cursor-pointer"
                            onClick={() =>
                              setmedlab((prev) =>
                                prev.filter(
                                  (i) =>
                                    !(i.id === item.id && i.type === item.type)
                                )
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Show Summary Only When Items Selected and prices*/}
                {medlab.length > 0 && (
                  <div className="col-span-2 border-t pt-4">
                    <h3 className="font-semibold mb-2 text-gray-800">
                      Bundle Summary
                    </h3>

                    <div className="text-sm space-y-2">
                      <p>
                        <span className="font-medium text-gray-700">
                          Bundle Name:
                        </span>{" "}
                        {bundleData.bundlename || "—"}
                      </p>

                      <p>
                        <span className="font-medium text-gray-700">
                          Total Sales Price:
                        </span>{" "}
                        $
                        {medlab
                          .reduce(
                            (total, item) => total + (item.salesprice || 0),
                            0
                          )
                          .toFixed(2)}
                      </p>

                      <p>
                        <span className="font-medium text-gray-700">
                          Total Purchase Price:
                        </span>{" "}
                        $
                        {medlab
                          .reduce(
                            (total, item) => total + (item.purchaseprice || 0),
                            0
                          )
                          .toFixed(2)}
                      </p>

                      {/* Discount */}
                      <label className="font-semibold ">Discount: </label>
                      <input
                        type="text"
                        name="discount"
                        value={bundleData.discount}
                        onChange={handleChangebundle}
                        placeholder="Enter the discount e.g. 10"
                        className="border border-gray-300 px-1 py-1 rounded-md text-xs"
                      />

                      {/* Final Price */}
                      <p className="text-lg font-semibold text-green-700 mt-1">
                        Final Price: $
                        {(
                          medlab.reduce(
                            (total, item) => total + (item.salesprice || 0),
                            0
                          ) *
                          (1 - (parseFloat(bundleData.discount) || 0) / 100)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* buttons */}
              <div className="flex justify-end space-x-3 mt-5 text-sm font-medium">
                <button
                  type="button"
                  className="w-60 px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer"
                  onClick={() => {
                    setbundleopen(false);
                    resetFormbundle();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-60 flex items-center justify-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-blue-600 text-white"
                >
                  Create Bundle
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit User Model */}
      <Dialog
        open={editopen}
        onClose={() => seteditopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl h-[450px] rounded-lg bg-white p-6 shadow-lg">
            <Dialog.Title className="text-base font-semibold mb-2">
              Create Enhanced Medication
            </Dialog.Title>
            {errors.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm">
                <ul className="list-disc list-inside">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-2 gap-4 border border-gray-300 px-4 py-5 rounded-lg">
                <div className="col-span-2 font-bold text-md">
                  Basic Information
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Medication Name *
                  </label>
                  <input
                    type="text"
                    name="medicinename"
                    value={formData.medicinename}
                    onChange={handleChange}
                    placeholder="e.g., Testosterone Cypionate"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Type *
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Select administration type"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={handleChange}
                    name="dosage"
                    placeholder="Select Dosage 100ml"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Frequency *
                  </label>
                  <select
                    value={formData.frequency}
                    onChange={handleChange}
                    name="frequency"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  >
                    <option>Select Frequency</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Purchase Price *
                  </label>
                  <input
                    type="text"
                    value={formData.purchaseprice}
                    onChange={handleChange}
                    name="purchaseprice"
                    placeholder="$ 0.00"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Sales Price *
                  </label>
                  <input
                    type="text"
                    value={formData.salesprice}
                    onChange={handleChange}
                    name="salesprice"
                    placeholder="$ 0.00"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-5 text-sm font-medium">
                <button
                  type="button"
                  className="w-60 px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer"
                  onClick={() => {
                    seteditopen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-60 flex items-center justify-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-blue-600 text-white"
                >
                  Update Enhanced Medications
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit User Model for lab*/}
      <Dialog
        open={editlabopen}
        onClose={() => seteditlabopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl h-[310px] rounded-lg bg-white p-6 shadow-lg">
            <Dialog.Title className="text-base font-semibold mb-2">
              Add New Lab Test
            </Dialog.Title>
            {laberrors.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm">
                <ul className="list-disc list-inside">
                  {laberrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleEditSubmitlab}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
                <p className="col-span-2 text-sm text-gray-500 p-0">
                  Add a new lab test to your catalog with pricing information.
                </p>
                <div className="col-span-2">
                  <label className="text-sm font-semibold mb-2 block">
                    Test Name *
                  </label>
                  <input
                    type="text"
                    name="testname"
                    value={labsData.testname}
                    onChange={handleChangelab}
                    placeholder="e.g., Testosterone Total, Complete BLood Count"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Purchase Price *
                  </label>
                  <input
                    type="text"
                    name="purchaseprice"
                    value={labsData.purchaseprice}
                    onChange={handleChangelab}
                    placeholder="$ 0.00"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">
                    Sales Price *
                  </label>
                  <input
                    type="text"
                    value={labsData.salesprice}
                    onChange={handleChangelab}
                    name="salesprice"
                    placeholder="$ 0.00"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-5 text-sm font-medium">
                <button
                  type="button"
                  className="w-60 px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer"
                  onClick={() => {
                    seteditlabopen(false);
                    resetFormlab();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-60 flex items-center justify-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-blue-600 text-white"
                >
                  Update Lab Test
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit User Model for bundle*/}
      <Dialog
        open={editbundleopen}
        onClose={() => seteditbundleopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl h-[720px] rounded-lg bg-white p-6 shadow-lg overflow-y-auto">
            <Dialog.Title className="text-base font-semibold mb-2">
              Edit Bundle
            </Dialog.Title>
            {bundleerrors.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm">
                <ul className="list-disc list-inside">
                  {bundleerrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleEditSubmitbundle}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
                <p className="col-span-2 text-sm text-gray-500 p-0">
                  Create a bundle by combining medications and lab tests with
                  special pricing.
                </p>
                <div className="col-span-2">
                  <label className="text-sm font-semibold mb-2 block">
                    Bundle Name *
                  </label>
                  <input
                    type="text"
                    name="bundlename"
                    value={bundleData.bundlename}
                    onChange={handleChangebundle}
                    placeholder="e.g., TRT Starter Pack, Hormone Panel Bundle"
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    autoFocus
                  />
                </div>
                <div className="text-sm mb-3">
                  <h1 className="font-semibold">Add Items to Bundle</h1>
                  <p className="text-gray-400 text-xs">
                    Search and select medications or lab tests to include
                  </p>
                </div>
                <div className="col-span-2 border border-gray-300 rounded-md p-3 max-h-50 overflow-y-auto">
                  {medicine?.map((med) => (
                    <div
                      key={med.id}
                      className="w-full flex justify-between items-center mb-2 p-2 hover:bg-gray-50 rounded-md border border-gray-200"
                    >
                      <div className="bg-blue-200 flex text-xs items-center gap-2 rounded-md px-2 py-1">
                        <Pill className="text-blue-700" size={14} />
                        <p className="text-blue-700 font-semibold">
                          Enhanced Medication
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">{med.medicinename}</p>
                        <p className="text-gray-500 text-sm">
                          ${med.salesprice}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-md text-white bg-blue-600 cursor-pointer"
                        onClick={() => toggleItem(med, "medicine")}
                      >
                        +
                      </button>
                    </div>
                  ))}
                  {labs?.map((lab) => (
                    <div
                      key={lab.id}
                      className="w-full flex justify-between items-center mb-2 p-2 hover:bg-gray-50 rounded-md border border-gray-200"
                    >
                      <div className="bg-green-200 flex text-xs items-center gap-2 rounded-md px-2 py-1">
                        <Stethoscope className="text-green-700" size={14} />
                        <p className="text-green-700 font-semibold">Lab Test</p>
                      </div>
                      <div>
                        <p className="font-semibold">{lab.testname}</p>
                        <p className="text-gray-500 text-sm">
                          ${lab.salesprice}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-md text-white bg-blue-600 cursor-pointer"
                        onClick={() => toggleItem(lab, "lab")}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>

                {/* the selected item */}
                <div className="col-span-2 mt-1">
                  <h3 className="font-semibold mb-2">Selected Items</h3>
                  {medlab.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                      No items selected yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {medlab.map((item) => (
                        <div
                          key={`${item.itemType}-${item.id}`}
                          className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                        >
                          <p className="font-semibold text-base mb-1">
                            {item.itemType === "medicine"
                              ? item.medicinename
                              : item.testname}
                          </p>
                          <p className="text-gray-600 text-sm mb-1">
                            Type: {item.itemType}
                          </p>
                          <p className="text-gray-600 text-sm mb-1">
                            Name: {item.name}
                          </p>
                          <p className="text-gray-700 text-sm mb-1">
                            Sales Price: ${item.salesprice}
                          </p>
                          <p className="text-gray-700 text-sm">
                            Purchase Price: ${item.purchaseprice}
                          </p>
                          {/* Optional remove button */}
                          <button
                            type="button"
                            className="mt-2 px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-xs cursor-pointer"
                            onClick={() =>
                              setmedlab((prev) =>
                                prev.filter(
                                  (i) =>
                                    !(i.id === item.id && i.type === item.type)
                                )
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Show Summary Only When Items Selected and prices*/}
                {medlab.length > 0 && (
                  <div className="col-span-2 border-t pt-4">
                    <h3 className="font-semibold mb-2 text-gray-800">
                      Bundle Summary
                    </h3>

                    <div className="text-sm space-y-2">
                      <p>
                        <span className="font-medium text-gray-700">
                          Bundle Name:
                        </span>{" "}
                        {bundleData.bundlename || "—"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">
                          Total Sales Price:
                        </span>{" "}
                        $
                        {medlab
                          .reduce(
                            (total, item) => total + (item.salesprice || 0),
                            0
                          )
                          .toFixed(2)}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">
                          Total Purchase Price:
                        </span>{" "}
                        $
                        {medlab
                          .reduce(
                            (total, item) => total + (item.purchaseprice || 0),
                            0
                          )
                          .toFixed(2)}
                      </p>
                      {/* Discount */}
                      <label className="font-semibold ">Discount: </label>
                      <input
                        type="text"
                        name="discount"
                        value={bundleData.discount}
                        onChange={handleChangebundle}
                        placeholder="Enter the discount e.g. 10"
                        className="border border-gray-300 px-1 py-1 rounded-md text-xs"
                      />
                      {/* Final Price */}
                      <p className="text-lg font-semibold text-green-700 mt-1">
                        Final Price: $
                        {(
                          medlab.reduce(
                            (total, item) => total + (item.salesprice || 0),
                            0
                          ) *
                          (1 - (parseFloat(bundleData.discount) || 0) / 100)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3 mt-5 text-sm font-medium">
                <button
                  type="button"
                  className="w-60 px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer"
                  onClick={() => {
                    seteditbundleopen(false);
                    resetFormbundle();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-60 flex items-center justify-center gap-2 px-4 py-2 rounded-md cursor-pointer bg-blue-600 text-white"
                >
                  Update Bundle
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* medicine table */}
      {insidertab === "medications" && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Type
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Product Name
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Details
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Dosage
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Frequency
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Price
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {medicine.length > 0 ? (
                medicine.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="pl-3 py-6">
                      <div className="bg-blue-200 flex text-xs items-center gap-2 rounded-md inline-flex px-2 py-1">
                        <Pill className="text-blue-700" size={14} />
                        <p className="text-blue-700 font-semibold">
                          Enhanced Medication
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className="px-15 text-sm font-semibold">
                        {user.medicinename}
                      </span>
                    </td>
                    <td className="text-sm font-semibold pl-16">{user.type}</td>
                    <td className="text-sm font-semibold pl-16">
                      {user.dosage}
                    </td>
                    <td>
                      <span className="text-sm font-semibold pl-16">
                        {user.frequency}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm font-semibold pl-16">
                        {user.salesprice - user.purchaseprice}
                      </span>
                    </td>

                    {/* buttons */}
                    <td className="px- py-4">
                      <div className="pl-14 flex gap-2">
                        <button
                          className="p-1 rounded border cursor-pointer hover:bg-gray-300 hover:transition"
                          onClick={() => handelEditClick(user, index)}
                        >
                          ✏️
                        </button>
                        <button
                          className="p-1 rounded border cursor-pointer hover:bg-red-300 hover:transition duration-300"
                          onClick={() => handleDelete(user.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Nothing to show!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* labs table */}
      {insidertab === "labs" && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Type
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Product Name
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Details
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Price
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {labs.length > 0 ? (
                labs.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-6">
                      <div className="bg-green-200 flex text-xs items-center gap-2 rounded-md inline-flex px-2 py-1">
                        <Stethoscope className="text-green-700" size={14} />
                        <p className="text-green-700 font-semibold">Lab Test</p>
                      </div>
                    </td>
                    <td>
                      <span className="px-15 text-sm font-semibold">
                        {user.testname}
                      </span>
                    </td>
                    <td className="text-sm font-semibold pl-16">
                      Laboratory Test
                    </td>
                    <td className="text-sm font-semibold pl-16">
                      ${user.salesprice - user.purchaseprice}.00
                    </td>

                    {/* buttons */}
                    <td className="px- py-4">
                      <div className="pl-14 flex gap-2">
                        <button
                          className="p-1 rounded border cursor-pointer hover:bg-gray-300 hover:transition"
                          onClick={() => handelEditClicklab(user, index)}
                        >
                          ✏️
                        </button>
                        <button
                          className="p-1 rounded border cursor-pointer hover:bg-red-300 hover:transition duration-300"
                          onClick={() => handleDeletelab(user.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Nothing to show!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* bundle table */}
      {insidertab === "bundles" && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Type
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Bundle Name
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Details
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Price
                </th>
                <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bundles.length > 0 ? (
                bundles.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-6">
                      <div className="bg-purple-200 flex text-xs items-center gap-2 rounded-md inline-flex px-2 py-1">
                        <Package className="text-purple-700" size={14} />
                        <p className="text-purple-700 font-semibold">Bundle</p>
                      </div>
                    </td>
                    <td>
                      <span className="px-15 text-sm font-semibold">
                        {user.bundlename}
                      </span>
                    </td>
                    <td className="text-sm font-semibold pl-16">Items</td>
                    <td className="text-sm font-semibold pl-16">
                      ${user.finalprice.toFixed(2)}
                    </td>

                    {/* buttons */}
                    <td className="px- py-4">
                      <div className="pl-14 flex gap-2">
                        <button
                          className="p-1 rounded border cursor-pointer hover:bg-gray-300 hover:transition"
                          onClick={() => handelEditClickbundle(user, index)}
                        >
                          ✏️
                        </button>
                        <button
                          className="p-1 rounded border cursor-pointer hover:bg-red-300 hover:transition duration-300"
                          onClick={() => handleDeletebundle(user.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Nothing to show!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
export default Service;
