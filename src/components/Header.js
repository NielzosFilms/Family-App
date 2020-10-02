import React from "react";
import { isAuthenticated } from "./auth/auth";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
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

function Header(props) {
    const { loading, error, data, refetch } = useQuery(GET_USER, {
        variables: { id: localStorage.getItem("authUser") },
    });
    if (!loading) {
        const titleColor = () => {
            if (data)
                if (data.user) {
                    document.documentElement.style.setProperty(
                        "--primary",
                        data.user.color
                    );
                    return data.user.color;
                }
        };
        return (
            <div className="bg-dark text-light p-2 clearfix shadow-sm">
                <Link className="text-light" to="/">
                    <h1
                        className="pl-5 float-left"
                        style={{ color: titleColor() }}
                    >
                        Family App
                    </h1>
                </Link>
                <div className="float-right">
                    {isAuthenticated() && (
                        <UserMenu
                            update={props.update}
                            createAlert={props.createAlert}
                        />
                    )}
                </div>
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
