import { useState } from "react";
import roleRoles from "../../Customhooks/roleRoles.js";
import {
  Plus,
  Users,
  UserCheck,
  Shield,
  SettingsIcon,
  Edit,
  Delete,
} from "lucide-react";
import { Dialog } from "@headlessui/react";

function Roles() {
  const { roles, setroles, addRoles, editRoles, removeRoles } = roleRoles();

  const [isopen, setopen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [editopen, seteditopen] = useState(false);
  const [loading, setloading] = useState(false);
  const [editIndex, seteditIndex] = useState(null);
  const [formData, setFormData] = useState({
    rolename: "",
    roletemplate: "",
  });

  //change functionality
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //submit functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];
    if (!formData.rolename) newErrors.push("Role Name is required!");
    setErrors(newErrors);
    if (newErrors.length > 0) return;

    try {
      const result = await addRoles(formData);
      setloading(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (result?.data) console.log("User added:", result.data);
      setFormData({ rolename: "", roletemplate: "" });
      setopen(false);
    } catch (error) {
      console.error("Error creating user:", error);
      setErrors([error.message || "Failed to create user"]);
    }
    setloading(false);
  };

  // reset form when click cancel
  const resetForm = () => {
    setFormData({
      rolename: "",
      roletemplate: "",
    });
  };

  // edit functionality
  const handleEditClick = (user, index) => {
    try {
      seteditIndex(index);
      setFormData(user);
      seteditopen(true);
    } catch (error) {
      console.log("Error occur", error);
      setErrors([error.message || "Failed to update user"]);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = roles[editIndex].id;
      const result = await editRoles(userId, formData);
      if (result) {
        setloading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setFormData({
          rolename: "",
          roletemplate: "",
        });
        seteditopen(false);
      }
    } catch (error) {
      console.log("Error updating user:", error);
      setErrors([error.message || "Failed to update user"]);
    }
    setloading(false);
  };

  // delete functionality
  const handleDelete = async (id) => {
    try {
      const result = await removeRoles(id);
      if (result?.data) {
        setroles((prev) => prev.filter((user) => user.id !== id));
        console.log("user deleted successfully");
      }
    } catch (error) {
      console.log("Error occur", error);
    }
  };

  // status check for capitalize
  const statusCheck = (role) => {
    switch (role) {
      case "admin":
      case "patient":
      case "doctor":
      case "nurse":
        return "System";
      default:
        return "Custom";
    }
  };

  // capital role name
  const capitalRoleName = (rolename)=>{
    switch(rolename){
      case "admin":
        return "Admin";
      case "patient":
        return "Patient";
      default:
        return "Custom";
    }
  }

  // calculate user per role
  const userPerrole = (roleId) => {
    if (!users) return 0;
    return users.filter((user) => user.roleId === roleId).length;
  };

  return (
    <>
      {/* title + desc + button */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <h2 className="text-md font-semibold">Role Management</h2>
          <p className="text-sm text-gray-500">
            Create, edit, and manage user roles in the system
          </p>
        </div>

        <button
          className="bg-blue-500 flex items-center text-sm font-semibold gap-2 float-right text-white py-2 px-4 rounded-md cursor-pointer"
          onClick={() => setopen(true)}
        >
          <Plus size={16} />
          Create New Role
        </button>
      </div>

      {/* cards */}
      <div className="flex flex-wrap items-start gap-4 mt-4">
        {/* Total Roles */}
        <div className="bg-white rounded-md px-6 py-4 flex items-center justify-between border border-gray-200 flex-1 rounded-xl">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Roles</p>
            <p className="text-lg font-bold">{roles.length}</p>
          </div>
          <div className="bg-blue-100 px-2 py-2 text-blue-500 rounded-md">
            <Users size={20} />
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-md px-6 py-4 flex items-center justify-between border border-gray-200 flex-1 rounded-xl">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Users</p>
            <p className="text-lg font-bold">14</p>
          </div>
          <div className="bg-green-100 px-2 py-2 text-green-500 rounded-md">
            <UserCheck size={20} />
          </div>
        </div>

        {/* System Roles */}
        <div className="bg-white rounded-md px-6 py-4 flex items-center justify-between border border-gray-200 flex-1 rounded-xl">
          <div>
            <p className="text-sm font-medium text-gray-600">System Roles</p>
            <p className="text-lg font-bold">10</p>
          </div>
          <div className="bg-orange-100 px-2 py-2 text-orange-500 rounded-md">
            <Shield size={20} />
          </div>
        </div>

        {/* Custom Roles */}
        <div className="bg-white rounded-md px-6 py-4 flex items-center justify-between border border-gray-200 flex-1 rounded-xl">
          <div>
            <p className="text-sm font-medium text-gray-600">Custom Roles</p>
            <p className="text-lg font-bold">10</p>
          </div>
          <div className="bg-purple-100 px-2 py-2 text-purple-500 rounded-md">
            <SettingsIcon size={20} />
          </div>
        </div>
      </div>

      {/* Add Role Information */}
      <Dialog
        open={isopen}
        onClose={() => setopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg h-[40vh] rounded-lg bg-white p-6 shadow-lg overflow-y-auto">
            {/* Title Row */}
            {/* Header that always shows at the top of the modal */}
            <div className="z-10 bg-white">
              {/* <div className="flex items-center gap-2"> */}
              <div>
                <h3 className="text-sm font-semibold">Create New Role</h3>
                <p className="text-gray-500">
                  Create a new role with custom permissions
                </p>
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
            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                {/* Form fields */}
                <div>
                  <label className="text-sm text-gray-700 mb-2 block font-bold">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    name="rolename"
                    placeholder="Enter role name"
                    className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                    value={formData.rolename}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="mt-3 text-sm text-gray-700 mb-2 block font-bold">
                    Basic Role Template
                  </label>
                  <select
                    name="roletemplate"
                    value={formData.roletemplate}
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                  >
                    <option value="">Select base Template</option>
                    <option>Admin Template</option>
                    <option>Consultation Specialist Template</option>
                    <option>Custom (No Template)</option>
                  </select>
                  <p className="text-xs text-gray-500">
                    Start with a template or create custom permissions
                  </p>
                </div>
              </div>

              {/* buttons */}
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setopen(false);
                    resetForm();
                  }}
                  className="mt-4 text-sm border border-gray-300 px-4 py-2 rounded-md mr-2 cursor-pointer hover:bg-gray-100 font-medium"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex items-center justify-end gap-2 mt-4 text-sm text-white border border-gray-300 px-4 py-2 rounded-md mr-2 cursor-pointer bg-blue-500
                    ${
                      loading
                        ? "bg-blue-400 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Creating Role...
                    </>
                  ) : (
                    <>Create Role</>
                  )}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* edit User Modal */}
      <Dialog
        open={editopen}
        onClose={() => seteditopen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg h-[40vh] rounded-lg bg-white p-6 shadow-lg overflow-y-auto">
            <Dialog.Title>
              <p className="text-sm font-bold">Edit Role - Admin</p>
              <p className="text-sm text-gray-500 mt-1">
                Edit role name and description
              </p>
            </Dialog.Title>
            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <div className="mt-3">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block font-bold">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    name="rolename"
                    placeholder="Enter role name"
                    className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                    value={formData.rolename}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="mt-3 text-sm text-gray-700 mb-2 block font-bold">
                    Basic Role Template
                  </label>
                  <input
                    type="text"
                    name="roletemplate"
                    value={formData.roletemplate}
                    onChange={handleChange}
                    className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                  >
                    {/* <option value="">Select base Template</option>
                    <option>Admin Template</option>
                    <option>Consultation Specialist Template</option>
                    <option>Custom (No Template)</option> */}
                  </input>
                </div>
              </div>

              {/* buttons */}
              <div className="flex justify-end">
                <button
                  className="mt-4 text-sm border border-gray-300 px-4 py-2 rounded-md mr-2 cursor-pointer hover:bg-gray-100 font-medium"
                  type="button"
                  onClick={() => seteditopen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex items-center justify-center gap-2 mt-4 text-sm text-white border border-gray-300 px-4 py-2 rounded-md mr-2 cursor-pointer bg-blue-500
                    ${
                      loading
                        ? "bg-blue-400 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Saving Role...
                    </>
                  ) : (
                    <>Save Changes</>
                  )}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Users Table */}
      <div className="mt-6 bg-white rounded-md px-6 py-4 flex items-center flex-wrap border border-gray-200 rounded-xl">
        <div>
          <Shield size={19} />
        </div>
        <div className="text-lg pl-2 font-semibold">
          <h1>System Roles</h1>
        </div>
        <table className="mt-5 w-full border-b border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Role Name
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium">
                Description
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium">
                Users Count
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-15 py-3 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {roles && roles.length > 0 ? (
              // roles.filter((user) => user  && user?.rolename)
              roles.map((user, index, array) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {capitalRoleName(user.rolename)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800 text-sm">
                      {user.roletemplate === "Admin Template"
                        ? "Administrator role with full permissions"
                        : "Custom role with configurable permissions)"}
                    </span>
                  </td>
                  <td className="pl-20 py-4">
                    <span className="font-bold text-xs bg-gray-100 rounded-md px-2 py-1">
                      {3}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-white text-xs bg-blue-500 px-3 py-1 rounded-full">
                      {statusCheck(user.rolename)}
                    </span>
                  </td>

                  {/* buttons */}
                  <td className="pl-4 py-4">
                    <div className="flex items-center gap-2">
                      {/* <button className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
                        <Users size={17} />
                        View Users
                      </button> */}
                      <button
                        onClick={() => {
                          seteditopen(true), handleEditClick(user, index);
                        }}
                        className="flex items-center text-sm gap-2 py-1 px-3 rounded border border-gray-300 hover:bg-gray-200 hover:cursor-pointer"
                      >
                        <Edit size={17} />
                        Edit
                      </button>
                      <button
                        className="flex items-center text-sm gap-2 py-1 px-3 rounded border border-gray-300 hover:bg-red-100 hover:border-red-500 hover:cursor-pointer"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Delete size={17} />
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
    </>
  );
}

export default Roles;
