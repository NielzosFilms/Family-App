import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./css/bootstrap.css";

import Agenda from "./components/Agenda";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Vandaag from "./components/Vandaag";
import Lijst from "./components/Lijst";

function App() {
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
}

export default App;
