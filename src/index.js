import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { typeDefs } from "./server/schema";
//const typeDefs = require("./server/schema.js");

const host = process.env.HOST || "localhost";
const port = 3000;
const httpLink = createHttpLink({
    uri: `http://${host}:${port}/graphql`,
    credentials: "include",
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    typeDefs,
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
