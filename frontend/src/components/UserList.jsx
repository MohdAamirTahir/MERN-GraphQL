import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_USERS } from "../graphql/queries";
import { DELETE_USER, UPDATE_USER } from "../graphql/mutations";

export default function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [editingUser, setEditingUser] = useState(null); // for modal

  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const existing = cache.readQuery({ query: GET_USERS });
      if (existing) {
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: existing.users.filter((u) => u.id !== deleteUser.id),
          },
        });
      }
    },
    onCompleted: () => toast.success("User deleted!"),
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      const existing = cache.readQuery({ query: GET_USERS });
      if (existing) {
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: existing.users.map((u) =>
              u.id === updateUser.id ? updateUser : u
            ),
          },
        });
      }
    },
    onCompleted: () => toast.success("User updated!"),
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  const handleDelete = (id, name) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Delete {name}?</span>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                deleteUser({ variables: { id } });
                toast.dismiss(t.id);
              }}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingUser.name || !editingUser.email || !editingUser.age) {
      return toast.error("Fill all fields!");
    }
    updateUser({
      variables: {
        id: editingUser.id,
        name: editingUser.name,
        email: editingUser.email,
        age: parseInt(editingUser.age),
      },
    });
    setEditingUser(null); // close modal
  };

  if (loading) return <p className="text-gray-500">Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-700 mb-3">User List</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-indigo-100">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Age</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-indigo-50 transition duration-150"
              >
                <td className="py-3 px-4 font-medium">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.age}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {data.users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-96 shadow-lg">
            <h2 className="text-lg font-semibold text-indigo-700 mb-4">Edit User</h2>
            <form className="flex flex-col gap-3" onSubmit={handleEditSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                className="p-3 rounded-md border focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="p-3 rounded-md border focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <input
                type="number"
                placeholder="Age"
                value={editingUser.age}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, age: e.target.value })
                }
                className="p-3 rounded-md border focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
