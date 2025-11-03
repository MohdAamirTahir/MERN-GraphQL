import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

await server.start();
server.applyMiddleware({ app });

const MONGO_URI = "mongodb://127.0.0.1:27017/merngraphql";

mongoose.connect(MONGO_URI).then(async () => {
  console.log("MongoDB connected");
});

app.listen({ port: 4000 }, () =>
  console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
);
