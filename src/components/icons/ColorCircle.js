import React from "react";

export default function ColorCircle({ color }) {
    const style = {
        backgroundColor: color,
        border: "2px solid rgba(0, 0, 0, 0.2)",
        borderRadius: "100%",
        width: 25,
        height: 25,
        margin: 3,
    };

    return <div className="shadow-sm" style={style}></div>;
}
