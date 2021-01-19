// const { ApolloServer } = require("apollo-server");
// const typeDefs = require("./schema.js");
// const { models } = require("./db/models");
// const resolvers = require("./db/resolvers");
// //require("dotenv").config();
// require("./db");
// //const resolvers = require("./resolvers");

// //const { User } = require("./db/models/User");
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: {
//         models,
//     },
//     playground: false,
// });

// const corsOptions = {
//     origin: "http://192.168.100.37:3000",
//     credentials: true,
// };

// //server.applyMiddleware({ app, cors: corsOptions });

// /*server.listen().then(({ url }) => {
//     console.log(`Database server started at: ${"localhost:4000"}`);
// });*/

import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema.js";
import models from "./db/models/index.js";
import { resolvers } from "./db/resolvers.js";
import "./db/index.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        models,
    },
});
server.listen().then(({ url }) => {
    console.log(`Database server started at: ${url}`);
});
