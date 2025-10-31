import { gql } from "@apollo/client";

// Existing mutation
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

// Add this for editing
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!, $email: String!, $age: Int!) {
    updateUser(id: $id, name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;

// Example for ADD_USER
export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $age: Int!) {
    addUser(name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;
