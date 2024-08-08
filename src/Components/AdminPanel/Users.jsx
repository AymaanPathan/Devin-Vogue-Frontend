import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal/Modal";
import UsernameModal from "./Modal/UsernameModal";

import SideBar from "./SideBar.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://devin-vogue-api.vercel.app/AllUsers",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (err) {
      toast.error("Error fetching users");
      console.error(err);
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      toast.loading("Deleting user...");
      const response = await fetch(
        "https://devin-vogue-api.vercel.app/deleteUser",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await response.json();
      toast.dismiss();
      if (response.ok) {
        toast.success(data.Message);
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        toast.error(data.Message);
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Error deleting user");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="py-8">
        <h2 className="text-2xl font-semibold leading-tight">Users</h2>
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2 ">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search"
              className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-12 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.role}
                      </p>
                    </td>
                    <td className="px-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex gap-3 items-center justify-between">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Change Email
                        </button>
                        <button
                          onClick={() => setIsUsernameModalOpen(true)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Change Username
                        </button>
                        <button
                          onClick={() => handleUserDelete(user._id)}
                          className="text-white bg-red-700 p-2 rounded-md"
                        >
                          Delete
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
      {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
      {isUsernameModalOpen && (
        <UsernameModal closeModal={() => setIsUsernameModalOpen(false)} />
      )}
    </div>
  );
}
