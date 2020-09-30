import React from "react";

const messageStyle = {
    position: "absolute",
    width: "calc(100% - 40px)",
    margin: 20,
    top: -100,
    left: 0,
    opacity: 0.9,
    transition: "top 500ms ease-in-out",
};

var clear;

function Message({ type, message, clearAlertData }) {
    clearTimeout(clear);
    React.useEffect(() => {
        function animate() {
            document.getElementById("message").style.top = 0;
        }
        setTimeout(animate, 50);
        clear = setTimeout(clearAlert, 3000);
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
            className={`shadow alert alert-${type}`}
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
