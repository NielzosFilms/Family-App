import React from "react";
import AgendaTable from "./AgendaTable";

function Agenda() {
    const date = new Date();

    /*console.log(date.getDate()); //day number
    console.log(date.getMonth() + 1); //Month
    console.log(date.getFullYear());

    console.log(date.getHours());
    console.log(date.getMinutes());*/

    if (false) {
        return (
            <div className="p-3">
                <h2>Agenda</h2>
                <div className="dropdown-divider"></div>
                <AgendaTable items={null} />
            </div>
        );
    } else {
        return (
            <div className="p-3">
                <h2>Agenda</h2>
                <div className="dropdown-divider"></div>
                <p>Nothing here yet :)</p>
                {/* <center>
					<div
						className="spinner-border text-secondary"
						role="status"
					>
						<span className="sr-only">Loading...</span>
					</div>
				</center> */}
            </div>
        );
    }
}

export default Agenda;
