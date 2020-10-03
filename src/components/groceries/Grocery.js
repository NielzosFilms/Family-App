import React from "react";
import {gql, useMutation} from "@apollo/client";
import Trash from "../icons/Trash";

const DELETE_GROCERY = gql`
	mutation DeleteGrocery($id: ID!) {
		deleteGrocery(id: $id) {
			numUids
		}
	}
`;

const UPDATE_CHECK_GROCERY = gql`
	mutation UpdateGrocery($id: ID!, $checked: Boolean) {
		updateGrocery(id: $id, checked: $checked) {
			name
			checked
		}
	}
`;

const styles = {
	pointer: {
		cursor: "pointer",
	},
	textContainer: {
		width: "85%",
	},
	trashButton: {
		padding: 2,
		paddingLeft: 8,
		paddingRight: 8,
	},
};

export default function Grocery({createAlert, grocery, refetch}) {
	const [deleteGrocery] = useMutation(DELETE_GROCERY);
	const [updateCheckGrocery] = useMutation(UPDATE_CHECK_GROCERY);

	const handleCheck = async () => {
		updateCheckGrocery({
			variables: {id: grocery.id, checked: !grocery.checked},
		})
			.then((result) => {
				refetch();
			})
			.catch((error) => {
				console.log(error);
				createAlert("danger", "Er is iets fout gegaan.");
			});
	};

	const handleClick = async () => {
		deleteGrocery({variables: {id: grocery.id}})
			.then((result) => {
				createAlert("danger", `"${grocery.name}" verwijdert.`);
				refetch();
			})
			.catch((error) => {
				console.log(error);
				createAlert("danger", "Er is iets fout gegaan.");
			});
	};

	const grocery_text =
		grocery.amount > 1
			? `${grocery.amount} x ${grocery.name}`
			: grocery.name;

	return (
		<li
			className="list-group-item list-group-item-action clear-fix"
			key={grocery.id}
			style={styles.pointer}
		>
			<div
				className="float-left"
				style={styles.textContainer}
				onClick={handleCheck}
			>
				{/*<input
                    type="checkbox"
                    className="align-middle"
                    checked={grocery.checked}
                    onChange={(e) => handleCheck(e)}
                />*/}
				<label
					className={grocery.checked ? "text-muted m-0" : "m-0"}
					style={{paddingLeft: "10px"}}
				>
					{grocery.checked ? (
						<s style={styles.pointer}>{grocery_text}</s>
					) : (
						<label className="m-0" style={styles.pointer}>
							{grocery_text}
						</label>
					)}
				</label>
			</div>
			<div className="float-right">
				<button
					className="btn"
					style={styles.trashButton}
					onClick={handleClick}
				>
					<Trash />
				</button>
			</div>
		</li>
	);
}
