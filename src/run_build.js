import {typeDefs} from "./server/schema.js";
//const typeDefs = require("./server/schema.js");
import express from "express";
import path from "path";
const app = express();

import {ApolloServer} from "apollo-server-express";

//const { models } = require("./server/db/models");
//const resolvers = require("./server/db/resolvers");
import models from "./server/db/models/index.js";
import {resolvers} from "./server/db/resolvers.js";
import "./server/db/index.js";

import cookieParser from "cookie-parser";

import {LocalStorage} from "node-localstorage";
global.localStorage = new LocalStorage("./scratch");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({req, res}) => {
		return {models, req, res};
	},
	playground: false,
});

const host = process.env.HOST || "localhost";
const port = 3000;
const corsOptions = {
	origin: `http://${host}:${port}`,
	credentials: true,
};

app.use(cookieParser());

app.use(express.static(path.join("build")));

app.post("/", function (req, res) {
	res.sendFile(path.join("build", "index.html"));
});

server.applyMiddleware({app, path: "/graphql", cors: corsOptions});

app.listen(port, () =>
	console.log(
		`listening... http://${host}:${port} && http://${host}:${port}/graphql`
	)
);
