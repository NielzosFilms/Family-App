import React from "react";

function Vandaag() {
    const d = new Date();
    return (
        <div className="p-3">
            <div className="d-flex flex-row">
                <h2>Vandaag</h2>
                <p className="pl-2">{`${d.getDate()}-${
                    d.getMonth() + 1
                }-${d.getFullYear()}`}</p>
            </div>
            <div class="dropdown-divider"></div>
        </div>
    );
}

export default Vandaag;
