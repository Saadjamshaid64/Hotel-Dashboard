import { Dialog } from "@headlessui/react";
import { Plus } from "lucide-react";
import { use, useState } from "react";
import usePatients from "../Customhooks/usePatients.js";
import { useProviders } from "../Customhooks/useProvider.js";
import useSchedule from "../Customhooks/useSchedule.js";

export default function Schedule() {
  const [isopen, setisopen] = useState(false);
  const [editopen, seteditopen] = useState(false);
  const [editindex, seteditindex] = useState(null);
  const [errors, seterrors] = useState([]);
  const [scheduleset, setscheduleset] = useState({
    patientId: "",
    providerId: "",
    date: "",
    time: "",
  });

  const { patients } = usePatients();

  const { user } = useProviders();

  const {
    schedule,
    setschedule,
    createScheduleHook,
    editScheduleHook,
    deleteScheduleHook,
  } = useSchedule();

  // time slots
  const timeSlots = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",

    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
  ];

  //week days
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // submit functionality
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const newErrors = [];

    // if (!Patient_Name) newErrors.push("Patient Name is required");
    // if (!Provider_Name) newErrors.push("Provider Name is required");
    // if (!date) newErrors.push("date is required");
    // if (!time) newErrors.push("time number is required");

    // seterrors(newErrors);
    // if (newErrors.length > 0) return;

    try {
      const result = await createScheduleHook(scheduleset);
      if (result?.data) {
        console.log("Schedule added Successfully");
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

  // change functionality
  const handleChange = (e) => {
    const { name, value } = e.target;
    setscheduleset((prev) => ({ ...prev, [name]: value }));
  };

  // reset form
  const resetForm = () => {
    setscheduleset({
      patientId: "",
      providerId: "",
      date: "",
      time: "",
    });
  };

  // convert date to day
  const getWeekday = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" }); // returns "Monday", "Tuesday" ...
  };

  // edit functionality
  const EditClickHandle = (booked) => {
    try {
      console.log("schedule array:", schedule);
      console.log("editindex:", editindex);

      const index = schedule.findIndex((s) => s.id === booked.id);
      seteditindex(index);
      setscheduleset(booked);
      seteditopen(true);
    } catch (error) {
      cconsole.log("Error occur", error);
      setErrors([error.message || "Failed to update Schedule"]);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const id = schedule[editindex].id;
      const res = await editScheduleHook(id, scheduleset);
      if (res?.data) {
        console.log("Schedule edited successfully");
        resetForm();
        seteditopen(false);
      }
    } catch (error) {
      console.log("Error updating Schedule:", error);
      seterrors([error.message || "Failed to update Schedule"]);
    }
  };

  // delete functionality
  const handleDelete = async (id) => {
    if (!scheduleset?.id) {
      console.error("No schedule selected for delete");
      seterrors(["No schedule selected"]);
      return;
    }
    try {
      const res = await deleteScheduleHook(scheduleset.id);
      if (res?.data) {
        console.log("Schedule deleted successfully in UI");
        setschedule((prev) => prev.filter((p) => p.id !== scheduleset.id));
      }

      seteditopen(false)
    } catch (error) {
      console.log("Error delete Schedule:", error);
      seterrors([error.message || "Failed to delete Schedule"]);
    }
  };

  return (
    <div className="ml-64 p-6 text-left">
      <p className="mb-4">
        Welcome To the Schedule tab for create and manages Schedules
      </p>

      {/* title + desc + button*/}
      <div className="flex items-start justify-between mb-6">
        {/* Left Section: Title + Paragraph */}
        <div>
          <h1 className="text-xl font-bold">Schedule Management</h1>
          <p className="text-gray-600">
            Manage appointments and calendar events (Eastern Time)
          </p>
        </div>

        {/* Right Section: Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
          onClick={() => setisopen(true)}
        >
          <Plus size={18} />
          Book Appointment
        </button>
      </div>

      {/* Add Schedule Model */}
      <Dialog
        open={isopen}
        onClose={() => setisopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true"></div>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md h-[450px] rounded-lg bg-white p-6">
            <Dialog.Title className="text-base font-semibold mb-2">
              Book New Appointment
            </Dialog.Title>
            <p className="text-sm text-gray-500">
              Schedule a new appointment for a patient
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <div>
                  <label className="text-sm">Patient/Lead Name *</label>
                  <select
                    name="patientId"
                    value={scheduleset.patientId}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    autoFocus
                  >
                    <option value="" disabled>
                      Select patient or Lead
                    </option>
                    {patients.length > 0 ? (
                      patients.map((user, index, array) => (
                        <option key={index} value={user.id}>
                          {user.First_Name} {user.Last_Name}
                        </option>
                      ))
                    ) : (
                      <p></p>
                    )}
                  </select>
                </div>

                <div className="mt-3">
                  <label className="text-sm">Provider/Advisor *</label>
                  <select
                    name="providerId"
                    value={scheduleset.providerId}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  >
                    <option value="" disabled>
                      Select provider
                    </option>
                    {user.length > 0 ? (
                      user.map((users, index, array) => (
                        <option key={index} value={users.id}>
                          {users.providername}
                        </option>
                      ))
                    ) : (
                      <p>Nothing to Show</p>
                    )}
                  </select>
                </div>

                <div className="mt-3">
                  <label className="text-sm">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={scheduleset.date}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>

                <div className="mt-3">
                  <label className="text-sm">Time *</label>
                  <select
                    name="time"
                    value={scheduleset.time}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  >
                    <option value="" disabled>
                      Select time
                    </option>
                    {timeSlots.map((user, index) => (
                      <option key={index}>{user}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white w-full mt-3 rounded-md py-2 text-sm cursor-pointer"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Schedule Model */}
      <Dialog
        open={editopen}
        onClose={() => seteditopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md h-[450px] rounded-lg bg-white p-6">
            <Dialog.Title className="text-base font-semibold mb-2">
              Update Appointment
            </Dialog.Title>
            <p className="text-sm text-gray-400">
              Modify the selected appointment
            </p>

            <form onSubmit={handleEditSubmit}>
              <div className="mt-3">
                <div>
                  <label className="text-sm">Patient/Lead Name *</label>
                  <select
                    name="patientId"
                    value={scheduleset.patientId}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    autoFocus
                  >
                    <option value="" disabled>
                      Select patient or Lead
                    </option>
                    {patients.length > 0 ? (
                      patients.map((user, index, array) => (
                        <option key={index} value={user.id}>
                          {user.First_Name} {user.Last_Name}
                        </option>
                      ))
                    ) : (
                      <p></p>
                    )}
                  </select>
                </div>

                <div className="mt-3">
                  <label className="text-sm">Provider/Advisor *</label>
                  <select
                    name="providerId"
                    value={scheduleset.providerId}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  >
                    <option value="" disabled>
                      Select provider
                    </option>
                    {user.length > 0 ? (
                      user.map((users, index, array) => (
                        <option key={index} value={users.id}>
                          {users.providername}
                        </option>
                      ))
                    ) : (
                      <p>Nothing to Show</p>
                    )}
                  </select>
                </div>

                <div className="mt-3">
                  <label className="text-sm">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={scheduleset.date}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  />
                </div>

                <div className="mt-3">
                  <label className="text-sm">Time *</label>
                  <select
                    name="time"
                    value={scheduleset.time}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  >
                    <option value="" disabled>
                      Select time
                    </option>
                    {timeSlots.map((user, index) => (
                      <option key={index}>{user}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center mt-3 gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white w-full rounded-md py-2 text-sm cursor-pointer"
                  >
                    Update Appointment
                  </button>

                  <button
                    className="w-full text-white bg-red-600 text-sm py-2 cursor-pointer rounded-md"
                    type="button"
                    onClick={handleDelete}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* 📅 Schedule Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="border border-gray-200 p-2 w-24 text-center">
                Time
              </th>
              {weekDays.map((day) => (
                <th
                  key={day}
                  className="border border-gray-200 p-2 text-center font-medium"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, index) => (
              <tr key={index}>
                <td className="border border-gray-200 text-sm text-center font-medium text-gray-700 p-2">
                  {time}
                </td>

                {weekDays.map((day) => {
                  // Check if schedule exists for this day and time
                  const booked = schedule.find(
                    (s) => getWeekday(s.date) === day && s.time === time
                  );

                  const patientName = patients.find(
                    (p) => p.id === booked?.patientId
                  )?.First_Name;
                  const providerName = user.find(
                    (u) => u.id === booked?.providerId
                  )?.providername;

                  return (
                    <td
                      key={`${day}-${time}`}
                      className={`border border-gray-200 text-center p-2 ${
                        booked
                          ? "bg-blue-100 cursor-default"
                          : "cursor-pointer hover:bg-blue-100"
                      }`}
                    >
                      {booked ? (
                        <div
                          className="text-sm text-blue-600 font-medium flex flex-col cursor-pointer"
                          onClick={() => {
                            EditClickHandle(booked);
                          }}
                        >
                          <span>{patientName}</span>
                          <span>{providerName}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="text-sm text-gray-500 font-medium cursor-pointer"
                          onClick={() => setisopen(true)}
                        >
                          Click to book
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
