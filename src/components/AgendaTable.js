import React from "react";
import moment from "moment";

function getMonday(d) {
	d = new Date(d);
	var day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
	return new Date(d.setDate(diff));
}

function getWeekNumber(d) {
	// Copy date so don't modify original
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	// Get first day of year
	var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	// Calculate full weeks to nearest Thursday
	var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	// Return array of year and week number
	return [d.getUTCFullYear(), weekNo];
}

export default function AgendaTable(props) {
	const [startDate, setStartDate] = React.useState(getMonday(new Date()));
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

	console.log(getWeekNumber(new Date())[1]);

	return (
		<div style={{overflowX: "scroll"}}>
			<table
				className="table"
				style={{minWidth: "1000px", width: "100%"}}
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
								<td style={{width: "100px"}}>scroll buttons</td>
								{day_names_short.map((day, index) => {
									let today =
										getDateOffset(index).getDate() ==
										new Date().getDate();
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
					<td style={{padding: "0px", border: "none"}}>
						<div
							id="hours-content"
							style={{
								height: "775px",
								overflowY: "scroll",
							}}
						>
							<table
								className="table table-bordered"
								style={{tableLayout: "fixed", margin: "0px"}}
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
													height: "200px",
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
