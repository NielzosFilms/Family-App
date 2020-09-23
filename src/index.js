import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import GraphiQL from "graphiql";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	gql,
	NormalizedCacheObject,
} from "@apollo/client";
import {createHttpLink} from "apollo-link-http";
import typeDefs from "./server/schema";

const httpLink = createHttpLink({
	uri: "http://localhost:4000",
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	typeDefs,
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
