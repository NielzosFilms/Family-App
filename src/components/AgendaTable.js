import React from "react";

export default function AgendaTable(props) {
    const day_names_short = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
    const day_names_long = [
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrijdag",
        "Zaterdag",
        "Zondag",
    ];
    const getHours = () => {
        let hours = [];
        for (let i = 0; i < 24; i++) {
            let hour = i;
            if (i < 10) {
                hour = "0" + i;
            }
            hours.push(`${hour}:00`, `${hour}:30`);
        }
        return hours;
    };

    React.useEffect(() => {
        document.getElementById("hours-content").scrollTop = 375;
    });

    return (
        <table className="table">
            <tr>
                <td
                    style={{
                        padding: "0px",
                        border: "none",
                        paddingRight: "15px",
                    }}
                >
                    <table
                        className="table table-bordered"
                        style={{
                            tableLayout: "fixed",
                            margin: "0px",
                        }}
                    >
                        <tr>
                            <td>scroll buttons</td>
                            {day_names_short.map((day) => {
                                return (
                                    <td>
                                        <h5>{day}</h5>
                                    </td>
                                );
                            })}
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style={{ padding: "0px", border: "none" }}>
                    <div
                        id="hours-content"
                        style={{
                            height: "775px",
                            overflowY: "scroll",
                        }}
                    >
                        <table
                            className="table table-bordered"
                            style={{ tableLayout: "fixed", margin: "0px" }}
                        >
                            {getHours().map((hour) => {
                                return (
                                    <tr id={hour}>
                                        <td
                                            style={{
                                                padding: "3px",
                                                textAlign: "center",
                                            }}
                                        >
                                            {hour}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                </td>
            </tr>
        </table>
        // <table className="table table-bordered">
        //     <thead>
        //         <tr>
        //
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <tr>
        //             <td>08:00</td>
        //         </tr>
        //         <tr>
        //             <td>09:00</td>
        //         </tr>
        //         <tr>
        //             <td>09:00</td>
        //         </tr>
        //         <tr>
        //             <td>09:00</td>
        //         </tr>
        //         <tr>
        //             <td>09:00</td>
        //         </tr>
        //         <tr>
        //             <td>09:00</td>
        //         </tr>
        //         <tr>
        //             <td>09:00</td>
        //         </tr>
        //         <tr>
        //             <td>09:00</td>
        //         </tr>
        //     </tbody>
        // </table>
    );
}
