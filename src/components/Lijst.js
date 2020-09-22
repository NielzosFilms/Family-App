import React from "react";
import {
	getBoodschappen,
	setChecked,
	removeItem,
	addItem,
} from "../queries/boodschappen";

function Lijst(props) {
	const [boodschappen, setBoodschappen] = React.useState();

	const [amount, setAmount] = React.useState();
	const [name, setName] = React.useState();

	React.useEffect(() => {
		async function fetchItems() {
			const result = await getBoodschappen();
			setBoodschappen(result);
		}
		if (!boodschappen) fetchItems();
	});

	const handleCheck = async (e) => {
		const promise = await setChecked(
			parseInt(e.target.id),
			e.target.checked
		);
		if (promise) {
			const result = await getBoodschappen();
			setBoodschappen(result);
		} else {
			props.createAlert("danger", "Er is iets fout gegaan.");
		}
	};

	const handleClick = async (id) => {
		const promise = await removeItem(parseInt(id));
		if (promise) {
			const result = await getBoodschappen();
			setBoodschappen(result);
		} else {
			props.createAlert("danger", "Er is iets fout gegaan.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name == null) {
			props.createAlert("danger", "Geen product naam gegeven.");
			return;
		}
		const promise = addItem(name, amount);
		if (promise) {
			setAmount("");
			setName("");
			const result = await getBoodschappen();
			setBoodschappen(result);
		} else {
			props.createAlert("danger", "Er is iets fout gegaan.");
		}
	};

	return (
		<div className="p-3">
			<h2 style={{display: "inline-block"}}>Boodschappen Lijst</h2>
			{/* <button className="float-right btn btn-danger" onClick="">Leeg Lijst</button> */}
			<div className="dropdown-divider"></div>
			{boodschappen ? (
				<div>
					<ul className="list-group">
						{boodschappen.map((item) => {
							return (
								<li
									className="list-group-item clear-fix"
									key={item.id}
								>
									<div className="float-left">
										<input
											type="checkbox"
											id={item.id}
											checked={
												item.checked == "true"
													? true
													: false
											}
											onChange={(e) => handleCheck(e)}
										/>
										<label
											className={
												item.checked == "true" &&
												"text-muted"
											}
											style={{paddingLeft: "10px"}}
										>
											{item.checked == "true" ? (
												<s>
													{item.amount &&
														`${item.amount} x `}
													{item.name}
												</s>
											) : (
												<label>
													{item.amount &&
														`${item.amount} x `}
													{item.name}
												</label>
											)}
										</label>
									</div>
									<div className="float-right">
										<button
											className="btn btn-danger"
											onClick={() => handleClick(item.id)}
										>
											<svg
												width="1em"
												height="1em"
												viewBox="0 0 16 16"
												className="bi bi-trash-fill"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
												/>
											</svg>
										</button>
									</div>
								</li>
							);
						})}
					</ul>
					<div className="dropdown-divider"></div>
					<form onSubmit={handleSubmit}>
						<h4>Item toevoegen</h4>
						<div className="form-group">
							<div className="form-row">
								<div className="col-2">
									<input
										type="number"
										min="1"
										max="99"
										placeholder="Aantal"
										className="form-control"
										value={amount}
										onChange={(e) =>
											setAmount(e.target.value)
										}
									/>
								</div>
								<div className="col-9">
									<input
										type="text"
										className="form-control"
										placeholder="Product"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</div>
								<div className="col-1">
									<button
										type="submit"
										className="btn btn-primary w-100"
									>
										<svg
											width="1.5em"
											height="1.5em"
											viewBox="0 0 16 16"
											className="bi bi-plus"
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</form>
					<div className="dropdown-divider"></div>
				</div>
			) : (
				<center>
					<div
						className="spinner-border text-secondary"
						role="status"
					>
						<span className="sr-only">Loading...</span>
					</div>
				</center>
			)}
		</div>
	);
}

export default Lijst;
