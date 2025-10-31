import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";


import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

dotenv.config();
const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app, path: "/graphql" });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}/graphql`)
);
