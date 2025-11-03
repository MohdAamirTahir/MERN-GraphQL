import User from "../models/User.js";

export const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    addUser: async (_, { name, email, age }) => {
      email = email.toLowerCase().trim();
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already exists");
      }
      const user = new User({ name, email, age });
      return await user.save();
    },
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
  },
};
