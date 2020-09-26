import React from "react";
import {useLocation, Link} from "react-router-dom";

const link_style = {};

const nav_style = {
	width: "100%",
	height: "fit-content",
};

function Navbar() {
	const location = useLocation();
	const path = location.pathname;
	return (
		<nav
			className="navbar navbar-light bg-light flex-row shadow-sm justify-content-start"
			style={nav_style}
		>
			<Link
				className={
					"text-left nav-link text-" +
					(path == "/" ? "primary" : "body")
				}
				style={link_style}
				to="/"
			>
				Vandaag
			</Link>
			<Link
				className={
					"text-left nav-link text-" +
					(path.includes("agenda") ? "primary" : "body")
				}
				style={link_style}
				to="/agenda"
			>
				Agenda
			</Link>
			<Link
				className={
					"text-left nav-link text-" +
					(path.includes("lijst") ? "primary" : "body")
				}
				style={link_style}
				to="/lijst"
			>
				Bootschappen Lijst
			</Link>
			<Link
				className={
					"text-left nav-link text-" +
					(path.includes("about") ? "primary" : "body")
				}
				style={link_style}
				to="/about"
			>
				Over Family App
			</Link>
		</nav>
	);
}

export default Navbar;
