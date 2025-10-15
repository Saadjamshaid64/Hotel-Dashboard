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

function Service() {
  const {
    medicine,
    setmedicine,
    createMedicineHook,
    editMedicineHook,
    deleteMedicinehook,
  } = useMedicine();

  const { labs, setlabs, addLabs, editLabs, removeLabs } = useLabs();
  const [activetab, setactivetab] = useState("overview");
  const [setopen, setisopen] = useState(false);
  const [editopen, seteditopen] = useState(false);
  const [editlabopen, seteditlabopen] = useState(false);
  const [editindex, seteditindex] = useState(null);
  const [editlabindex, seteditlabindex] = useState(null);
  const [labopen, setlabopen] = useState(false);
  const [errors, seterrors] = useState([]);
  const [laberrors, setlaberrors] = useState([]);
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

  // reset form
  const resetForm = () => {
    setformData({
      medicinename: "",
      type: "",
      dosage: "",
      frequency: "",
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

  //  edit functionality
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
      seterrors([error.message || "Failed to update user"]);
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

      {/* action card */}
      <div className="flex flex-wrap items-start mt-5 gap-4">
        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Medications</p>
            <p className="text-lg font-bold">18</p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <Pill className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Lab Tests</p>
            <p className="text-lg font-bold">5</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            <Stethoscope className="w-5 h-5 text-green-600" />
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Bundles</p>
            <p className="text-lg font-bold">0</p>
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
              <p className="ml-3">0</p>
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
            className="flex items-center gap-2 border border-gray-300 text-sm rounded-md px-3 py-3 font-semibold cursor-pointer"
            onClick={() => setlabopen(true)}
          >
            <Plus size={16} />
            <p>Add Lab</p>
          </button>
          <button></button>
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
          <Dialog.Panel className="w-full max-w-4xl h-[360px] rounded-lg bg-white p-6 shadow-lg">
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

      {/* Edit User Model */}
      <Dialog
        open={editopen}
        onClose={() => seteditopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl h-[360px] rounded-lg bg-white p-6 shadow-lg">
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {medicine.length > 0 ? (
                medicine.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-6 py-6">
                      <div className="bg-blue-200 flex text-sm items-center gap-2 rounded-md inline-flex px-2 py-1">
                        <Pill className="text-blue-700" size={15} />
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
                      <div className="bg-green-200 flex text-sm items-center gap-2 rounded-md inline-flex px-2 py-1">
                        <Stethoscope className="text-green-700" size={15} />
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
    </>
  );
}
export default Service;
