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

    type CalendarItem {
        id: ID!
        title: String!
        description: String
        startDateTime: String!
        endDateTime: String!
        user: User!
    }

    type Query {
        users: [User]!
        user(id: ID!): User!
        userByUsername(username: String!): User

        groceries: [Grocery]!
        grocery(id: ID!): Grocery!

        calendarItems: [CalendarItem]!
        calendarItem(id: ID!): CalendarItem!
    }

    type Mutation {
        createUser(username: String!, password: String!, color: String): User
        updateUser(
            id: ID!
            username: String
            password: String
            color: String
        ): User

        createGrocery(name: String!, amount: Int, checked: Boolean): Grocery
        updateGrocery(
            id: ID!
            name: String
            amount: Int
            checked: Boolean
        ): Grocery
        deleteGrocery(id: ID!): DeleteGroceryPayload

        createCalendarItem(
            title: String!
            description: String
            startDateTime: String!
            endDateTime: String!
            user: ID!
        ): CalendarItem
    }
`;

module.exports = typeDefs;
