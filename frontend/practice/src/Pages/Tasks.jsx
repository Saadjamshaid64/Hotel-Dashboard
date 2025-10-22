import { useState } from "react";
import useTasks from "../Customhooks/useTasks.js";
import { useUsers } from "../Customhooks/useUsers.js";
import usePatients from "../Customhooks/usePatients.js";
import { ClipboardList, Pencil, Trash2, Plus } from "lucide-react";
import { Dialog } from "@headlessui/react";

export default function Tasks() {
  const { tasks, createTaskHook, editTaskHook, deleteTaskHook } = useTasks();
  const { users } = useUsers();
  const { patients } = usePatients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editisModalOpen, seteditIsModalOpen] = useState(false);
  const [editindex, seteditindex] = useState(null);
  const [errors, setErrors] = useState([]);
  const [taskData, setTaskData] = useState({
    message: "",
    UserId: "",
    patientId: "",
    status: "Open",
  });

  // change functionality
  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  // submit functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!taskData.message) newErrors.push("Task message is required");
    if (!taskData.UserId) newErrors.push("Assigned user is required");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const dataToSend = {
        ...taskData,
        patientId: taskData.patientId || null,
      };

      const result = await createTaskHook(dataToSend);
      if (result?.data) {
        console.log("Task added Successfully");
        setIsModalOpen(false);
        resetForm();
        return result;
      }
      console.log("Task not created Successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      setErrors([error.message || "Failed to create task"]);
    }
  };

  // reset form
  const resetForm = () => {
    setTaskData({
      message: "",
      UserId: "",
      patientId: "",
      status: "Open",
    });
    setErrors([]);
  };

  // delete functionality
  const handleDelete = async (id) => {
    try {
      const res = await deleteTaskHook(id);
      if (res) {
        setTasks((prev) => prev.filter((p) => p.id !== id));
        console.log("Delete successfully");
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // edit functionality
  const handleEdit = (task, index) => {
    try {
      seteditindex(index);
      setTaskData(task);
      seteditIsModalOpen(true);
    } catch (error) {
      console.log("Error occurred", error);
      setErrors([error.message || "Failed to prepare task for editing"]);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!taskData.message) newErrors.push("Task message is required");
    if (!taskData.UserId) newErrors.push("Assigned user is required");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const id = tasks[editindex].id;
      const result = await editTaskHook(id, taskData);
      if (result?.data) {
        console.log("Task updated successfully");
        resetForm();
        seteditIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setErrors([error.message || "Failed to update task"]);
    }
  };

  return (
    <div className="ml-64 p-6 text-left">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <ClipboardList className="h-6 w-6" />
          Tasks Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center gap-2 cursor-pointer"
        >
          <span>
            <Plus size={18} />
          </span>
          <span>New Task</span>
        </button>
      </div>

      {/* Add Task Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true"></div>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md h-[470px] rounded-lg bg-white p-6">
            <Dialog.Title className="text-base font-semibold mb-2">
              Add New Task
            </Dialog.Title>
            <p className="text-sm text-gray-500">
              Create a new task and assign it to a user
            </p>

            <form onSubmit={handleSubmit}>
              {errors.length > 0 && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-md text-sm">
                  <ul className="list-disc list-inside">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-3">
                <div>
                  <label className="text-sm">Task Message *</label>
                  <textarea
                    name="message"
                    value={taskData.message}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    rows="2"
                    autoFocus
                  />
                </div>

                <div className="mt-3">
                  <label className="text-sm">Assigned To *</label>
                  <select
                    name="UserId"
                    value={taskData.UserId}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    required
                  >
                    <option value="" disabled>
                      Select User
                    </option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstname} {user.lastname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-3">
                  <label className="text-sm">Link to Patient</label>
                  <select
                    name="patientId"
                    value={taskData.patientId || ""}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  >
                    <option value="">Select Patient (Optional)</option>
                    {patients?.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.First_Name} {patient.Last_Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-3">
                  <label className="text-sm">Status *</label>
                  <select
                    name="status"
                    value={taskData.status}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-sm text-white bg-blue-500 rounded-md cursor pointer"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Task Modal */}
      <Dialog
        open={editisModalOpen}
        onClose={() => seteditIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md h-[470px] rounded-lg bg-white p-6">
            <Dialog.Title className="text-base font-semibold mb-2">
              Edit Task
            </Dialog.Title>
            <p className="text-sm text-gray-500">
              Update task details and assignments
            </p>

            <form onSubmit={handleEditSubmit}>
              {errors.length > 0 && (
                <div className="bg-red-50 text-red-600 rounded-md p-3 mt-3">
                  <ul className="list-disc list-inside text-sm">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-3">
                <div>
                  <label className="text-sm">Task Message *</label>
                  <textarea
                    name="message"
                    value={taskData.message}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    rows="2"
                    autoFocus
                  />
                </div>

                <div className="mt-3">
                  <label className="text-sm">Assigned To *</label>
                  <select
                    name="UserId"
                    value={taskData.UserId}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                    required
                  >
                    <option value="">Select User</option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstname} {user.lastname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-3">
                  <label className="text-sm">Link to Patient</label>
                  <select
                    name="patientId"
                    value={taskData.patientId || ""}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  >
                    <option value="">Select Patient (Optional)</option>
                    {patients?.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.First_Name} {patient.Last_Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-3">
                  <label className="text-sm">Status *</label>
                  <select
                    name="status"
                    value={taskData.status}
                    onChange={handleChange}
                    className="w-full border text-sm border-gray-300 pl-2 py-2 rounded-md"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      seteditIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-3 py-1.5 text-sm border border-gray-300 cursor-pointer rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-sm text-white bg-blue-500 cursor-pointer rounded-md hover:bg-blue-600"
                  >
                    Update Task
                  </button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* tasks table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Task Message
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Priority
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Linked to
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks?.map((task, index) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{task.message}</td>
                  <td className="px-6 py-4">
                    {task?.User
                      ? `${task.User.firstname} ${task.User.lastname}`
                      : ""}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-sm fond-bold bg-orange-200">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        task.status === "done"
                          ? "bg-green-100 text-green-800"
                          : task.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-sm text-blue-700">
                      {task?.Patient
                        ? `${task.Patient.First_Name} ${task.Patient.Last_Name}`
                        : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(task, index)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
