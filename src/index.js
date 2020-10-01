import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import typeDefs from "./server/schema";

const host = process.env.REACT_APP_DEV_DB_HOST || "localhost";
const httpLink = createHttpLink({
    uri: `http://${host}:4000`,
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
