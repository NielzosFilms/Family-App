import React from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import Trash from "../icons/Trash";
import Save from "../icons/Save";
import Info from "../icons/Info";

const DELETE_GROCERY = gql`
	mutation DeleteGrocery($id: ID!) {
		deleteGrocery(id: $id) {
			numUids
		}
	}
`;

const UPDATE_CHECK_GROCERY = gql`
	mutation UpdateGrocery($id: ID!, $checked: Boolean, $updatedUser: ID!) {
		updateGrocery(
			id: $id
			checked: $checked
			updated_by_user: $updatedUser
		) {
			name
			checked
		}
	}
`;

const UPDATE_GROCERY = gql`
	mutation UpdateGrocery(
		$id: ID!
		$name: String!
		$amount: Int
		$updatedUser: ID!
	) {
		updateGrocery(
			id: $id
			name: $name
			amount: $amount
			updated_by_user: $updatedUser
		) {
			name
			checked
		}
	}
`;

const styles = {
	pointer: {
		cursor: "pointer",
	},
	text: {
		cursor: "pointer",
		paddingLeft: "10px",
		width: "70%",
		wordWrap: "break-word",
	},
	textContainer: {
		width: "70%",
		wordWrap: "break-word",
	},
	trashButton: {
		padding: 2,
		paddingLeft: 8,
		paddingRight: 8,
		opacity: 0.5,
	},
	infoButton: {
		padding: 2,
		paddingLeft: 8,
		paddingRight: 8,
		opacity: 0.5,
		position: "relative",
		display: "inline-block",
	},
	amountInput: {
		width: "20%",
	},
	nameInput: {
		width: "80%",
	},
	editButton: {
		opacity: 0.5,
	},
	infoText: {},
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

export default function Grocery({createAlert, grocery, refetch}) {
	const {error, data} = useQuery(AUTH_USER, {
		variables: {
			secret: window.localStorage.getItem("login_secret") || "null",
		},
	});
	const [info, setInfo] = React.useState(false);
	const [edit, setEdit] = React.useState(false);
	const [edit_name, setEdit_name] = React.useState(grocery.name);
	const [edit_amount, setEdit_amount] = React.useState(grocery.amount);
	const [deleteGrocery] = useMutation(DELETE_GROCERY);
	const [updateCheckGrocery] = useMutation(UPDATE_CHECK_GROCERY);
	const [updateGrocery] = useMutation(UPDATE_GROCERY);

	const handleCheck = async () => {
		updateCheckGrocery({
			variables: {
				id: grocery.id,
				checked: !grocery.checked,
				updatedUser: data.authenticatedUser.id,
			},
		})
			.then((result) => {
				refetch();
			})
			.catch((error) => {
				console.log(error);
				createAlert("danger", "Er is iets fout gegaan.");
			});
	};

	const handleDelete = async () => {
		if (
			window.confirm(
				`Weet je zeker dat je ${grocery.name} wilt verwijderen?`
			)
		) {
			deleteGrocery({variables: {id: grocery.id}})
				.then((result) => {
					createAlert("danger", `"${grocery.name}" verwijdert.`);
					refetch();
				})
				.catch((error) => {
					console.log(error);
					createAlert("danger", "Er is iets fout gegaan.");
				});
		}
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		if (edit_name === null || edit_name === "") {
			createAlert("danger", "Geen product naam gegeven.");
			return;
		}
		updateGrocery({
			variables: {
				id: grocery.id,
				name: edit_name,
				amount: parseInt(edit_amount),
				updatedUser: data.authenticatedUser.id,
			},
		})
			.then((result) => {
				refetch();
				setEdit(false);
			})
			.catch((error) => {
				console.log(error);
				createAlert("danger", "Er is iets fout gegaan!");
			});
	};

	const handleEditClose = () => {
		setEdit(false);
		setEdit_name(grocery.name);
		setEdit_amount(grocery.amount);
	};

	const grocery_text =
		grocery.amount > 1
			? `${grocery.amount} x ${grocery.name}`
			: grocery.name;

	return (
		<li className="list-group-item clear-fix" key={grocery.id}>
			<div className="float-left" style={styles.textContainer}>
				{!edit && (
					<div className="d-flex">
						<div>
							<input
								type="checkbox"
								className="align-middle d-inline"
								checked={grocery.checked}
								onChange={(e) => handleCheck(e)}
							/>
						</div>
						<label
							className={
								grocery.checked
									? "text-muted m-0 d-inline"
									: "m-0 d-inline"
							}
							style={styles.text}
							onClick={() => setEdit(true)}
						>
							{grocery.checked ? (
								<s>{grocery_text}</s>
							) : (
								grocery_text
							)}
						</label>
					</div>
				)}
				{edit && (
					<form onSubmit={handleUpdate}>
						<div className="form-row d-flex flex-row">
							<input
								type="number"
								value={edit_amount}
								min="1"
								max="99"
								placeholder="Aantal"
								className="form-control"
								onChange={(e) => setEdit_amount(e.target.value)}
								style={styles.amountInput}
							/>
							<input
								type="text"
								value={edit_name}
								className="form-control"
								onChange={(e) => setEdit_name(e.target.value)}
								style={styles.nameInput}
								autoFocus
							/>
						</div>
						<div
							className="float-right form-row d-flex flex-row"
							style={styles.editButton}
						>
							<button className="btn" type="submit">
								<Save />
							</button>
							<button className="btn" onClick={handleEditClose}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					</form>
				)}
			</div>
			<div className="float-right">
				<button
					type="button"
					className="btn"
					style={styles.infoButton}
					onClick={() => setInfo(!info)}
				>
					<Info />
				</button>
				<button
					className="btn"
					style={styles.trashButton}
					onClick={handleDelete}
				>
					<Trash />
				</button>
			</div>
			{info && (
				<div>
					<br />
					<br />
				</div>
			)}

			<div
				className="text-muted float-right"
				style={{display: info ? "block" : "none", ...styles.infoText}}
			>
				Aangemaakt: {grocery.user.username}
				{grocery.updated_by_user &&
					" | Updated: " + grocery.updated_by_user.username}
			</div>
		</li>
	);
}
