import {gql, useQuery} from "@apollo/client";

const GET_GREETING = gql`
	query GetGreeting($language: String!) {
		greeting(language: $language) {
			message
		}
	}
`;

function Hello() {
	const {loading, error, data} = useQuery(GET_GREETING, {
		variables: {language: "english"},
	});
	if (loading) return <p>Loading ...</p>;
	return <h1>Hello {data.greeting.message}!</h1>;
}
