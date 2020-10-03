import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import "./css/bootstrap.css";

import Agenda from "./components/agenda/Agenda";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Vandaag from "./components/Vandaag";
import Lijst from "./components/groceries/Groceries";
import Message from "./components/Message";
import About from "./components/About";

import {isAuthenticated} from "./components/auth/auth";
import Login from "./components/auth/Login";
import NewUser from "./components/auth/NewUser";

function App() {
	const [alertMessage, setAlertMessage] = React.useState("");
	const [alertType, setAlertType] = React.useState("");

	const createAlert = (type, message) => {
		setAlertMessage(message);
		setAlertType(type);
	};

	const clearAlertData = () => {
		setAlertMessage("");
		setAlertType("");
	};

	if (isAuthenticated()) {
		return (
			<Router>
				<Header createAlert={createAlert} />
				<div>
					{/* <Navbar /> */}
					<div className="container">
						{alertMessage && (
							<Message
								type={alertType}
								message={alertMessage}
								clearAlertData={clearAlertData}
							/>
						)}
						<div className="container bg-light shadow-sm mt-5">
							<Lijst createAlert={createAlert} />
							{/*<Switch>
								<Route exact path="/">
									<Vandaag />
								</Route>
								<Route exact path="/agenda">
									<Agenda />
								</Route>
								<Route exact path="/lijst">
									<Lijst createAlert={createAlert} />
								</Route>
								<Route exact path="/about">
									<About />
								</Route>
                            </Switch>*/}
						</div>
						<div style={{paddingTop: 150}}></div>
					</div>
				</div>
			</Router>
		);
	} else {
		return (
			<Router>
				<div>
					<Header createAlert={createAlert} />
					{alertMessage && (
						<Message
							type={alertType}
							message={alertMessage}
							clearAlertData={clearAlertData}
						/>
					)}
					<div className="container bg-light shadow-sm mt-5">
						<Switch>
							<Route exact path="/new/user">
								<NewUser createAlert={createAlert} />
							</Route>
							<Route path="/">
								<Login createAlert={createAlert} />
							</Route>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
