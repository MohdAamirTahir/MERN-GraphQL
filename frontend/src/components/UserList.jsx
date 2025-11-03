import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_USERS } from "../graphql/queries";
import { DELETE_USER } from "../graphql/mutations";

export default function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => toast.success("User deleted!"),
    onError: (err) => toast.error(err.message),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
                    onClick={() => deleteUser({ variables: { id: user.id } })}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
