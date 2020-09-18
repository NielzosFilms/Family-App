import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./css/bootstrap.css";

import Agenda from "./components/Agenda";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Vandaag from "./components/Vandaag";
import Lijst from "./components/Lijst";
import Message from "./components/Message";

import { isAuthenticated } from "./components/auth/auth";
import Login from "./components/auth/Login";
import NewUser from "./components/auth/NewUser";

function App() {
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("");

    const [value, setValue] = React.useState(0);
    const fUpdate = () => {
        console.log("update");
        setValue(value + 1);
    };

    const createAlert = (type, message) => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(clearAlert, 6000);
    };

    const clearAlert = () => {
        setAlertType("");
        setAlertMessage("");
    };

    if (isAuthenticated()) {
        return (
            <Router>
                <Header update={fUpdate} />
                <div className="d-flex flex-row">
                    <Navbar />
                    <div className="container">
                        {alertMessage && (
                            <Message
                                type={alertType}
                                message={alertMessage}
                                clearAlert={clearAlert}
                            />
                        )}
                        <div className="container bg-light shadow-sm mt-5">
                            <Switch>
                                <Route exact path="/" component={Vandaag} />
                                <Route
                                    exact
                                    path="/agenda"
                                    component={Agenda}
                                />
                                <Route exact path="/lijst" component={Lijst} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    } else {
        return (
            <Router>
                <div>
                    <Header update={fUpdate} />
                    {alertMessage && (
                        <Message
                            type={alertType}
                            message={alertMessage}
                            clearAlert={clearAlert}
                        />
                    )}
                    <div className="container bg-light shadow-sm mt-5">
                        <Switch>
                            <Route exact path="/new/user">
                                <NewUser createAlert={createAlert} />
                            </Route>
                            <Route path="/">
                                <Login
                                    update={fUpdate}
                                    createAlert={createAlert}
                                />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
