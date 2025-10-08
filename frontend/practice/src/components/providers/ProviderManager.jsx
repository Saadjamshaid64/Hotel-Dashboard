









import {
  Plus,
  Stethoscope,
  Users,
  MapPin,
  Search,
  Phone,
  Mail,
  Star,
  Edit, Trash2, XCircle
} from "lucide-react";
import { useState } from "react";
import { Button, Dialog } from "@headlessui/react";
function ProviderManager() {
  const [providers, setProviders] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Add User modal
  const [editOpen, setEditOpen] = useState(false); // Edit User modal
  const [errors, setErrors] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    npi: "",
    email: "",
    phone: "",
    status: "active",
    maxPatients: 50,
    currentPatients: 0,
    preferredStates: [],
  });
  
  const handleEditClick = (index) => {
    setEditIndex(index);
    setFormData(providers[index]); // pre-fill form with user data
    setEditOpen(true);
  };

  const SearchWorking = (query) => {
    let filtersearch = providers.filter((q)=>{q!=query})
    return filtersearch
  };


const [editIndex, setEditIndex] = useState(null); // Track which user is being edited
// const [maxPatients, setMaxPatients] = useState(50); // default value
// const [currentPatients, setCurrentPatients] = useState(""); // default value

const handleAddProvider = (newProvider) => {
  setProviders((prev) => [...prev, newProvider]);
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = [];
  if (!formData.name) newErrors.push("Name is required!");
  if (!formData.specialty) newErrors.push("Specialty is required!");
  if (!formData.email) newErrors.push("Email is required!");
  if (!formData.npi) newErrors.push("NPI is required!");
  setErrors(newErrors);
  if (newErrors.length > 0) return;

  // ✅ Add provider to the list, including licensed and preferred states
  setProviders((prev) => [
    ...prev,
    {
      ...formData,
      licensedStates: [...selectedStates],   // <-- add this
      preferredStates: [...preferredStates],
      stateDetails: { ...stateDetails },     // <-- make a copy too
    },
  ]);

  // ✅ Reset everything
  // resetForm();
  setIsOpen(false);
};

const openForm = () => {
  resetForm(); // reset form fields & states
  setIsOpen(true); // open modal
};


  const resetForm = () => {
    setFormData({
      name: "",
      specialty: "",
      npi: "",
      email: "",
      phone: "",
      status: "Active",
      maxPatients: 50, // ✅ default back
      currentPatients: 0,
    });
    // setMaxPatients(50); // default back to 50
    // setCurrentPatients("");
    setErrors([]);
    setSubmittedData({});
    setSelectedStates([]); // <-- reset selected states
    setPreferredStates([]); // <-- reset preferred states too
  };

  // US States for licensing
  const US_STATES = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const STATE_NAMES = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
  };

  const [selectedStates, setSelectedStates] = useState([]); // licensed states
  const [preferredStates, setPreferredStates] = useState([]); // preferred states

  const [activeState, setActiveState] = useState(null); // store the clicked state
  const [stateDetails, setStateDetails] = useState({});

  const [highlightedState, setHighlightedState] = useState(null);


// Toggle licensed state
const toggleState = (state) => {
  let newLicensedStates = formData.licensedStates.includes(state)
    ? formData.licensedStates.filter((s) => s !== state)
    : [...formData.licensedStates, state];

  // Also remove from preferred if removed
  let newPreferredStates = formData.preferredStates.filter((s) =>
    newLicensedStates.includes(s)
  );

    setFormData({
    ...formData,
    licensedStates: newLicensedStates,
    preferredStates: newPreferredStates,
  });
};

const handleDeactivateClick = (id) => {
  setProviders((prev) =>
    prev.map((provider) =>
      provider.id === id
        ? { ...provider, status: provider.status === "Active" ? "Inactive" : "Active" }
        : provider
    )
  );
};


//  handle edit submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProviders((prev) =>
      prev.map((user, idx) => (idx === editIndex ? formData : user))
    );
    setFormData({ name: "",
      specialty: "",
      npi: "",
      email: "",
      phone: "",
      status: "Active",
      maxPatients: 50, // ✅ default back
      currentPatients: 0, });
    setEditOpen(false);
  };

// Toggle preferred state
const togglePreferred = (e, state) => {
  e.stopPropagation(); // prevent parent click
  if (!formData.licensedStates.includes(state)) return; // must be licensed

  let newPreferred = formData.preferredStates.includes(state)
    ? formData.preferredStates.filter((s) => s !== state) // remove if already preferred
    : [...formData.preferredStates, state]; // add if not

  setFormData({ ...formData, preferredStates: newPreferred });

  // Optional: set highlightedState for UI feedback in dialog
  setHighlightedState(state);
};

// delete button functionality
  const handleDelete = (id) => {
    setProviders((prev) => prev.filter((_, index) => index !== id));
  };

  return (
    <div className="">
      {/* ✅ Single parent wrapper */}

      {/* Title + Add User button */}
      <div className="flex justify-between items-start gap-2">
        {/* Left side: icon + text */}
        <div className="flex items-start gap-2 mt-4">
          <Stethoscope className="w-6 h-6 text-blue-600 mt-1" />
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold">Provider Management</h2>
            <p className="text-sm text-gray-600">
              Manage healthcare providers, licensing, and patient routing
            </p>
          </div>
        </div>

        {/* Right side: button */}
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
          onClick={() => {setIsOpen(true);
            resetForm();
          }}
        >
          <Plus size={16} />
          Add Provider
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap items-start gap-4 mt-6">
        {/* Active Providers Card */}
        <div className="flex items-center px-6 py-4 bg-white rounded-lg shadow border border-gray-200 flex-1 min-w-[200px]">
          <div className="p-3 rounded-full">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Active Providers</span>
            <span className="text-2xl font-bold">{providers.length}</span>
          </div>
        </div>

        {/* License States Card */}
        <div className="flex items-center px-6 py-4 bg-white rounded-lg shadow border border-gray-200 flex-1 min-w-[200px]">
          <div className="p-3 rounded-full">
            <MapPin className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Licensed States</span>
            <span className="text-2xl font-bold">{selectedStates.length}</span>
          </div>
        </div>

        {/* Total Patients Card */}
        <div className="flex items-center px-6 py-4 bg-white rounded-lg shadow border border-gray-200 flex-1 min-w-[200px]">
          <div className="p-3 rounded-full">
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Total Patients</span>
            <span className="text-2xl font-bold">100</span>
          </div>
        </div>

        {/* Total Providers Card */}
        <div className="flex items-center px-6 py-4 bg-white rounded-lg shadow border border-gray-200 flex-1 min-w-[200px]">
          <div className="p-3 rounded-full">
            <Stethoscope className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Total Providers</span>
            <span className="text-2xl font-bold">{providers.length}</span>
          </div>
        </div>
      </div>

      {/* Outer container (white background bar) */}
      <div className="bg-white border border-gray-300 px-4 py-3 rounded-lg mt-6 shadow w-full flex items-center justify-between">
        {/* Search bar */}
        <div className="flex items-center border border-gray-300 px-3 py-2 rounded-lg shadow-sm flex-grow">
          <Search className="w-4 h-4 text-gray-500 " />
          <input  
            type="text"
            placeholder="Search Providers by name, specialty, or state..."
            className="ml-3 text-sm outline-none w-xs cursor pointer"
            onChange={(e)=>{SearchWorking(e.target.value)}}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-row space-x-2 ml-4">
          <button className="bg-blue-600 text-white px-2 py-2 rounded-md flex items-center gap-2">
            All ({providers.length})
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-1 py-1 rounded-md">
            Active
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-1 py-1 rounded-md">
            Inactive
          </button>
        </div>
      </div>
      
      {/* Add Provider information */}
      <Dialog open={isOpen} onClose={() => { setIsOpen(false); resetForm(); }} className="relative z-50" >
        
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl h-[90vh] rounded-lg bg-white p-6 shadow-lg overflow-y-auto">
            {/* Title Row */}
            {/* Header that always shows at the top of the modal */}
            <div className="z-10 bg-white">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-semibold">Add New Provider</h3>
              </div>
            </div>

            {errors.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm">
                <ul className="list-disc list-inside">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* White Box for Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-4">
                  {/* Form fields */}
                  <p className="text-sm front-medium mb-4">Basic Information</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Provider Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Dr. John Smith"
                        className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                        value={formData.Name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Specialty
                      </label>
                      <input
                        type="text"
                        name="specialty"
                        placeholder="Endocrinology"
                        className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                        value={formData.specialty}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* NPI Number */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        NPI Number *
                      </label>
                      <input
                        type="number"
                        name="npi"
                        placeholder="Enter NPI number"
                        className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                        value={formData.npi}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Email *
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-sm shadow-sm p-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <input
                          type="email"
                          name="email"
                          placeholder="provider@clinic.com"
                          className="ml-2 w-full text-sm outline-none"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Phone
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-sm shadow-sm p-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <input
                          type="phone"
                          name="phone"
                          placeholder="(555) 123-4567"
                          className="ml-2 w-full text-sm outline-none"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Active Status dropdown */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Status
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-sm px-3 py-2 shadow-sm">
                        <select
                          name="status"
                          className="w-full text-sm outline-none"
                          value={formData.status || "active"}
                          onChange={handleChange}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* </div> */}

                {/* Availability settings */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-4">
                  {/* Subheading */}
                  <p className="text-sm font-medium mb-4">
                    Availability Settings
                  </p>

                  {/* Input fields */}
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Maximum Patients
                      </label>
                      <input
                        type="number"
                        value={formData.maxPatients}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            maxPatients: e.target.value,
                          }))
                        }
                        className="block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Current Patients
                      </label>
                      <input
                        type="number"
                        value={formData.currentPatients}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            currentPatients: e.target.value,
                          }))
                        }
                        className="block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                      />
                    </div>

                    {/* Capacity display */}
                    <p className="text-sm text-gray-600">
                      Capacity: {formData.currentPatients}/{formData.maxPatients}{" "}
                      patients (
                      {formData.maxPatients > 0
                        ? Math.min(
                            100,
                            Math.round(
                              (Number(formData.currentPatients) /
                                Number(formData.maxPatients)) *
                                100
                            )
                          )
                        : 0}
                      % full)
                    </p>

                    {/* <button>
                      Preferred
                    </button> */}
                  </div>
                </div>

                {/* State Licensing */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-4">
                  {/* Subheading */}
                  <p className="text-sm font-medium text-md mb-4">
                    State Licensing *
                  </p>

                  {/* Desc */}
                  <p className="text-sm text-md mb-4 text-gray-500">
                    Select states where this provider is licensed, then mark
                    preferred states for priority routing.
                  </p>

                  {/* Selected states display */}
                  {selectedStates.length > 0 && (
                    <div className="flex flex-col gap-1 mb-2">
                      <h2 className="text-sm font-medium">Licensed States:</h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedStates.map((state) => (
                          <div
                            key={state}
                            className={`flex items-center gap-1 px-2 font-medium py-1 rounded-full text-xs border cursor-pointer
                            ${
                              highlightedState === state
                                ? "bg-blue-200 text-blue-800 border-blue-400"
                                : "bg-gray-200 text-gray-700 border-gray-300"
                            }`}
                            onClick={() =>
                              setHighlightedState((prev) =>
                                prev === state ? null : state
                              )
                            }
                          >
                            {state}
                            <span
                              className="cursor-pointer font-bold text-sm ml-1"
                              onClick={(e) => {
                                e.stopPropagation(); // prevent highlight toggle
                                setSelectedStates(
                                  selectedStates.filter((s) => s !== state)
                                );
                              }}
                            >
                              ×
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Show all selected states with input fields */}
                  {selectedStates.length > 0 && (
                    <div className="mt-4">
                      <h2 className="text-sm font-medium mb-4">
                        License Details by State::
                      </h2>
                      {selectedStates.map((state) => (
                        <div
                          key={state}
                          className="bg-gray-100 p-4 rounded-lg mt-2 border border-gray-300"
                        >
                          {/* Top row: Short + Full Name + Set Preferred Button */}
                          <div className="flex items-center justify-between mb-3">
                            {/* Short + Full Name */}
                            <div className="flex items-center gap-2">
                              {/* Circle */}
                              <div
                                className={`rounded-full w-6 h-6 flex items-center justify-center text-xs
                                ${
                                  highlightedState === state
                                    ? "bg-blue-200 text-blue-800 border-blue-400"
                                    : "bg-gray-200 text-black border-gray-300"
                                }`}
                              >
                                {state}
                              </div>
                              <span className="text-sm ml-1">
                                {STATE_NAMES[state]}
                              </span>
                            </div>

                            {/* Set Preferred Button */}
                            {/* <button
                              type="button"
                              className="text-sm font-medium cursor-pointer px-3 py-1 rounded hover:bg-gray-300 transition-colors" */}
                              {/* // onClick={() => */}
                              {/* //   setHighlightedState((prev) =>
                              //     prev === state ? null : state
                              //   )
                              // }

                              
                            //   onClick={(e) => togglePreferred(e, state)}
                            // >
                            //   Set Preferred
                            // </button> */}

                            {/* <button
    type="button"
    className={`text-sm font-medium cursor-pointer px-3 py-1 rounded transition-colors ${
      formData.preferredStates.includes(state)
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-700"
    }`}
    onClick={(e) => togglePreferred(e, state)}
  >
    Set Preferred
  </button> */}

                      </div>

                          {/* Input fields */}
                          <div className="flex gap-8 flex-wrap ">
                            <div>
                              <label className="text-xs block mb-1">
                                License Number
                              </label>
                              <input
                                type="text"
                                placeholder={`${STATE_NAMES[state]} License Number`}
                                className="p-2 rounded-md bg-white border border-gray-300 text-sm w-90"
                                value={stateDetails[state]?.field1 || ""}
                                onChange={(e) =>
                                  setStateDetails((prev) => ({
                                    ...prev,
                                    [state]: {
                                      ...prev[state],
                                      field1: e.target.value,
                                    },
                                  }))
                                }
                              />
                            </div>
                            <div>
                              <label className="text-xs block mb-1">
                                Expiration Date
                              </label>
                              <input
                                type="date"
                                className="p-2 rounded-md bg-white border border-gray-300 text-sm w-90"
                                value={stateDetails[state]?.field2 || ""}
                                onChange={(e) =>
                                  setStateDetails((prev) => ({
                                    ...prev,
                                    [state]: {
                                      ...prev[state],
                                      field2: e.target.value,
                                    },
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm font-medium mt-3">Select States:</p>

                  {/* states shows */}
                  <div className="border border-gray-200 rounded-md mt-3 mb-3 p-3 overflow-y-auto grid grid-cols-10 gap-3">
                    {US_STATES.map((state) => {
                      const isSelected = selectedStates.includes(state);

                      return (
                        <div
                          key={state}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedStates(
                                selectedStates.filter((s) => s !== state)
                              );
                              if (activeState === state) setActiveState(null); // close panel if removed
                            } else {
                              setSelectedStates([...selectedStates, state]);
                              setActiveState(state); // open panel for new state
                            }
                          }}
                          className={`border border-gray-200 rounded-sm py-2 h-8 ml-4 w-10 text-center text-xs font-medium cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-blue-200 text-blue-500 border-blue-900"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          } hover:border-gray-400`}
                        >
                          {state}
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs text-gray-500">
                    Click state abbreviations to toggle licensing. Click stars to
                    set preferred states for priority routing.
                  </p>
                </div>

                {/* Buttons at the end */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer"
                    onclick={()=>{resetForm()}}
                  >
                    Create Provider
                  </button>
                </div>
              </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Users Table */}
      <div className="mt-6 overflow-x-auto">
        {/* <table className="w-full bg-white border border-gray-200 rounded-lg"> */}
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">

          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Provider
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                NPI
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                State Licenses
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                Expiration Status
              </th>
              <th className="px-8 py-3 text-left text-sm font-medium text-gray-600">
                Contact
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                Licensed States
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                Preferred States
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium text-gray-600 flex flex-row">
                Patient Load
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {providers.length > 0 ? (
              providers.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xs">
                        {user.name[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.specialty}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* NPI in its own column */}
                  <td className="px-15 py-4 text-sm text-gray-800">
                    {user.npi}
                  </td>

                  {/* state license in its own column */}
                  <td className="px-15 py-4 text-sm text-gray-800">
                    {user.licensedStates && user.licensedStates.length >0 &&
                      user.licensedStates.map((state) => (
                        <div key={state} className="mr-2 mt-2 flex items-center gap-1">
                          <span className="px-3 py-1 text-xs font-bold text-gray-600 border border-gray-300 rounded-full">
                            {state}
                          </span>
                          <span className="ml-1 text-xs whitespace-nowrap">
                            {( user.licensedStates && user.stateDetails[state]?.field1) ||
                              "No License #"}
                          </span>
                        </div>
                      ))}
                  </td>

                  {/* state expiration in its own column */}
                  <td className="px-15 py-4 text-sm text-gray-800">
                    {user.licensedStates && user.licensedStates.length >0 &&
                      user.licensedStates.map((state) => {
                        const expiration = stateDetails?.[state]?.field2; // get expiration date
                        return (
                          <div key={state} className="mr-2 mt-2">
                            {expiration ? (
                              <div className="flex flex-row gap-1">
                                <span className="px-3 py-1 text-xs font-bold text-gray-600 border border-gray-300 rounded-full">
                                  {state}
                                </span>
                                <span className="ml-1 text-xs whitespace-nowrap mt-3">
                                  {expiration}
                                </span>
                                <span className="bg-red-200 text-red-700 text-xs ml-2 mt-2 py-1 px-2 rounded-full">
                                  Expired
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">
                                No Data
                              </span>
                            )}
                          </div>
                        );
                      })}
                  </td>

                  <td className="px-8 font-medium py-4 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      {/* Email with icon */}
                      <span className="text-gray-500">
                        <Mail size={14} />{" "}
                        {/* Example: lucide-react, heroicons, or your Ema component */}
                      </span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {/* Phone with icon */}
                      <span className="text-gray-500">
                        <Phone size={14} />{" "}
                        {/* Use your Phone icon component */}
                      </span>
                      <span>{user.phone}</span>
                    </div>
                  </td>

                  <td className="px-15 py-4 text-sm text-gray-800">
                    <div className="flex flex-row items-center gap-2">
                      {/* Location Icon */}
                      <MapPin size={16} className="text-gray-600" />

                      {/* States */}
                      {user.licensedStates?.slice(0, 4).map((state) => (
                        <span
                          key={state}
                          className="px-3 py-1 text-xs font-bold text-gray-600 border border-gray-300 rounded-full"
                        >
                          {state}
                        </span>
                      ))}

                      {/* Show +X if more than 4 states */}
                      {user.licensedStates && user.licensedStates.length > 4 && (
                        <span className="px-3 py-1 text-xs font-bold text-gray-600 border border-gray-300 rounded-full">
                          +{user.licensedStates.length - 4}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* preferred state in its own column */}
                  <td className="px-15 py-4 text-sm text-gray-800">
                    <div className="flex flex-row items-center gap-2">
                      {/* Location Icon */}
                      <Star size={16} className="text-yellow-600" />

                      {user.preferredStates && user.preferredStates.length > 0 ? (
                        user.preferredStates.map((state) => (
                          <div key={state} className="inline-block mr-2 mt-2">
                            <span className="px-3 py-1 text-xs font-bold text-yellow-600 rounded-full bg-yellow-100">
                              {state}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">None</span>
                      )}
                    </div>
                  </td>

                  {/* patient loads with status bar */}
                  <td className="px-15 py-4 text-sm text-gray-800">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-medium text-gray-600">
                        {user.currentPatients}/{user.maxPatients} (
                        {user.maxPatients > 0
                          ? Math.round(
                              (user.currentPatients / user.maxPatients) * 100
                            )
                          : 0}
                        %)
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${
                              user.maxPatients > 0
                                ? Math.min(
                                    100,
                                    Math.round(
                                      (user.currentPatients /
                                        user.maxPatients) *
                                        100
                                    )
                                  )
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="ml-16 text-sm text-green-600 bg-green-200 rounded-full px-3 py-1 capitalize">
                      {user.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {/* Edit Button */}
                    <button className="flex items-center gap-1 text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded-md cursor-pointer"
                    onClick={() => handleEditClick(index)}>

                      <Edit size={16} />
                      Edit
                    </button>

                    {/* Deactivate Button */}
                    <button
                      className="flex items-center gap-1 text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded-md hover:bg-red-100  hover:border-red-600 cursor-pointer"
                      onClick={() => handleDeactivateClick(index)}
                    >
                      <XCircle size={16} />
                      {formData.status === "Active" ? "Deactivate" : "Activate"}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(index)}
                      className="flex items-center gap-1 text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded-md hover:bg-red-50 hover:text-red-500 hover:border-red-400 cursor-pointer"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Nothing to show
                </td>
              </tr>

            )}
          </tbody>
        </table>
      </div>

            {/* Edit User Modal */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} className="relative z-50">

        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">

          <Dialog.Panel className="w-full max-w-4xl h-[90vh] rounded-lg bg-white p-6 shadow-lg overflow-y-auto">
          <div className= "gap-2 mt-4">
         <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold">Edit Provider</h2>
          </div>
            <form className="" onSubmit={handleEditSubmit}>
            
              <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-4">
                {/* Form fields */}
                <p className="text-sm font-bold mb-4">Basic Information</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Provider Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Dr. John Smith"
                      className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Specialty
                    </label>
                    <input
                      type="text"
                      name="specialty"
                      placeholder="Endocrinology"
                      className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                      value={formData.specialty}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* NPI Number */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      NPI Number *
                    </label>
                    <input
                      type="number"
                      name="npi"
                      placeholder="Enter NPI number"
                      className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                      value={formData.npi}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Email *
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-sm shadow-sm p-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        placeholder="provider@clinic.com"
                        className="ml-2 w-full text-sm outline-none"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Phone
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-sm shadow-sm p-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <input
                        type="phone"
                        name="phone"
                        placeholder="(555) 123-4567"
                        className="ml-2 w-full text-sm outline-none"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Active Status dropdown */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Status
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-sm px-3 py-2 shadow-sm">
                      <select
                        name="status"
                        className="w-full text-sm outline-none"
                        value={formData.status || "active"}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>


              {/* Availability settings */}
              <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-4">
                {/* Subheading */}
                <p className="text-sm font-medium mb-4">
                  Availability Settings
                </p>

                {/* Input fields */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Maximum Patients
                    </label>
                    <input
                      type="number"
                      value={formData.maxPatients}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          maxPatients: e.target.value,
                        }))
                      }
                      className="block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Current Patients
                    </label>
                    <input
                      type="number"
                      value={formData.currentPatients}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          currentPatients: e.target.value,
                        }))
                      }
                      className="block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                    />
                  </div>

                  {/* Capacity display */}
                  <p className="text-sm text-gray-600">
                    Capacity: {formData.currentPatients}/{formData.maxPatients}{" "}
                    patients (
                    {formData.maxPatients > 0
                      ? Math.min(
                          100,
                          Math.round(
                            (Number(formData.currentPatients) /
                              Number(formData.maxPatients)) *
                              100
                          )
                        )
                      : 0}
                    % full)
                  </p>
                </div>
              </div>

              {/* State Licensing */}
              <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm mt-4">
                {/* Subheading */}
                <p className="text-sm font-medium text-md mb-4">
                  State Licensing *
                </p>

                {/* Desc */}
                <p className="text-sm text-md mb-4 text-gray-500">
                  Select states where this provider is licensed, then mark
                  preferred states for priority routing.
                </p>

                {/* Selected states display */}
                {selectedStates.length > 0 && (
                  <div className="flex flex-col gap-1 mb-2">
                    <h2 className="text-sm font-medium">Licensed States:</h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedStates.map((state) => (
                        <div
                          key={state}
                          className={`flex items-center gap-1 px-2 font-medium py-1 rounded-full text-xs border cursor-pointer
                          ${
                            highlightedState === state
                              ? "bg-blue-200 text-blue-800 border-blue-400"
                              : "bg-gray-200 text-gray-700 border-gray-300"
                          }`}
                          onClick={() =>
                            setHighlightedState((prev) =>
                              prev === state ? null : state
                            )
                          }
                        >
                          {state}
                          <span
                            className="cursor-pointer font-bold text-sm ml-1"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent highlight toggle
                              setSelectedStates(
                                selectedStates.filter((s) => s !== state)
                              );
                            }}
                          >
                            ×
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show all selected states with input fields */}
                {selectedStates.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-sm font-medium mb-4">
                      License Details by State::
                    </h2>
                    {selectedStates.map((state) => (
                      <div
                        key={state}
                        className="bg-gray-100 p-4 rounded-lg mt-2 border border-gray-300"
                      >
                        {/* Top row: Short + Full Name + Set Preferred Button */}
                        <div className="flex items-center justify-between mb-3">
                          {/* Short + Full Name */}
                          <div className="flex items-center gap-2">
                            {/* Circle */}
                            <div
                              className={`rounded-full w-6 h-6 flex items-center justify-center text-xs
                              ${
                                highlightedState === state
                                  ? "bg-blue-200 text-blue-800 border-blue-400"
                                  : "bg-gray-200 text-black border-gray-300"
                              }`}
                            >
                              {state}
                            </div>
                            <span className="text-sm ml-1">
                              {STATE_NAMES[state]}
                            </span>
                          </div>
                     </div>

                        {/* Input fields */}
                        <div className="flex gap-8 flex-wrap ">
                          <div>
                            <label className="text-xs block mb-1">
                              License Number
                            </label>
                            <input
                              type="text"
                              placeholder={`${STATE_NAMES[state]} License Number`}
                              className="p-2 rounded-md bg-white border border-gray-300 text-sm w-90"
                              value={stateDetails[state]?.field1 || ""}
                              onChange={(e) =>
                                setStateDetails((prev) => ({
                                  ...prev,
                                  [state]: {
                                    ...prev[state],
                                    field1: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs block mb-1">
                              Expiration Date
                            </label>
                            <input
                              type="date"
                              className="p-2 rounded-md bg-white border border-gray-300 text-sm w-90"
                              value={stateDetails[state]?.field2 || ""}
                              onChange={(e) =>
                                setStateDetails((prev) => ({
                                  ...prev,
                                  [state]: {
                                    ...prev[state],
                                    field2: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-sm font-medium mt-3">Select States:</p>

                {/* states shows */}
                <div className="border border-gray-200 rounded-md mt-3 mb-3 p-3 overflow-y-auto grid grid-cols-10 gap-3">
                  {US_STATES.map((state) => {
                    const isSelected = selectedStates.includes(state);

                    return (
                      <div
                        key={state}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedStates(
                              selectedStates.filter((s) => s !== state)
                            );
                            if (activeState === state) setActiveState(null); // close panel if removed
                          } else {
                            setSelectedStates([...selectedStates, state]);
                            setActiveState(state); // open panel for new state
                          }
                        }}
                        className={`border border-gray-200 rounded-sm py-2 h-8 ml-4 w-10 text-center text-xs font-medium cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-200 text-blue-500 border-blue-900"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        } hover:border-gray-400`}
                      >
                        {state}
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs text-gray-500">
                  Click state abbreviations to toggle licensing. Click stars to
                  set preferred states for priority routing.
                </p>
              </div>            

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-5 text-sm font-medium">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white cursor-pointer"
                >
                  Update Provider
                </button>
              </div>
            </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div> // ✅ Closing parent wrapper
  );
}

export default ProviderManager;
