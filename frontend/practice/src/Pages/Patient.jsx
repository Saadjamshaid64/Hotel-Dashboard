import { Dialog } from "@headlessui/react";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import usePatient from "../Customhooks/usePatients";

function Patient() {
  const [open, setisopen] = useState(false);
  const [errors, seterrors] = useState([]);
  const [editindex, seteditindex] = useState(null);
  const [editopen, seteditopen] = useState(false);
  const [patientdata, setpatientdata] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Phone: "",
    DOB: "",
    Gender: "",
    Street_Address: "",
    City: "",
    State: "",
  });

  const {
    patients,
    setpatients,
    createPatientHook,
    editPatientHook,
    deletePatientHook,
  } = usePatient();

  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  // change functionality
  const handleChange = (e) => {
    // const {name, value} = e.target
    // setpatientdata((prev)=> ({...prev, [name]: value}))

    setpatientdata({
      ...patientdata,
      [e.target.name]: e.target.value,
    });
  };

  // submit functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newErrors = [];

    // if (!First_Name) newErrors.push("First Name is required");
    // if (!Last_Name) newErrors.push("Last Name is required");
    // if (!Email) newErrors.push("Email is required");
    // if (!Phone) newErrors.push("Phone number is required");
    // if (!DOB) newErrors.push("Date of Birth is required");
    // if (!Gender) newErrors.push("Gender is required");
    // if (!Street_Address) newErrors.push("Street Address is required");
    // if (!City) newErrors.push("City is required");
    // if (!State) newErrors.push("State is required");
    // if (!Zip_Code) newErrors.push("Zip Code is required");

    try {
      const result = await createPatientHook(patientdata);
      if (result?.data) {
        console.log("Patient added Successfully");
        setisopen(false);
        resetForm();
        return result;
      }

      console.log("Patient not created Successfully");
    } catch (error) {
      console.error("Error creating Patient:", error);
      seterrors([error.message || "Failed to create Patient"]);
    }
  };

  // reset form
  const resetForm = () => {
    setpatientdata({
      First_Name: "",
      Last_Name: "",
      Email: "",
      Phone: "",
      DOB: "",
      Gender: "",
      Street_Address: "",
      City: "",
      State: "",
    });
  };

  // delete functionality
  const handleDelete = async (id) => {
    try {
      const res = await deletePatientHook(id);
      if (res?.data) {
        setpatients((prev) => prev.filter((user) => user.id != id));
        console.log("Patient deleted successfully");
      }
    } catch (error) {
      console.log("Error occur", error);
    }
  };

  // edit functionality
  const handleEditClick = async (user, index) => {
    try {
      seteditindex(index);
      seteditopen(true);
      setpatientdata(user);
    } catch (error) {
      console.log("Error occur", error);
      seterrors([error.message || "Failed to update user"]);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = patients[editindex].id;
      const res = await editPatientHook(id, patientdata);

      if (res?.data) {
        console.log("Patient edited successfully");
        resetForm();
        seteditopen(false);
      }
    } catch (error) {
      console.log("Error updating user:", error);
      seterrors([error.message || "Failed to update user"]);
    }
  };

  return (
    <div className="ml-64 p-6 text-left">
      <p className="mb-4">
        Welcome To the Patient tab for create and manages Patient
      </p>

      {/* title + desc + button*/}
      <div className="flex items-start justify-between mb-6">
        {/* Left Section: Title + Paragraph */}
        <div>
          <h1 className="text-xl font-bold">Patient Management</h1>
          <p className="text-gray-600">
            Manage patient records and access individual charts
          </p>
        </div>

        {/* Right Section: Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
          onClick={() => setisopen(true)}
        >
          <Plus size={18} />
          Add New Patient
        </button>
      </div>

      {/* action card*/}
      <div className="flex flex-wrap items-start mt-5 gap-4">
        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Patients</p>
            <p className="text-lg font-bold">{patients.length}</p>
          </div>
          <div className="p-2 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Patients</p>
            <p className="text-lg font-bold">{patients.length}</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            {/* <Stethoscope className="w-5 h-5 text-green-600" /> */}
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Labs</p>
            <p className="text-lg font-bold">0</p>
          </div>
          <div className="p-2 bg-purple-100 rounded-lg">
            {/* <Package className="w-5 h-5 text-purple-600" /> */}
          </div>
        </div>
        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Unread Messages</p>
            {/* <p className="text-lg font-bold">{medicine.length + labs.length + bundles.length}</p> */}
          </div>
          <div className="p-2 bg-orange-100 rounded-lg">
            {/* <DollarSign className="w-5 h-5 text-orange-600" /> */}
          </div>
        </div>
      </div>

      {/* Add Patient Model */}
      <Dialog
        open={open}
        onClose={() => setisopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true"></div>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl h-[680px] rounded-lg bg-white p-6 shadow-lg overflow-y-auto">
            <Dialog.Title className="text-base font-semibold mb-2">
              Add New Patient
            </Dialog.Title>
            <p className="text-sm text-gray-500">
              Create a new patient record. If an email is provided, a user
              account will be created and a welcome email will be sent.
            </p>
            {/* 
            {errors.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm">
                <ul className="list-disc list-inside">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )} */}

            <form onSubmit={handleSubmit}>
              <div>
                <div className="border border-gray-300 py-6 px-4 mt-4 max-w-full rounded-lg">
                  <h1 className="font-semibold text-lg">Basic Information</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm">First Name *</label>
                      <input
                        type="text"
                        name="First_Name"
                        value={patientdata.First_Name}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="text-sm">Last Name *</label>
                      <input
                        type="text"
                        name="Last_Name"
                        value={patientdata.Last_Name}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Email *</label>
                      <input
                        type="email"
                        name="Email"
                        value={patientdata.Email}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                        placeholder="patient@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Phone *</label>
                      <input
                        type="number"
                        name="Phone"
                        value={patientdata.Phone}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="text-sm">Date of Birth *</label>
                      <input
                        type="date"
                        name="DOB"
                        value={patientdata.DOB}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Gender *</label>
                      <select
                        name="Gender"
                        value={patientdata.Gender}
                        onChange={handleChange}
                        className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-300 py-6 px-4 mt-4 max-w-full rounded-lg">
                  <h1 className="text-lg font-semibold">Address Information</h1>
                  <div>
                    <label className="text-sm">Street Address *</label>
                    <input
                      type="text"
                      name="Street_Address"
                      value={patientdata.Street_Address}
                      onChange={handleChange}
                      className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm">City *</label>
                      <input
                        type="text"
                        name="City"
                        value={patientdata.City}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="text-sm">State *</label>
                      <select
                        name="State"
                        value={patientdata.State}
                        onChange={handleChange}
                        className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                      >
                        <option value="" disabled>
                          Select State
                        </option>
                        {usStates.map((user, index) => (
                          <option key={index}>{user}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex gap-2 justify-end">
                  <button
                    typeof="button"
                    onClick={() => {
                      resetForm();
                      setisopen(false);
                    }}
                    className="border border-gray-300 cursor-pointer px-3 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    typeof="submit"
                    className="bg-blue-500 px-3 py-2 rounded-md text-white cursor-pointer"
                  >
                    Create Patient
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Patient Model */}
      <Dialog
        open={editopen}
        onClose={() => seteditopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true"></div>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl h-[680px] rounded-lg bg-white p-6 shadow-lg overflow-y-auto">
            <Dialog.Title className="text-base font-semibold mb-2">
              Update Patient
            </Dialog.Title>
            <p className="text-sm text-gray-500">
              Create a new patient record. If an email is provided, a user
              account will be created and a welcome email will be sent.
            </p>
            {/* 
            {errors.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm">
                <ul className="list-disc list-inside">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )} */}

            <form onSubmit={handleEditSubmit}>
              <div>
                <div className="border border-gray-300 py-6 px-4 mt-4 max-w-full rounded-lg">
                  <h1 className="font-semibold text-lg">Basic Information</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm">First Name *</label>
                      <input
                        type="text"
                        name="First_Name"
                        value={patientdata.First_Name}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="text-sm">Last Name *</label>
                      <input
                        type="text"
                        name="Last_Name"
                        value={patientdata.Last_Name}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Email *</label>
                      <input
                        type="email"
                        name="Email"
                        value={patientdata.Email}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                        placeholder="patient@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Phone *</label>
                      <input
                        type="number"
                        name="Phone"
                        value={patientdata.Phone}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="text-sm">Date of Birth *</label>
                      <input
                        type="date"
                        name="DOB"
                        value={patientdata.DOB}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Gender *</label>
                      <select
                        name="Gender"
                        value={patientdata.Gender}
                        onChange={handleChange}
                        className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-300 py-6 px-4 mt-4 max-w-full rounded-lg">
                  <h1 className="text-lg font-semibold">Address Information</h1>
                  <div>
                    <label className="text-sm">Street Address *</label>
                    <input
                      type="text"
                      name="Street_Address"
                      value={patientdata.Street_Address}
                      onChange={handleChange}
                      className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm">City *</label>
                      <input
                        type="text"
                        name="City"
                        value={patientdata.City}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="text-sm">State *</label>
                      <select
                        name="State"
                        value={patientdata.State}
                        onChange={handleChange}
                        className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                      >
                        <option value="" disabled>
                          Select State
                        </option>
                        {usStates.map((user, index) => (
                          <option key={index}>{user}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      seteditopen(false);
                    }}
                    className="border border-gray-300 cursor-pointer px-3 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    typeof="submit"
                    className="bg-blue-500 px-3 py-2 rounded-md text-white cursor-pointer"
                  >
                    Update Patient
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Patient Table */}
      <div className="mt-6">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {patients.length > 0 ? (
              patients.map((user, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Patient Info */}
                  <td className="px-6 py-4 flex items-center gap-3">
                    {/* Circle Avatar with Initials */}
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-700">
                      {user.First_Name?.charAt(0)}
                      {user.Last_Name?.charAt(0)}
                    </div>

                    {/* Patient Info (stacked vertically) */}
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-800">
                        {user.First_Name} {user.Last_Name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.Age ? `Age: ${user.Age}` : "Age unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.Gender || "Gender not specified"}
                      </p>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <p>📞 {user.Phone || "No phone"}</p>
                    <p>✉️ {user.Email || "No email"}</p>
                  </td>

                  {/* Provider */}
                  <td className="px-6 py-4 text-sm text-gray-700">Dr Sam</td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        className="p-2 border rounded hover:bg-blue-200 cursor-pointer"
                        // onClick={() => alert(`Edit ${user.First_Name}`)}
                        onClick={() => handleEditClick(user, index)}
                      >
                        ✏️
                      </button>
                      <button
                        className="p-2 border rounded hover:bg-red-200 cursor-pointer"
                        // onClick={() => alert(`Delete ${user.First_Name}`)}
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
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No patients found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patient;
