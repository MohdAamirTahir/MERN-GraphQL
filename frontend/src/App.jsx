import React from "react";
import UserForm from "./components/UserForm.jsx";
import UserList from "./components/UserList.jsx";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>MERN GraphQL CRUD</h1>
      <UserForm />
      <hr />
      <UserList />
    </div>
  );
}

export default App;
