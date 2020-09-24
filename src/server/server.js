const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { models } = require("./db/models");
const resolvers = require("./db/resolvers");
require("./db");
//const resolvers = require("./resolvers");

/*const users = [
    {
        id: "1",
        username: "Nielzos Films",
        password: "pass",
        color: "white",
    },
    {
        id: "2",
        username: "Irelia",
        password: "fjasf",
        color: "purple",
    },
];*/

//const { User } = require("./db/models/User");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        models,
    },
});
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
