import React from "react";

export default function Spinner() {
    return (
        <center>
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </center>
    );
}
