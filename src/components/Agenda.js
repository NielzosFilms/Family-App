import React from "react";
import AgendaTable from "./AgendaTable";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";

const GET_ITEMS = gql`
    query {
        calendarItems {
            title
            description
            startDateTime
            endDateTime
            user {
                username
                color
            }
        }
    }
`;

function Agenda() {
    const { loading, error, data, refetch } = useQuery(GET_ITEMS);
    const date = new Date();

    /*console.log(date.getDate()); //day number
    console.log(date.getMonth() + 1); //Month
    console.log(date.getFullYear());

    console.log(date.getHours());
    console.log(date.getMinutes());*/

    console.log(moment().format("DD-MM-YYYY;hh:mm"));

    if (!loading) {
        return (
            <div className="p-3">
                <h2>Agenda</h2>
                <div className="dropdown-divider"></div>
                <AgendaTable items={GET_ITEMS} />
            </div>
        );
    } else {
        return (
            <div className="p-3">
                <h2>Agenda</h2>
                <div className="dropdown-divider"></div>
                <center>
                    <div
                        className="spinner-border text-secondary"
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                </center>
            </div>
        );
    }
}

export default Agenda;
