import React from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center p-6">
      <header className="w-full max-w-4xl text-center py-8">
        <h1 className="text-4xl font-bold text-indigo-600 tracking-tight">
           User Management Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Manage users</p>
      </header>

      <main className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 space-y-8">
        <UserForm />
        <hr className="border-gray-200" />
        <UserList />
      </main>
    </div>
  );
}
