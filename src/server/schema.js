const { gql } = require("@apollo/client");

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        password: String!
        color: String
    }

    type Boodschap {
        id: ID!
        name: String!
        amount: Int
        checked: Boolean!
    }

    type Query {
        users: [User]!
        user(id: ID!): User

        boodschappen: [Boodschap]!
        boodschap(id: ID!): Boodschap
    }

    type Mutation {
        createUser(username: String!, password: String!, color: String): User
    }
`;

module.exports = typeDefs;
