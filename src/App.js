import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";

import "./css/bootstrap.css";

import Agenda from "./components/Agenda";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Vandaag from "./components/Vandaag";
import Lijst from "./components/Lijst";

import { isAuthenticated } from "./components/auth/auth";
import Login from "./components/auth/Login";
import NewUser from "./components/auth/NewUser";

function App() {
    const [value, setValue] = React.useState(0);
    const fUpdate = () => {
        console.log("update");
        setValue(value + 1);
    };
    if (isAuthenticated()) {
        return (
            <Router>
                <Header />
                <div className="d-flex flex-row">
                    <Navbar />
                    <div className="container bg-light shadow-sm mt-5">
                        <Switch>
                            <Route exact path="/" component={Vandaag} />
                            <Route exact path="/agenda" component={Agenda} />
                            <Route exact path="/lijst" component={Lijst} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    } else {
        return (
            <Router>
                <div>
                    <Header />
                    <div className="container bg-light shadow-sm mt-5">
                        <Switch>
                            <Route exact path="/new/user">
                                <NewUser />
                            </Route>
                            <Route path="/">
                                <Login update={fUpdate} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
