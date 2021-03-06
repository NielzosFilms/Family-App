import {gql} from "@apollo/client";

export const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		password: String!
		color: String
	}

	type Session {
		id: ID!
		cookie_secret: String!
		authenticated: Boolean!
		authenticatedUser: User
	}

	type Grocery {
		id: ID!
		name: String!
		amount: Int
		checked: Boolean!
		user: User!
		updated_by_user: User
	}
	type DeleteGroceryPayload {
		grocery(id: ID): [Grocery]
		msg: String
		numUids: Int
	}
	type DeleteGroceriesPayload {
		groceries: [Grocery]
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

	type LoginResponse {
		authenticated: Boolean!
		secret: String!
	}

	type Query {
		login(username: String!, password: String!): LoginResponse!
		logout(secret: String!): Boolean!
		authenticated(secret: String!): Boolean!
		authenticatedUser(secret: String!): User!

		users: [User]!
		user(id: ID!): User!
		userByUsername(username: String!): User

		groceries(name: String): [Grocery]!
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

		createGrocery(
			name: String!
			amount: Int
			checked: Boolean
			user: ID!
		): Grocery
		updateGrocery(
			id: ID!
			name: String
			amount: Int
			checked: Boolean
			user: ID
			updated_by_user: ID!
		): Grocery
		deleteGrocery(id: ID!): DeleteGroceryPayload
		deleteCheckedGroceries: DeleteGroceriesPayload

		createCalendarItem(
			title: String!
			description: String
			startDateTime: String!
			endDateTime: String!
			user: ID!
		): CalendarItem
	}
`;
