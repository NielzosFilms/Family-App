import React from "react";

function Message({ type, message, clearAlert }) {
    return (
        <div className={`m-3 shadow-sm alert alert-${type}`} role="alert">
            <div className="clearFix" style={{ overflow: "hidden" }}>
                <p className="float-left">{message}</p>
                <button
                    type="button"
                    className="close float-right"
                    aria-label="Close"
                    onClick={clearAlert}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
}

export default Message;
