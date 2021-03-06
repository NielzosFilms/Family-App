import React from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import CircleArrowLeft from "../icons/CircleArrowLeft";
import DeleteShield from "../icons/Delete";

const ADD_GROCERY = gql`
	mutation CreateGrocery($name: String!, $amount: Int, $user: ID!) {
		createGrocery(name: $name, amount: $amount, user: $user) {
			id
			name
			checked
		}
	}
`;

const DELETE_CHECKED_GROCERIES = gql`
	mutation DeleteChecked {
		deleteCheckedGroceries {
			groceries {
				id
			}
		}
	}
`;

const amountStyle = {
	width: "calc(25% - 10px)",
	minWidth: 50,
	margin: 5,
};

const productStyle = {
	width: "calc(50% - 10px)",
	margin: 5,
};

const submitStyle = {
	width: "calc(25% - 10px)",
	margin: 5,
};

const formContainer = {
	position: "fixed",
	bottom: 0,
	left: 0,
	width: "100%",
	padding: 10,
	paddingLeft: 20,
	paddingRight: 20,
	backgroundColor: "#f8f9fa",
	zIndex: 5,
};

const refresh = {
	position: "absolute",
	top: -50,
	right: 20,
};
const clear = {
	position: "absolute",
	top: -50,
	right: 80,
};

const AUTH_USER = gql`
	query authenticatedUser($secret: String!) {
		authenticatedUser(secret: $secret) {
			id
			username
			color
		}
	}
`;

export default function GroceryForm(props) {
	const {error, data} = useQuery(AUTH_USER, {
		variables: {
			secret: window.localStorage.getItem("login_secret") || "null",
		},
	});
	const [addGrocery] = useMutation(ADD_GROCERY);
	const [deleteGroceries] = useMutation(DELETE_CHECKED_GROCERIES);

	const [amount, setAmount] = React.useState();
	const [name, setName] = React.useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name === null || name === "") {
			props.createAlert("danger", "Geen product naam gegeven.");
			return;
		}

		addGrocery({
			variables: {
				name,
				amount: parseInt(amount),
				user: data.authenticatedUser.id,
			},
		})
			.then((result) => {
				setAmount("");
				setName("");
				//props.refetch();
				props.createAlert("info", `"${name}" toegevoegd.`);
			})
			.catch((error) => {
				console.log(error);
				props.createAlert("danger", "Er is iets fout gegaan.");
			});
	};

	const handleChange = (e) => {
		setName(e.target.value);
	};

	React.useEffect(() => {
		props.setName(name);
	}, [name]);

	return (
		<div className="shadow" style={formContainer}>
			{/* <button
				className="btn btn-primary shadow"
				style={clear}
				onClick={handleClear}
			>
				<DeleteShield />
			</button> */}
			<button
				className="btn btn-primary shadow"
				style={refresh}
				onClick={() => {
					props.refetch();
					setName("");
				}}
			>
				<CircleArrowLeft />
			</button>
			<form onSubmit={handleSubmit}>
				<div className="form-row d-flex flex-row">
					<input
						style={amountStyle}
						type="number"
						min="1"
						max="99"
						placeholder="Aantal"
						className="form-control"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
					<input
						style={productStyle}
						type="text"
						className="form-control"
						placeholder="Product / Zoeken"
						value={name}
						onChange={handleChange}
						required
					/>
					<button
						type="submit"
						className="btn btn-primary"
						style={submitStyle}
					>
						<svg
							width="1.5em"
							height="1.5em"
							viewBox="0 0 16 16"
							className="bi bi-plus"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
							/>
						</svg>
					</button>
				</div>
			</form>
		</div>
	);
}
