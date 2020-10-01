import React from "react";
import moment from "moment";

import ChevronLeft from "../icons/ChevronLeft";
import ChevronRight from "../icons/ChevronRight";
import CircleArrowLeft from "../icons/CircleArrowLeft";

const styles = {
    wrapper: { overflowX: "scroll" },
    table: {
        minWidth: "1000px",
        width: "100%",
    },
    tableDays: {
        tableLayout: "fixed",
        margin: "0px",
    },
    tdHeader: {
        padding: "0px",
        border: "none",
        paddingRight: "15px",
    },
    tdButtons: {
        width: "100px",
        position: "relative",
    },
    tdLabel: {
        width: "100%",
        fontSize: "16px",
        margin: 0,
    },
    tdLabelSmall: {
        width: "100%",
        fontSize: "13px",
        margin: 0,
    },
    tdDay: {
        fontSize: "20px",
    },
    tdDate: {
        fontSize: "14px",
    },
    hoursTableWrapper: {
        height: "775px",
        overflowY: "scroll",
    },
    hoursTable: {
        tableLayout: "fixed",
        margin: "0px",
    },
    trHour: {
        padding: "3px",
        textAlign: "center",
        fontSize: "18px",
        width: "100px",
        height: "100px",
    },
};

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

    const weekNumber = getWeekNumber(new Date().addDays(dayOffset));

    return (
        <div style={styles.wrapper}>
            <table className="table" style={styles.table}>
                <tr>
                    <td style={styles.tdHeader}>
                        <table
                            className="table table-bordered"
                            style={styles.tableDays}
                        >
                            <tr>
                                <td style={styles.tdButtons}>
                                    <label style={styles.tdLabel}>
                                        {weekNumber[0]}
                                    </label>
                                    <label style={styles.tdLabelSmall}>
                                        W: {weekNumber[1]}
                                    </label>
                                    <button
                                        className="btn p-2 text-primary"
                                        onClick={() =>
                                            setDayOffset(dayOffset - 7)
                                        }
                                    >
                                        <ChevronLeft />
                                    </button>
                                    <button
                                        className="btn p-2 text-primary"
                                        onClick={() =>
                                            setDayOffset(dayOffset + 7)
                                        }
                                    >
                                        <ChevronRight />
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
                                        <CircleArrowLeft />
                                    </button>
                                </td>
                                {day_names_short.map((day, index) => {
                                    let today =
                                        getDateOffset(index).getDate() ==
                                            new Date().getDate() &&
                                        getDateOffset(index).getMonth() ==
                                            new Date().getMonth();
                                    return (
                                        <td
                                            key={index}
                                            className={
                                                today ? "text-primary" : ""
                                            }
                                        >
                                            <label style={styles.tdDay}>
                                                {day}
                                            </label>
                                            <br />
                                            <label style={styles.tdDate}>
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
                            style={styles.hoursTableWrapper}
                        >
                            <table
                                className="table table-bordered"
                                style={styles.hoursTable}
                            >
                                {getHours().map((hour, index) => {
                                    let now =
                                        hour.split(":")[0] ==
                                        moment().format("HH");
                                    let style = {};
                                    if (now)
                                        style.background =
                                            "rgba(0, 123, 255, 0.4)";
                                    return (
                                        <tr key={index} style={style} id={hour}>
                                            <td style={styles.trHour}>
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
