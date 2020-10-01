import React from "react";
import moment from "moment";
import Divider from "./icons/Divider";

function Vandaag() {
    const d = new Date();
    return (
        <div className="p-3">
            <div className="d-flex flex-row">
                <h2>Vandaag</h2>
                <p className="pl-2">{moment().format("D-MM-YYYY")}</p>
            </div>
            <Divider />
            <p>Nothing here yet :)</p>
        </div>
    );
}

export default Vandaag;
