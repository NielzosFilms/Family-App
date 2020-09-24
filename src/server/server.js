const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
//const resolvers = require("./resolvers");

const users = [
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
];

const resolvers = {
    Query: {
        /*users(_, { input }, { models }) {
            return models.User.findMany(input || {});
        },*/
        users: () => users,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    /*ontext() {
        const user = db.get("user").value();
        return { models, db, user };
    },*/
});
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
