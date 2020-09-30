import React from "react";
import moment from "moment";

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
}

export default function AgendaTable({ items }) {
    const [dayOffset, setDayOffset] = React.useState(0);
    const startDate = getMonday(new Date().addDays(dayOffset));
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
            hours.push(`${hour}:00`); //, `${hour}:30`);
        }
        return hours;
    };

    const getDateOffset = (offset) => {
        let d = new Date(startDate);
        let diff = d.getDate() + offset;
        return new Date(d.setDate(diff));
    };

    React.useEffect(() => {
        document.getElementById("hours-content").scrollTop = 375;
    });

    //console.log(getWeekNumber(new Date())[1]); //WEEK NUMBER

    return (
        <div style={{ overflowX: "scroll" }}>
            <table
                className="table"
                style={{ minWidth: "1000px", width: "100%" }}
            >
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
                                <td
                                    style={{
                                        width: "100px",
                                        position: "relative",
                                    }}
                                >
                                    <label
                                        style={{
                                            width: "100%",
                                            fontSize: "16px",
                                            margin: 0,
                                        }}
                                    >
                                        {
                                            getWeekNumber(
                                                new Date().addDays(dayOffset)
                                            )[0]
                                        }
                                    </label>
                                    <label
                                        style={{
                                            margin: 0,
                                            width: "100%",
                                            fontSize: "13px",
                                        }}
                                    >
                                        W:{" "}
                                        {
                                            getWeekNumber(
                                                new Date().addDays(dayOffset)
                                            )[1]
                                        }
                                    </label>
                                    <button
                                        className="btn p-2 text-primary"
                                        onClick={() =>
                                            setDayOffset(dayOffset - 7)
                                        }
                                    >
                                        <svg
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            className="bi bi-chevron-left"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className="btn p-2 text-primary"
                                        onClick={() =>
                                            setDayOffset(dayOffset + 7)
                                        }
                                    >
                                        <svg
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            className="bi bi-chevron-right"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className="btn p-1 m-2 text-primary"
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                        }}
                                        onClick={() => setDayOffset(0)}
                                    >
                                        <svg
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            className="bi bi-arrow-counterclockwise"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                                            />
                                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                                        </svg>
                                    </button>
                                </td>
                                {day_names_short.map((day, index) => {
                                    let today =
                                        getDateOffset(index).getDate() ==
                                            new Date().getDate() &&
                                        getDateOffset(index).getMonth() ==
                                            new Date().getMonth();
                                    return (
                                        <td className={today && "text-primary"}>
                                            <label
                                                style={{
                                                    fontSize: "20px",
                                                }}
                                            >
                                                {day}
                                            </label>
                                            <br />
                                            <label
                                                style={{
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {getDateOffset(index).getDate()}
                                                -
                                                {getDateOffset(
                                                    index
                                                ).getMonth() + 1}
                                            </label>
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
                                    let now =
                                        hour.split(":")[0] ==
                                        moment().format("H");
                                    let style = {};
                                    if (now)
                                        style.background =
                                            "rgba(0, 123, 255, 0.4)";
                                    return (
                                        <tr style={style} id={hour}>
                                            <td
                                                style={{
                                                    padding: "3px",
                                                    textAlign: "center",
                                                    fontSize: "18px",
                                                    width: "100px",
                                                    height: "100px",
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
        </div>
    );
}
