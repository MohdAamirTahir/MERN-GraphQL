import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { ADD_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [addUser, { loading }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => toast.success("User added successfully!"),
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !age) return toast.error("Fill all fields!");
    addUser({ variables: { name, email, age: parseInt(age) } });
    setName(""); setEmail(""); setAge("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-indigo-50 p-5 rounded-xl shadow-sm flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-indigo-700">➕ Add New User</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-md border focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-md border focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="p-3 rounded-md border focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-3 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400"
      >
        {loading ? "Adding..." : "Add User"}
      </button>
    </form>
  );
}
