import React from "react";
import { getUserById } from "../queries/user";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
    query {
        users {
            username
        }
    }
`;

function Vandaag() {
    const { loading, error, data } = useQuery(GET_USERS);

    const d = new Date();
    return (
        <div className="p-3">
            <div className="d-flex flex-row">
                <h2>Vandaag</h2>
                <p className="pl-2">{moment().format("D-MM-YYYY")}</p>
            </div>
            <div className="dropdown-divider"></div>
            {!loading && data.users.map((user) => <p>{user.username}</p>)}
        </div>
    );
}

export default Vandaag;
