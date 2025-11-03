import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_USERS } from "../graphql/queries";
import { DELETE_USER } from "../graphql/mutations";

export default function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);

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
                <td className="py-3 px-4">
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
    </div>
  );
}
