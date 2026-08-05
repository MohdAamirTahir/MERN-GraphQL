import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

dotenv.config();

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

await server.start();
server.applyMiddleware({ app });

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/merngraphql";
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB connected");
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
);
