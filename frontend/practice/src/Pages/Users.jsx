import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProviderManager from "../components/providers/ProviderManager.jsx"; // import component
import { useUsers } from "../Customhooks/useUsers.js";
import Roles from "../components/Roles/Roles.jsx";
import roleRoles from "../Customhooks/roleRoles.js";
import Service  from "../components/Services/Service.jsx";

function Users() {
  const { users, addUsers, setUsers, editUser, removeUser } = useUsers();
  const { roles, fetchRoles } = roleRoles();

  const [activeTab, setActiveTab] = useState("management");
  const [isOpen, setIsOpen] = useState(false); // Add User modal
  const [editOpen, setEditOpen] = useState(false); // Edit User modal
  const [errors, setErrors] = useState([]); // check validation
  const [loading, setloading] = useState(false); // for spinning in local state
  const [tabloading, settablaoding] = useState(false); // for spinning in provider tab
  const [editIndex, setEditIndex] = useState(null); // Track which user is being edited (index track)
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    roleId: "",
    password: "",
  });

  // fetch when whenever roles change
  // useEffect(() => {
  //   fetchRoles();
  // }, [roles]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit functionality
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = [];
    if (!formData.firstname) newErrors.push("First name is required!");
    if (!formData.lastname) newErrors.push("Last name is required!");
    if (!formData.email) newErrors.push("Email is required!");
    if (!formData.roleId) newErrors.push("Role is required!");
    if (!formData.password) newErrors.push("Password is required!");
    setErrors(newErrors);
    if (newErrors.length > 0) return;

    try {
      setloading(true);
      const result = await addUsers(formData);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      if (result?.data) {
        console.log("User added:", result.data);
        // setUsers((prev) => [...prev, result.data])
        // setFormData({
        //   firstname: "",
        //   lastname: "",
        //   email: "",
        //   roleId: "",
        //   password: "",
        // });
        resetForm();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrors([error.message || "Failed to create user"]);
    }
    setloading(false);
  };

  // reset form
  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      roleId: "",
      password: "",
    });
  };

  // delete functionality
  const handleDelete = async (id) => {
    try {
      const result = await removeUser(id);
      if (result?.data) {
        setloading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setUsers((prev) => prev.filter((user) => user.id !== id));
        console.log("user deleted successfully");
      }
    } catch (error) {
      console.log("Error occur", error);
    }
    setloading(false);
  };

  // edit functionality
  const handleEditClick = async (user, index) => {
    try {
      setEditIndex(index);
      // setFormData(submittedData[index]); // pre-fill form with user data
      setFormData(user); // pre-fill form with user data
      setEditOpen(true);
    } catch (error) {
      console.log("Error occur", error);
      setErrors([error.message || "Failed to update user"]);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = users[editIndex].id; // get user id from state
      const result = await editUser(userId, formData); // call API to update

      if (result) {
        // update frontend state
        // setUsers((prev) => prev.map((user, idx) => (idx === editIndex ? result.data : user)));
        setloading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          roleId: "",
          password: "",
        });
        setEditOpen(false); // close modal
      }
    } catch (error) {
      console.log("Error updating user:", error);
      setErrors([error.message || "Failed to update user"]);
    }
    setloading(false);
  };

  // const handleAddUserClick = () => {
  //   setFormData({
  //     firstname: "",
  //     lastname: "",
  //     email: "",
  //     role: "",
  //     password: "",
  //   }); // reset form
  //   setIsOpen(true); // open add user modal
  // };

  return (
    <div className="ml-64 p-6 text-left">
      <h1 className="text-xl font-bold mb-4">System Settings</h1>
      <p className="mb-6">
        Manage users, permissions, and system configuration
      </p>

      {/* Tabs */}
      <div className="mt-1 inline-flex bg-gray-100 rounded-md shadow-sm p-1">
        <button
          onClick={() => setActiveTab("management")}
          className={`px-4 py-2 text-sm rounded-md transition cursor-pointer ${
            activeTab === "management"
              ? "bg-white text-700 font-semibold shadow-sm"
              : "text-gray-600 font-normal"
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          className={`px-4 py-2 text-sm rounded-md transition cursor-pointer ${
            activeTab === "roles"
              ? "bg-white text-700 font-semibold shadow-sm"
              : "text-gray-600 font-normal"
          }`}
        >
          Roles
        </button>
        <button
          onClick={() => {
            setActiveTab("provider");
            settablaoding(true);
            setTimeout(() => {
              settablaoding(false);
            }, 3000);
          }}
          className={`px-4 py-2 text-sm rounded-md transition cursor-pointer ${
            activeTab === "provider"
              ? "bg-white text-700 font-semibold shadow-sm"
              : "text-gray-600 font-normal"
          }`}
        >
          Provider Licensing
        </button>

        <button
          onClick={() => {setActiveTab("services")
            settablaoding(true)
            setTimeout(()=>{
              settablaoding(false)
            }, 3000)
          }}
          className={`px-4 py-2 text-sm rounded-md transition cursor-pointer ${
            activeTab == "services"
              ? "bg-white text-700 font-semibold shadow-sm"
              : "text-gray-600 font-normal"
          }`}
        >
          Services
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "management" && (
        <div>
          {/* Title + Add User button */}
          <div className="flex items-center justify-between mt-8">
            <h3 className="text-md font-semibold">System Users</h3>
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
            >
              <Plus size={16} />
              Add User
            </button>
          </div>

          {/* Add User Modal */}
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-2xl h-[450px] rounded-lg bg-white p-6 shadow-lg">
                <Dialog.Title className="text-base font-semibold mb-2">
                  Add New User
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
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Form fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Enter first name"
                        className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                        value={formData.firstname}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Enter last name"
                        className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                        value={formData.lastname}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">
                      Role *
                    </label>
                    <select
                      name="roleId"
                      value={formData.roleId}
                      onChange={handleChange}
                      className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                    >
                      <option>Select user role</option>
                      {roles?.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role?.rolename || "No Role"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">
                      Initial Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter initial password"
                      className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-3 mt-5 text-sm font-medium">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        resetForm();
                      }}
                      className="w-80 px-4 py-2 rounded-md border border-gray-300 text-gray-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`w-80 flex items-center justify-center gap-2 px-4 py-2 rounded-md cursor-pointer ${
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
                          Creating User...
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          Create User
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>

          {/* Edit User Modal */}
          <Dialog
            open={editOpen}
            onClose={() => setEditOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/75" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-2xl h-[360px] rounded-lg bg-white p-6 shadow-lg">
                <Dialog.Title className="text-base font-semibold mb-2">
                  Edit User
                </Dialog.Title>
                <form className="space-y-4" onSubmit={handleEditSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-2 block">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block">
                      Role *
                    </label>
                    <select
                      name="roleId"
                      value={formData.roleId}
                      onChange={handleChange}
                      className="mt-1 block w-full text-sm rounded-sm border border-gray-300 shadow-sm p-2"
                    >
                      <option value="">Select user role</option>
                      {roles?.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.rolename || "No Role"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div></div>

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
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white cursor-pointer
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
                          Updating User...
                        </>
                      ) : (
                        <>Update User</>
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>

          {/* Users Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    User
                  </th>
                  <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                    Role
                  </th>
                  <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                    Last Login
                  </th>
                  <th className="px-15 py-3 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xs">
                            {user.firstname?.[0]}
                            {user.lastname?.[0]}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {user.firstname} {user.lastname}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="ml-7 px-3 py-1 text-xs rounded-full border border-gray-300">
                          {user.Role?.rolename}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="ml-9 px-3 py-1 text-xs rounded-full bg-blue-500 text-white">
                          Active
                        </span>
                      </td>
                      <td className="px-14 py-4 text-sm text-gray-600">
                        {user.lastLogin ||
                          new Date().toLocaleDateString("en-GB")}
                      </td>

                      {/* buttons */}
                      <td className="px- py-4">
                        <div className="flex items-center gap-2">
                          {/* <button className="text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded-md hover:bg-blue-100 hover:text-blue-600 hover:border-blue-600 cursor-pointer">
                            change password
                          </button> */}
                          <button
                            onClick={() => handleEditClick(user, index)}
                            className="p-1 rounded border hover:bg-gray-200 hover:cursor-pointer"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={loading}
                            className={`p-1 rounded border cursor-pointer ${
                              loading
                                ? "bg-gray-300 cursor-not-allowed"
                                : "hover:bg-red-100"
                            }`}
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
                      Nothing to show
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === "provider" &&
        (tabloading ? (
          <div className="flex items-center justify-center h-64 gap-2">
            {/* spinner */}
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-700 font-medium">
              Loading Providers...
            </span>
          </div>
        ) : (
          <ProviderManager />
        ))}
      {activeTab === "roles" && <Roles/>}
      {activeTab === "services" &&
        (tabloading ? (
          <div className="flex items-center justify-center h-64 gap-2">
            {/* spinner */}
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-700 font-medium">
              Loading Services...
            </span>
          </div>
        ) : (
          <Service/>
        ))}
    </div>
  );
}

export default Users;
