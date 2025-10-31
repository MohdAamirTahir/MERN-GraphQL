import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "../graphql/queries.js";
import { DELETE_USER } from "../graphql/mutations.js";

function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email} ({user.age})
          <button
            onClick={() => {
              if (window.confirm(`Delete ${user.name}?`)) {
                deleteUser({ variables: { id: user.id } });
              }
            }}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
