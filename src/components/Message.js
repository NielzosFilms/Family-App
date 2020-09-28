import React from "react";

const messageStyle = {
    position: "absolute",
    width: "calc(100% - 40px)",
    margin: 20,
    top: -100,
    left: 0,
    transition: "top 500ms ease-in-out",
};

function Message({ type, message, clearAlertData }) {
    var clear;
    React.useEffect(() => {
        document.getElementById("message").style.top = 0;
        clear = setTimeout(clearAlert, 6000);
    });

    const clearAlert = () => {
        document.getElementById("message").style.top = "-100px";
        clearTimeout(clear);
        setTimeout(clearAlertData, 500);
    };

    return (
        <div
            style={messageStyle}
            id="message"
            className={`shadow-sm alert alert-${type}`}
            role="alert"
        >
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
