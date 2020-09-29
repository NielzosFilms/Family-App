import React from "react";
import GroceryList from "./GroceryList";
import GroceryForm from "./GroceryForm";
import { gql, useQuery } from "@apollo/client";

const GET_GROCERIES = gql`
    query {
        groceries {
            id
            name
            amount
            checked
        }
    }
`;

export default function Lijst(props) {
    const { loading, error, data, refetch } = useQuery(GET_GROCERIES);

    if (error) console.log(error);

    return (
        <div className="p-3">
            <h2 style={{ display: "inline-block" }}>Boodschappen Lijst</h2>
            <div className="dropdown-divider"></div>
            {!loading ? (
                <div>
                    {data ? (
                        <div>
                            <GroceryList
                                refetch={refetch}
                                createAlert={props.createAlert}
                                groceries={data.groceries}
                            />
                            <div className="dropdown-divider"></div>
                            <GroceryForm
                                refetch={refetch}
                                createAlert={props.createAlert}
                            />
                        </div>
                    ) : (
                        <div>Geen data gevonden.</div>
                    )}
                </div>
            ) : (
                <center>
                    <div
                        className="spinner-border text-secondary"
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </center>
            )}
        </div>
    );
}
