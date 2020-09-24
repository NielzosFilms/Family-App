import React from "react";
import moment from "moment";

function Vandaag() {
    const d = new Date();
    return (
        <div className="p-3">
            <div className="d-flex flex-row">
                <h2>Vandaag</h2>
                <p className="pl-2">{moment().format("D-MM-YYYY")}</p>
            </div>
            <div className="dropdown-divider"></div>
        </div>
    );
}

export default Vandaag;
