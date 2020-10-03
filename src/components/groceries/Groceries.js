import React from "react";
import GroceryList from "./GroceryList";
import GroceryForm from "./GroceryForm";
import {gql, useQuery} from "@apollo/client";
import Divider from "../icons/Divider";
import Spinner from "../icons/Spinner";

const GET_GROCERIES = gql`
	query {
		groceries {
			id
			name
			amount
			checked
		}
	}
`;

export default function Lijst(props) {
	const {loading, error, data, refetch} = useQuery(GET_GROCERIES);

	if (error) console.log(error);

	return (
		<div className="p-3">
			{/* <h2 style={{ display: "inline-block" }}>Boodschappen Lijst</h2> */}
			{/* <Divider /> */}
			{!loading ? (
				<div>
					{data ? (
						<div>
							<GroceryList
								refetch={refetch}
								createAlert={props.createAlert}
								groceries={data.groceries}
							/>
							{/* <Divider /> */}
							<GroceryForm
								refetch={refetch}
								createAlert={props.createAlert}
							/>
						</div>
					) : (
						<div>Geen data gevonden.</div>
					)}
				</div>
			) : (
				<Spinner />
			)}
		</div>
	);
}
