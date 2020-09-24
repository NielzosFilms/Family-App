import React from "react";
import { useLocation, Link } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const path = location.pathname;
    console.log(path);
    return (
        <nav
            className="navbar navbar-light bg-light flex-column shadow-sm"
            style={{ height: "fit-content" }}
        >
            <Link
                className={
                    "text-left nav-link text-" +
                    (path == "/" ? "primary" : "body")
                }
                to="/"
            >
                Vandaag
            </Link>
            <Link
                className={
                    "text-left nav-link text-" +
                    (path.includes("agenda") ? "primary" : "body")
                }
                to="/agenda"
            >
                Agenda
            </Link>
            <Link
                className={
                    "text-left nav-link text-" +
                    (path.includes("lijst") ? "primary" : "body")
                }
                to="/lijst"
            >
                Bootschappen Lijst
            </Link>
            <Link
                className={
                    "text-left nav-link text-" +
                    (path.includes("about") ? "primary" : "body")
                }
                to="/about"
            >
                Over Family App
            </Link>
        </nav>
    );
}

export default Navbar;
