import React from "react";
import {useHistory} from "react-router-dom";
import PasswordHash from "password-hash";
import {gql, useMutation, useQuery} from "@apollo/client";

const ENABLED = false;

const CREATE_USER = gql`
	mutation CreateUser(
		$username: String!
		$password: String!
		$color: String
	) {
		createUser(username: $username, password: $password, color: $color) {
			id
			username
		}
	}
`;

const GET_BY_USERNAME = gql`
	query UserByUsername($username: String!) {
		userByUsername(username: $username) {
			username
		}
	}
`;

function NewUser({createAlert}) {
	const [createUser] = useMutation(CREATE_USER);
	const {loading, error, data, refetch} = useQuery(GET_BY_USERNAME, {
		variables: {username: ""},
	});

	const history = useHistory();
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [password2, setPassword2] = React.useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (checkPasswords) {
			if (password === password2 && username !== "") {
				if (ENABLED) {
					refetch({variables: {username: username}});
					if (!data.userByUsername) {
						createUser({
							variables: {
								username,
								password: PasswordHash.generate(password),
							},
						})
							.then((result) => {
								createAlert("success", "Gebruiker aangemaakt!");
								history.push("/");
							})
							.catch((error) => {
								console.log(error);
								createAlert(
									"danger",
									"Er is iets fout gegaan!"
								);
							});
					} else {
						createAlert("danger", "Gebruikersnaam bestaat al!");
					}
				} else {
					createAlert(
						"danger",
						"Gebruikers aanmaken is uitgeschakeld! Contact Niels Hazelaar voor een account."
					);
				}
			}
		}
	};

	const checkPasswords = () => {
		let pass1 = document.getElementById("password_1");
		let pass2 = document.getElementById("password_2");
		if (pass1.value == pass2.value && pass2.value != "") {
			pass2.classList.remove("is-invalid");
			pass2.classList.add("is-valid");
			return true;
		} else {
			pass2.classList.remove("is-valid");
			pass2.classList.add("is-invalid");
			return false;
		}
	};
	return (
		<div className="p-3">
			{!ENABLED && (
				<div class="alert alert-danger" role="alert">
					Gebruikers aanmaken is uitgeschakeld! Contact Niels Hazelaar
					voor een account.
				</div>
			)}

			<h2>Nieuw Account Aanmaken</h2>
			<a href="/">Terug</a>
			<div className="dropdown-divider"></div>
			<form onSubmit={handleSubmit} style={{overflow: "hidden"}}>
				<div className="form-group">
					<label>Gebruikersnaam</label>
					<input
						type="text"
						className="form-control"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label>Wachtwoord</label>
					<input
						type="password"
						className="form-control"
						value={password}
						id="password_1"
						onChange={(e) => {
							setPassword(e.target.value);
							checkPasswords();
						}}
					/>
					<label>Herhaal Wachtwoord</label>
					<input
						type="password"
						className="form-control"
						value={password2}
						id="password_2"
						onChange={(e) => {
							setPassword2(e.target.value);
							checkPasswords();
						}}
					/>
					<div class="invalid-feedback">
						Wachtwoord komt niet overeen.
					</div>
				</div>
				<button type="submit" className="btn btn-primary float-right">
					Submit
				</button>
			</form>
		</div>
	);
}

export default NewUser;
