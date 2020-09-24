const { gql } = require("@apollo/client");

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        password: String!
        color: String
    }

    type Grocery {
        id: ID!
        name: String!
        amount: Int
        checked: Boolean!
    }
    type DeleteGroceryPayload {
        grocery(id: ID): [Grocery]
        msg: String
        numUids: Int
    }

    type Query {
        users: [User]!
        user(id: ID!): User
        userByUsername(username: String!): User

        groceries: [Grocery]!
        grocery(id: ID!): Grocery
    }

    type Mutation {
        createUser(username: String!, password: String!, color: String): User
        createGrocery(name: String!, amount: Int, checked: Boolean): Grocery
        updateGrocery(
            id: ID!
            name: String
            amount: Int
            checked: Boolean
        ): Grocery
        deleteGrocery(id: ID!): DeleteGroceryPayload
    }
`;

module.exports = typeDefs;
