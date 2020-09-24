import React from "react";
import { isAuthenticated } from "./auth/auth";

function Header(props) {
    const logOut = () => {
        localStorage.clear();
        props.update();
    };

    return (
        <div className="bg-dark text-light p-2 clearfix shadow-sm">
            <a className="text-light" href="/">
                <h1 className="pl-5 float-left">Family App</h1>
            </a>
            <div className="float-right">
                {isAuthenticated() && (
                    <button className="m-2 mr-5 btn btn-info" onClick={logOut}>
                        Log uit
                    </button>
                )}
            </div>
        </div>
    );
}

export default Header;
