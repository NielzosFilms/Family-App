import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            className="navbar navbar-light bg-light flex-column shadow-sm"
            style={{ height: "fit-content" }}
        >
            <Link className="text-left nav-link text-primary" to="/">
                Vandaag
            </Link>
            <Link className="text-left nav-link text-body" to="/agenda">
                Agenda
            </Link>
            <Link className="text-left nav-link text-body" to="/lijst">
                Bootschappen Lijst
            </Link>
        </nav>
    );
}

export default Navbar;
