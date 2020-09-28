import React from "react";
import { isAuthenticated } from "./auth/auth";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

function Header(props) {
    return (
        <div className="bg-dark text-light p-2 clearfix shadow-sm">
            <Link className="text-light" to="/">
                <h1 className="pl-5 float-left">Family App</h1>
            </Link>
            <div className="float-right">
                {isAuthenticated() && (
                    <UserMenu
                        update={props.update}
                        createAlert={props.createAlert}
                    />
                )}
                {/* {isAuthenticated() && (
					<button className="m-2 mr-5 btn btn-info" onClick={logOut}>
						Log uit
					</button>
				)} */}
            </div>
        </div>
    );
}

export default Header;
