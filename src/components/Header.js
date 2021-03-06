import React from "react";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import UserMenu from "./UserMenu";
import Spinner from "./icons/Spinner";

const GET_USER = gql`
	query UserById($id: ID!) {
		user(id: $id) {
			username
			color
		}
	}
`;

const AUTH = gql`
	query authenticatedUser($secret: String!) {
		authenticatedUser(secret: $secret) {
			id
			username
			color
		}
	}
`;

function Header(props) {
	const {loading, error, data} = useQuery(AUTH, {
		variables: {
			secret: window.localStorage.getItem("login_secret") || "null",
		},
	});
	if (!loading) {
		const titleColor = () => {
			if (data)
				if (data.authenticatedUser) {
					document.documentElement.style.setProperty(
						"--primary",
						data.authenticatedUser.color
					);
					return data.authenticatedUser.color;
				}
		};
		return (
			<div className="bg-dark text-light p-2 clearfix shadow-sm">
				<Link className="text-light" to="/">
					<h2
						className="pl-2 float-left"
						style={{color: titleColor()}}
					>
						Boodschappen
					</h2>
				</Link>
				{!error && (
					<div className="float-right">
						<UserMenu
							createAlert={props.createAlert}
							updateApp={props.updateApp}
						/>
					</div>
				)}
			</div>
		);
	} else {
		return (
			<div className="bg-dark text-light p-2 clearfix shadow-sm">
				<Spinner />
			</div>
		);
	}
}

export default Header;
