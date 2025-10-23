import { Dialog } from "@headlessui/react";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import usePatient from "../Customhooks/usePatients";

function Patient() {
  const [open, setisopen] = useState(false);
  const [errors, seterrors] = useState([]);
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
    Zip_Code: "",
    E_Contact_Name: "",
    E_Contact_Phone: "",
    Medical_History: "",
    Allergies: "",
    Current_Medications: "",
    Interested_Treatments: "",
  });

  const {patients, setpatients, createPatientHook, editPatientHook, deletePatientHook} = usePatient()

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
    e.preventDefault()
    const newErrors = []
    // validate each required field
    if (!patientdata.First_Name) newErrors.push("First Name is required")
    if (!patientdata.Last_Name) newErrors.push("Last Name is required")
    if (!patientdata.Email) newErrors.push("Email is required")
    // basic email pattern
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(patientdata.Email))
      newErrors.push("Email must be a valid email address")
    if (!patientdata.Phone) newErrors.push("Phone is required")
    if (!patientdata.DOB) newErrors.push("Date of birth is required")
    if (!patientdata.Gender) newErrors.push("Gender is required")
    if (!patientdata.Street_Address) newErrors.push("Street address is required")
    if (!patientdata.City) newErrors.push("City is required")
    if (!patientdata.State) newErrors.push("State is required")
    if (!patientdata.Zip_Code) newErrors.push("ZIP code is required")
    if (!patientdata.E_Contact_Name) newErrors.push("Emergency contact name is required")
    if (!patientdata.E_Contact_Phone) newErrors.push("Emergency contact phone is required")
    if (!patientdata.Medical_History) newErrors.push("Medical history is required")
    if (!patientdata.Allergies) newErrors.push("Allergies field is required")
    if (!patientdata.Current_Medications) newErrors.push("Current medications field is required")
    if (!patientdata.Interested_Treatments) newErrors.push("Interested treatments field is required")

    seterrors(newErrors)

    if (newErrors.length > 0) return

    try {
      // call createPatientHook and handle result
      const result = await createPatientHook(patientdata)
      if (result?.data) {
        resetForm()
        setisopen(false)
      }
    } catch (error) {
      // push server-side error message if available
      seterrors([error?.message || 'An unexpected error occurred'])
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
      Zip_Code: "",
      E_Contact_Name: "",
      E_Contact_Phone: "",
      Medical_History: "",
      Allergies: "",
      Current_Medications: "",
      Interested_Treatments: "",
    });
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
            <p className="text-lg font-bold">0</p>
          </div>
          <div className="p-2 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Patients</p>
            <p className="text-lg font-bold">1</p>
          </div>
          <div className="p-2 bg-green-100 rounded-lg">
            {/* <Stethoscope className="w-5 h-5 text-green-600" /> */}
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl flex items-center justify-between border border-gray-200 flex-1">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Labs</p>
            <p className="text-lg font-bold">2</p>
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

            {/* {errors.length > 0 && (
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

                    <div>
                      <label className="text-sm">ZIP Code *</label>
                      <input
                        type="text"
                        name="Zip_Code"
                        value={patientdata.Zip_Code}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 py-6 px-4 mt-4 max-w-full rounded-lg">
                  <h1 className="text-lg font-semibold">Emergency Contact</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm">
                        Emergency Contact Name *
                      </label>
                      <input
                        type="text"
                        name="E_Contact_Name"
                        value={patientdata.E_Contact_Name}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="text-sm">
                        Emergency Contact Phone *
                      </label>
                      <input
                        type="number"
                        name="E_Contact_Phone"
                        value={patientdata.E_Contact_Phone}
                        onChange={handleChange}
                        className="border w-full border-gray-400 text-sm pl-2 py-2 rounded-md"
                        placeholder="(555) 987-6543"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 py-6 px-4 mt-4 max-w-full rounded-lg">
                  <h1 className="text-lg font-semibold">Medical Information</h1>
                  <div>
                    <label className="text-sm">Medical History *</label>
                    <input
                      type="text"
                      name="Medical_History"
                      value={patientdata.Medical_History}
                      onChange={handleChange}
                      className="border w-full border-gray-400 text-sm pl-2 py-5 rounded-md"
                      placeholder="Previous surgeries, chronic conditions, e.t.c"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-sm">Allergies *</label>
                    <input
                      type="text"
                      name="Allergies"
                      value={patientdata.Allergies}
                      onChange={handleChange}
                      className="border w-full border-gray-400 text-sm pl-2 py-5 rounded-md"
                      placeholder="Drug allergies, food allergies, e.t.c"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-sm">Current Medications *</label>
                    <input
                      type="text"
                      name="Current_Medications"
                      value={patientdata.Current_Medications}
                      onChange={handleChange}
                      className="border w-full border-gray-400 text-sm pl-2 py-5 rounded-md"
                      placeholder="List current medications and dosage (or write 'None' if no medications)"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-sm">Interested Treatments *</label>
                    <input
                      type="text"
                      name="Interested_Treatments"
                      value={patientdata.Interested_Treatments}
                      onChange={handleChange}
                      className="border w-full border-gray-400 text-sm pl-2 py-5 rounded-md"
                      placeholder="List treatments the patient is interested in (e.g., Testosterone Therapy, Weight Management, etc.)"
                    />
                  </div>
                </div>
                <div className="mt-3 flex gap-2 justify-end">
                  <button
                    typeof="button"
                    onClick={() => {resetForm(); setisopen(false)}}
                    className="border border-gray-300 cursor-pointer px-3 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    typeof="submit"
                    onClick={() => setisopen(false)}
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
    </div>
  );
}

export default Patient;
